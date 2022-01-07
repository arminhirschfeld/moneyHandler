"use strict";


const haushaltsbuch = {

    

    gesamtbilanz: new Map(),

    eintraege: [],

    eintrag_erfassen() {
        let neuer_Eintrag = new Map();
        neuer_Eintrag.set("Titel", prompt("Titel:")),
        neuer_Eintrag.set("Typ", prompt("Einnahme/Ausgabe")),
        neuer_Eintrag.set("Betrag", this.betrag_verarbeiten(prompt("Betrag (in Euro)"))),
        neuer_Eintrag.set("Datum", new Date(prompt("Datum (jjjj-mm-tt)") + " 00:00:00")),
        neuer_Eintrag.set("timestamp", Date.now())
        this.eintraege.push(neuer_Eintrag);
    },

    betrag_verarbeiten(betrag) {
        return parseFloat(betrag.replace(",", ".")) *100;
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
                case "Einnahme":
                    neue_gesamtbilanz.set("Einnahmen", neue_gesamtbilanz.get("Einnahmen") + eintrag.get("Betrag"));
                    neue_gesamtbilanz.set("Bilanz", neue_gesamtbilanz.get("Bilanz") + eintrag.get("Betrag"));
                    break;
                case "Ausgabe":
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
