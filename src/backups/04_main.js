"use strict";

const haushaltsbuch = {

    

    gesamtbilanz: new Map(),

    eintraege: [],
    fehler: [],

    eintrag_erfassen() {
        let neuer_Eintrag = new Map();
        neuer_Eintrag.set("Titel", this.titel_verarbeiten(prompt("Titel:")));
        neuer_Eintrag.set("Typ", this.typ_verarbeiten(prompt("Einnahme/Ausgabe")));
        neuer_Eintrag.set("Betrag", this.betrag_verarbeiten(prompt("Betrag (in Euro)")));
        neuer_Eintrag.set("Datum", this.datum_verarbeiten(prompt("Datum (jjjj-mm-tt)")));
        neuer_Eintrag.set("timestamp", Date.now());
        this.eintraege.push(neuer_Eintrag);
    },

    titel_verarbeiten(titel) {
        titel = titel.trim();
        if(this.titel_validieren(titel)) {
            return titel;
        } else {
            console.log(`Kein Titel angegeben.`);
            return false;
        }
    },

    titel_validieren(titel) {
        if(titel !== "") {
            return true
        } else {
            return false;
        }
    },

    typ_verarbeiten(typ) {
        typ = typ.trim().toLowerCase();
        if(this.typ_validieren(typ)) {
            return typ;
        } else {
            console.log(`Ungültiger Eintragstyp: \"${typ}\".`);
            return false;
        }
    },

    typ_validieren(typ) {
        if(typ.match(/^(?:einnahme|ausgabe)$/)) {
            return true
        } else {
            return false;
        }
    },

    betrag_verarbeiten(betrag) {
        betrag = betrag.trim();
        if(this.betrag_validieren(betrag)) {
            return parseFloat(betrag.replace(",", ".")) *100;
        } else {
            console.log(`Ungültiger Betrag ${betrag} €`);
            return false;
        }
    },

    betrag_validieren(betrag) {
        if (betrag.match(/^\d+(?:(?:,|\.)\d\d?)?/) !== null) {
            return true;
        } else {
            return false;
        }
    },

    datum_verarbeiten(datum) {
        datum = datum.trim();
        if(this.datum_validieren(datum)) {
            return new Date(`${datum} 00:00:00`);
        } else {
            console.log(`Ungültiges Datumsformat ${datum}`);
            return false;
        }
    },

    datum_validieren(datum) {
        if(datum.match(/^\d{4}-\d{2}-\d{2}$/) !== null) {
            return true;
        } else {
            return false;
        }
    },

    eintraege_sortieren() {
        this.eintraege.sort(function(a, b){
            if(a.get("Datum") > b.get("Datum")) {
                return -1;
            } else if(a.get("Datum") < b.get("Datum")) {
                return 1;
            } else {
                return 0;
            }
        });
    },


    eintraege_ausgeben() {
        console.clear();
        this.eintraege.forEach(eintrag => {
            console.log(`Titel: ${eintrag.get("Titel")}\n`
            + `Typ: ${eintrag.get("Typ")}\n`
            + `Betrag: ${(eintrag.get("Betrag") /100).toFixed(2)}€\n`
            + `Datum: ${eintrag.get("Datum").toLocaleDateString("de-DE", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            })}`);  
            });
    },

    
    gesamtbilanz_erstellen() {
        let neue_gesamtbilanz = new Map();
        neue_gesamtbilanz.set("Einnahmen", 0);
        neue_gesamtbilanz.set("Ausgaben", 0);
        neue_gesamtbilanz.set("Bilanz", 0);


        this.eintraege.forEach(eintrag => {
            switch(eintrag.get("Typ")) {
                case "einnahme":
                    neue_gesamtbilanz.set("Einnahmen", neue_gesamtbilanz.get("Einnahmen") + eintrag.get("Betrag"));
                    neue_gesamtbilanz.set("Bilanz", neue_gesamtbilanz.get("Bilanz") + eintrag.get("Betrag"));
                    break;
                case "ausgabe":
                    neue_gesamtbilanz.set("Ausgaben", neue_gesamtbilanz.get("Ausgaben") + eintrag.get("Betrag"));
                    neue_gesamtbilanz.set("Bilanz", neue_gesamtbilanz.get("Bilanz") - eintrag.get("Betrag"));
                    break;
                default: 
                    console.log(`Der Typ ${eintrag.get("Typ")} ist nicht bekannt.`)
                    break;
            }
        });
        this.gesamtbilanz = neue_gesamtbilanz;
    },

    gesamtbilanz_ausgeben() {
        console.log(`Einnahmen: ${(this.gesamtbilanz.get("Einnahmen") /100).toFixed(2)}€\n`
        + `Ausgaben: ${(this.gesamtbilanz.get("Ausgaben") /100).toFixed(2)}€\n`
        + `Bilanz: ${(this.gesamtbilanz.get("Bilanz") /100).toFixed(2)}€\n`
        + `Bilanz ist positiv: ${(this.gesamtbilanz.get("Bilanz") /100) >= 0}`)
    },
    

    eintrag_hinzufuegen() { 
        let weiterer_Eintrag = true;
        while(weiterer_Eintrag === true) {
            this.eintrag_erfassen();
            this.eintraege_sortieren()
            this.eintraege_ausgeben();
            this.gesamtbilanz_erstellen();
            this.gesamtbilanz_ausgeben();
            weiterer_Eintrag = confirm("Weiterer Eintrag hinzufügen?");
            this.eintraege.forEach(a => {
                console.log(a);
            });
        }
    }
};

haushaltsbuch.eintrag_hinzufuegen();
