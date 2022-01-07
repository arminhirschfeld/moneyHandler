/**
 * Das Modul "Gesamtbilanz" stellt die Funktionalitäten des Gesamtbilanz-Containers bereit
 * @module classes/Gesamtbilanz
 */

/**
 * Die Klasse "Gesamtbilanz" stellt alle Eigenschaften und Methoden 
 * der Gesamtbilanz (inkl. HTML und Berechnung der Bilanz) zur Verfügung.
 */

export default class Gesamtbilanz {

    constructor() {
        this._einnahmen = 0;
        this._ausgaben = 0;
        this._bilanz = 0
        this._html = this._html_gesamtbilanz_generieren();
        }

    /**
     * Diese globale Methode aktualisiert die Anzeige der Gesamtbilanz.
     * @param {Array} eintraege
     */

    aktualisieren(eintraege) {
        this._einnahmen = 0;
        this._ausgaben = 0;
        this._bilanz = 0;
        eintraege.forEach(eintrag => {
            switch(eintrag.typ()) {
                case "einnahme":
                    this._einnahmen += eintrag.betrag();
                    this._bilanz += eintrag.betrag();
                    break;
                case "ausgabe":
                    this._ausgaben += eintrag.betrag();
                    this._bilanz -= eintrag.betrag();
                    break;
                default: 
                    console.log(`Der typ ${eintrag.typ()} ist nicht bekannt.`)
                    break;
            }
        });
        this._html = this._html_gesamtbilanz_generieren();
        this.anzeigen();
    }

    /**
     * Diese private Methode erstellt das HTML für die Gesamtbilanz
     * @returns {Element} - HTML
     */

    _html_gesamtbilanz_generieren() {
        let gesamtbilanz = document.createElement("aside");
        gesamtbilanz.id = "gesamtbilanz";
        gesamtbilanz.insertAdjacentHTML("beforeend", "<h1>Gesamtbilanz</h1>");
        gesamtbilanz.insertAdjacentHTML("beforeend", `<div class=\"gesamtbilanz-zeile einnahmen\"><span>Einnahmen:</span><span>${(this._einnahmen /100).toFixed(2).replace(/\./, ",")}€</span></div>`);
        gesamtbilanz.insertAdjacentHTML("beforeend", `<div class=\"gesamtbilanz-zeile ausgaben\"><span>Ausgaben:</span><span>${(this._ausgaben /100).toFixed(2).replace(/\./, ",")}€</span></div>`);
        gesamtbilanz.insertAdjacentHTML("beforeend", `<div class=\"gesamtbilanz-zeile bilanz\"><span>Bilanz:</span><span>${(this._bilanz /100).toFixed(2).replace(/\./, ",")}€</span></div>`)
        if((this._bilanz /100) >= 0) {
            gesamtbilanz.querySelector(".bilanz > span:nth-of-type(2)").className = "positiv";
        } else {
            gesamtbilanz.querySelector(".bilanz > span:nth-of-type(2)").className = "negativ";
        }
        return gesamtbilanz;
    }

    /**
     * Diese private Methode entfernt eine bereits bestehende Gesamtbilanz, wenn vorhanden.
     */

    _entfernen() {
        let gesamtbilanz = document.querySelector("#gesamtbilanz");
        if(gesamtbilanz !== null) {
            gesamtbilanz.remove();
        }
    }

    /**
     * Diese globale Methode fügt das vorhandene HTML in den Body der index.html Datei ein.
     */

    anzeigen() {
        this._entfernen();
        document.querySelector("body").insertAdjacentElement("afterbegin", this._html);
    }



    
}