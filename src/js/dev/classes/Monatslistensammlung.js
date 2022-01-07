/**
 * Das Modul "Monatslistensammlung" ist für die Monatslistensammlung der Anwendung zuständig.
 * @module classes/Monatslistensammlung
 */

import Eintrag from "./Eintrag.js";
import { Monatsliste } from "./Monatsliste.js";


/**
 * Die Klasse "Monatslistensammlung" stellt alle Eigenschaften
 * und Methoden der Monatslistensammlung (inkl. HTML) zur Verfügung.
 */
export default class Monatslistensammlung {

    constructor() {
        this._monatslisten = [];
        this._html = this._html_generieren();
    }

    /**
     * Diese private Methode fügt einen neuen Eintrag zu einer Monatsliste hinzu
     * @param {Eintrag} eintrag 
     */

    _eintrag_hinzufuegen(eintrag) {
        let eintragsmonat = eintrag.datum().toLocaleString("de-DE", {month: "numeric"});
        let eintragsjahr = eintrag.datum().toLocaleString("de-DE", {year: "numeric"});
        let monatsliste_vorhanden = false;
        this._monatslisten.forEach(monatsliste => {
            if(eintragsmonat === monatsliste.monat() && eintragsjahr === monatsliste.jahr()) {
                monatsliste.eintrag_hinzufuegen(eintrag);
                monatsliste_vorhanden = true;
            }
        });
        if(!monatsliste_vorhanden) {
            this._monatsliste_hinzufuegen(eintragsmonat, eintragsjahr, eintrag);
        }
    }

    /**
     * Diese private Methode instanziiert eine neue Monatsliste und fügt einen Eintrag hinzu
     * @param {Date} eintragsmonat 
     * @param {Date} eintragsjahr 
     * @param {Eintrag} eintrag 
     */

    _monatsliste_hinzufuegen(eintragsmonat, eintragsjahr, eintrag) {
        let neue_monatsliste = new Monatsliste(eintragsmonat, eintragsjahr);
        neue_monatsliste.eintrag_hinzufuegen(eintrag);
        this._monatslisten.push(neue_monatsliste);
    }

    /**
     * Diese private Methode sortiert die Monatslisten nach Datum
     */

    _monatslisten_sortieren() {
        this._monatslisten.sort((a, b) => {
            if(a.jahr() > b.jahr()) {
                return -1;
            } else if(a.jahr() < b.jahr())  {
                return 1;
            } else {
                if(a.monat() > b.jahr()) {
                    return -1;
                } else {
                    return 1;
                }
            }
        })
    }

    /**
     * Diese private Methode erstellt das HTML für die Monatslistensammlung
     * @returns {HTML} - HTML der Monatslistensammlung
     */

    _html_generieren() {
        let monatslistensammlung_section = document.createElement("section");
        monatslistensammlung_section.setAttribute("id", "monatslisten");
        this._monatslisten.forEach(monatsliste => {
            monatslistensammlung_section.insertAdjacentElement("beforeend", monatsliste.html());
        });
        return monatslistensammlung_section;
    }

    /**
     * Diese private Methode aktualisiert die Monatslistensammlung
     * (Einträge werden neu abgefragt, HTML wird neu generiert und neue Anzeige)
     * @param {Array} eintraege 
     */

    _aktualisieren(eintraege) {
        this._monatslisten = [];
        eintraege.forEach(eintrag => this._eintrag_hinzufuegen(eintrag));
        this._monatslisten_sortieren();
        this._html = this._html_generieren();
        this.anzeigen();
    }

    /**
     * Diese private Methode entfernt eine bereits bestehende Monatslistensammlung, wenn vorhanden.
     */

    _entfernen() {
        let monatslistensammlung = document.querySelector("#monatslisten");
        if(monatslistensammlung !== null){
            monatslistensammlung.remove();
        }
    }

    /**
     * diese globale Methode setzt das HTML in den Body und 
     * zeigt die Monatslistensammlung an
     */

    anzeigen() {
        let eingabeformular_container = document.querySelector("#eingabeformular-container");
        if(eingabeformular_container !== null) {
            this._entfernen();
            eingabeformular_container.insertAdjacentElement("afterend", this._html);
        }
    }

    
}