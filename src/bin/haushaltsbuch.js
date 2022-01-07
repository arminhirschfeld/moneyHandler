"use strict";

const haushaltsbuch = {

    gesamtbilanz: new Map(),
    eintraege: [],

    eintrag_hinzufuegen(formulardaten) { 
        let neuer_eintrag = new Map();
        neuer_eintrag.set("titel", formulardaten.titel);
        neuer_eintrag.set("betrag", formulardaten.betrag);
        neuer_eintrag.set("typ", formulardaten.typ);
        neuer_eintrag.set("datum", formulardaten.datum);
        neuer_eintrag.set("timestamp", Date.now());
        this.eintraege.push(neuer_eintrag);
        // console.log(neuer_eintrag);
        this.eintraege_sortieren();
        this.eintraege_anzeigen();
        this.gesamtbilanz_erstellen();
        this.gesamtbilanz_anzeigen();
    },


    eintraege_sortieren() {
        this.eintraege.sort((a, b) => {
            return a.get("datum") > b.get("datum") ? -1 : a.get("datum") < b.get("datum") ? 1 : 0;
        });
    },

    html_eintrag_generieren(eintrag) {
        let li = document.createElement("li");
        li.setAttribute("data-timestamp", eintrag.get("timestamp"));
        li.className = `${eintrag.get("typ")}`;
        li.insertAdjacentHTML("beforeend", `<span class=\"datum\">${eintrag.get("datum").toLocaleDateString("de-DE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        })}</span>`);
        li.insertAdjacentHTML("beforeend", `<span class=\"titel\">${eintrag.get("titel")}</span>`);
        li.insertAdjacentHTML("beforeend", `<span class=\"betrag\">${(eintrag.get("betrag") /100).toFixed(2).replace(/\./, ",")}€</span>`);
        li.insertAdjacentHTML("beforeend", `<button class=\"entfernen-button\"><i class=\"fas fa-trash\"></i></button>`);

        this.eintrag_event_hinzufügen(li.lastElementChild);
        return li;
    },

    eintrag_event_hinzufügen(button) {
        button.addEventListener("click", e => {
            // console.log(e);
            // console.log(e.target.parentElement.dataset.timestamp);
            this.eintrag_entfernen(e.target.parentElement.dataset.timestamp);
            // return e.target.parentElement.dataset.timestamp;
        } )
    },

    eintrag_entfernen(timestamp) {
        this.eintraege.forEach(eintrag => {
            if(eintrag.get("timestamp") == timestamp) {
                // console.log(this.eintraege.indexOf(eintrag));
                this.eintraege.splice(this.eintraege.indexOf(eintrag), 1);
            }
        })
        this.eintraege_anzeigen();
        this.gesamtbilanz_erstellen();
        this.gesamtbilanz_anzeigen();
    },

    eintraege_anzeigen() {

        (document.querySelectorAll(".monatsliste ul")).forEach(a => {
            a.remove();
        });

        let ul = document.createElement("ul");
        for(let eintrag of this.eintraege) {

            ul.insertAdjacentElement("beforeend", this.html_eintrag_generieren(eintrag));
        }
        document.querySelector(".monatsliste").insertAdjacentElement("afterbegin", ul);
    },

    
    gesamtbilanz_erstellen() {
        let neue_gesamtbilanz = new Map();
        neue_gesamtbilanz.set("Einnahmen", 0);
        neue_gesamtbilanz.set("Ausgaben", 0);
        neue_gesamtbilanz.set("Bilanz", 0);


        this.eintraege.forEach(eintrag => {
            switch(eintrag.get("typ")) {
                case "einnahme":
                    neue_gesamtbilanz.set("Einnahmen", neue_gesamtbilanz.get("Einnahmen") + eintrag.get("betrag"));
                    neue_gesamtbilanz.set("Bilanz", neue_gesamtbilanz.get("Bilanz") + eintrag.get("betrag"));
                    break;
                case "ausgabe":
                    neue_gesamtbilanz.set("Ausgaben", neue_gesamtbilanz.get("Ausgaben") + eintrag.get("betrag"));
                    neue_gesamtbilanz.set("Bilanz", neue_gesamtbilanz.get("Bilanz") - eintrag.get("betrag"));
                    break;
                default: 
                    console.log(`Der typ ${eintrag.get("typ")} ist nicht bekannt.`)
                    break;
            }
        });
        this.gesamtbilanz = neue_gesamtbilanz;
    },

    html_gesamtbilanz_generieren() {
        let gesamtbilanz = document.createElement("aside");
        gesamtbilanz.id = "gesamtbilanz";
        gesamtbilanz.insertAdjacentHTML("beforeend", "<h1>Gesamtbilanz</h1>");
        gesamtbilanz.insertAdjacentHTML("beforeend", `<div class=\"gesamtbilanz-zeile einnahmen\"><span>Einnahmen:</span><span>${(this.gesamtbilanz.get("Einnahmen") /100).toFixed(2)}€</span></div>`);
        gesamtbilanz.insertAdjacentHTML("beforeend", `<div class=\"gesamtbilanz-zeile ausgaben\"><span>Ausgaben:</span><span>${(this.gesamtbilanz.get("Ausgaben") /100).toFixed(2)}€</span></div>`);
        gesamtbilanz.insertAdjacentHTML("beforeend", `<div class=\"gesamtbilanz-zeile bilanz\"><span>Bilanz:</span><span>${(this.gesamtbilanz.get("Bilanz") /100).toFixed(2)}€</span></div>`)
        if((this.gesamtbilanz.get("Bilanz") /100) >= 0) {
            gesamtbilanz.querySelector(".bilanz > span:nth-of-type(2)").className = "positiv";
        } else {
            gesamtbilanz.querySelector(".bilanz > span:nth-of-type(2)").className = "negativ";
        }
        return gesamtbilanz;
    },

    gesamtbilanz_anzeigen() {
        if(document.querySelector("body").hasChildNodes("#gesamtbilanz")) { 
            document.querySelector("#gesamtbilanz").remove();
        }
        document.querySelector("body").insertAdjacentElement("beforeend", this.html_gesamtbilanz_generieren());
    },
    
};