"use strict";

const haushaltsbuch = {

    

    gesamtbilanz: new Map(),

    eintraege: [],

    eintrag_erfassen() {

        let neuer_Eintrag = new Map();
        neuer_Eintrag.set("Titel", prompt("Titel:")),
        neuer_Eintrag.set("Typ", prompt("Einnahme/Ausgabe")),
        neuer_Eintrag.set("Betrag", parseInt(prompt("Betrag (in Cent)"))),
        neuer_Eintrag.set("Datum", prompt("Datum (jjjj-mm-tt)")),
        this.eintraege.push(neuer_Eintrag);
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
        this.eintraege.forEach(element => {
            console.log(`Titel: ${element.get("Titel")}\n`
            + `Typ: ${element.get("Typ")}\n`
            + `Betrag: ${element.get("Betrag")} ct\n`
            + `Datum: ${element.get("Datum")}`);  
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
        console.log(`Einnahmen: ${this.gesamtbilanz.get("Einnahmen")} ct\n`
        + `Ausgaben: ${this.gesamtbilanz.get("Ausgaben")} ct\n`
        + `Bilanz: ${this.gesamtbilanz.get("Bilanz")} ct\n`
        + `Bilanz ist positiv: ${this.gesamtbilanz.get("Bilanz") >= 0}`)
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
        }
    }
};

haushaltsbuch.eintrag_hinzufuegen();