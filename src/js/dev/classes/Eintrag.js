/**
 * Das Modul "Eintrag" ist für den einzelnen jeweiligen Eintrag 
 * in der Monatsliste zuständig.
 * @module classes/Eintrag 
 */

import liqui_planner from "../liqui-planner.js";


/**
 * Die Klasse Eintrag stellt alle Eigenschaften und Methoden 
 * des Eintrags (inkl. HTML) zur Verfügung.
 */
export default class Eintrag {

    constructor(titel, betrag, typ, datum) {
        this._titel = titel;
        this._betrag = betrag;
        this._typ = typ;
        this._datum = datum
        this._timestamp = Date.now();
        this._html = this._html_generieren();
    }

    /**
     * Diese Methode ist der Getter für den Titel des Eintrags-Objektes
     * @returns {String}
     */

    titel() {
        return this._titel;
    }

    /**
     * Diese globale Methode ist der Getter für den Betrag des Eintrags-Objektes
     * @returns {Number}
     */

    betrag() {
        return this._betrag;
    }

    /**
     * Diese globale Methode ist der Getter für den Typ des Eintrags-Objektes
     * @returns {String}
     */

    typ() {
        return this._typ;
    }

    /**
     * Diese globale Methode ist der Getter für das Datum des Eintrags-Objektes
     * @returns {String}
     */

    datum() {
        return this._datum;
    }

    /**
     * Diese globale Methode ist der Getter für den Timestamp des Eintrags-Objektes
     * @returns {Number}
     */

    timestamp() {
        return this._timestamp;
    }
    
    /**
     * Diese globale Methode ist der Getter für das HTML des Eintrags-Objektes
     * @returns {Element} - das vorhandene HTML für den Eintrag
     */

    html() {
        return this._html;
    }

    /**
     * Diese globale private Methode gibt das generierte HTML für den jeweiligen Eintrag zurück.
     * @returns {Element} - das neu erstellte HTML für den Eintrag
     */

    _html_generieren() {

        let li = document.createElement("li");
        this.typ() === "einnahme" ? li.setAttribute("class", "einnahme") : li.setAttribute("class", "ausgabe");
        li.setAttribute("data-timestamp", this.timestamp());

        li.insertAdjacentHTML("beforeend", `<span class=\"datum\">${this.datum().toLocaleDateString("de-DE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        })}</span>`);
        li.insertAdjacentHTML("beforeend", `<span class=\"titel\">${this.titel()}</span>`);
        li.insertAdjacentHTML("beforeend", `<span class=\"betrag\">${(this.betrag() /100).toFixed(2).replace(/\./, ",")}€</span>`);
        li.insertAdjacentHTML("beforeend", `<button class=\"entfernen-button\"><i class=\"fas fa-trash\"></i></button>`);

        this._eintrag_event_hinzufügen(li.lastElementChild);
        return li;
    }

    /**
     * Diese private Methode fügt einen Event Listener zum Button im Eintrag hinzu, damit 
     * durch einen Click auf den Button der Eintrag entfernt werden kann.
     * @param {Element} button 
     */

    _eintrag_event_hinzufügen(button) {
        button.addEventListener("click", e => {

            liqui_planner.eintrag_entfernen(e.target.parentElement.dataset.timestamp);
        } )
    }
    
}
