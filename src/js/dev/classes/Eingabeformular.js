/**
 * Das Modul "Eingabeformular" ist für das Eingabeformular der Anwendung zuständig.
 * @module classes/Eingabeformular
 */

import Fehlerbox from "./Fehlerbox.js";
import liqui_planner from "../liqui-planner.js";

/**
 * Die Klasse "Eingabeformular" stellt alle Eigenschaften
 * und Methoden des Eingabeformulars (inkl. HTML und Events) zur Verfügung.
 */

export default class Eingabeformular {

    /**
     * Der Konstruktor generiert bei Instanziierung der Klasse "Eingabeformular" 
     * das HTML des Eingabeformulars.
     * @prop {Element} _html - das HTML des Eingabeformulars
     * 
     */
    constructor() {
        this._html = this._html_generieren();
    }

    /**
     * Diese private Methode extrahiert die im Eingabeformular eingegebenen Daten 
     * aus dem Submit-Event des Eingabeformulars
     * @param {Event} submit_event - das Submit Event des Eingabeformulars
     * @returns {Object} - einfaches Objekt mit den Rohdaten des Eingabeformulars
     */

    _formulardaten_holen(submit_event) {

        return {
            titel: submit_event.target.elements.titel.value,
            betrag: submit_event.target.elements.betrag.value,
            ausgabe: submit_event.target.elements.ausgabe.checked,
            datum: submit_event.target.elements.datum.valueAsDate
        }
    }

    /**
     * Diese private Methode macht kleine Veränderungen an dem Input aus dem Eingabeformular.
     * @param {Object} formulardaten 
     * @returns {Object} - einfaches Objekt mit kleinen Veränderungen an den Nutzereingaben
     */

    _formulardaten_verarbeiten(formulardaten) {
            
        return {
            titel: formulardaten.titel.trim(),
            betrag: parseFloat(formulardaten.betrag) *100,
            typ: formulardaten.ausgabe === true ? "ausgabe" : "einnahme",
            datum: formulardaten.datum
        }
    }

    /**
     * Diese private Methode überprüft die Nutzereingaben aus Eingabeformular auf Richtigkeit.
     * @param {Object} formulardaten 
     * @returns {Array} - Gibt ein Array mit Strings zurück, die die einzelnen Fehler beinhalten
     */

    _formulardaten_validieren(formulardaten) {

        let fehler = [];

        if(formulardaten.titel === "") { fehler.push("Titel"); }
        if(isNaN(formulardaten.betrag)) { fehler.push("Betrag"); }
        if(formulardaten.datum === null) { fehler.push("Datum"); }
        
        return fehler;
    }

    /**
     * Diese private Methode soll den Input "Datum" im Eingabeformular auf das heutige Datum zurücksetzen.
     */

    _datum_aktualisieren() {
        let datums_input = document.querySelector("#datum");
        if(datums_input !== null) {
            datums_input.valueAsDate = new Date();
        }
    }

    /**
     * Diese private Methode soll dem Eingabeformular einen Event-Listener zuweisen, der uns Informationen über
     * die einzelnen Eingabeparameter (Titel, Typ, Betrag, Datum) gibt.
     * @param {Element} eingabeformular
     */
 

    _absenden_event_hinzufügen(eingabeformular) {
        eingabeformular.querySelector("#eingabeformular").addEventListener("submit", submit_event => {
            submit_event.preventDefault();
            let formulardaten = this._formulardaten_verarbeiten(this._formulardaten_holen(submit_event));
            let formular_fehler = this._formulardaten_validieren(formulardaten);
            
            if(formular_fehler.length === 0) {
                liqui_planner.eintrag_hinzufuegen(formulardaten);
                let bestehende_fehlerbox = document.querySelector(".fehlerbox");
                if(bestehende_fehlerbox !== null) {
                    bestehende_fehlerbox.remove()
                }
                submit_event.target.reset();
                this._datum_aktualisieren();
            } else if (document.querySelector("#eingabeformular-container") !== null){
                let fehler = new Fehlerbox("Folgende Felder wurden nicht korrekt ausgefüllt:", formular_fehler);
                fehler.anzeigen();
                }
        });
    }

    /**
     * Diese private Methode erstellt das gesamte HTML-Konstrukt für das Eingabeformular.
     * @returns {Element} - die Section "Eingabeformular" mit allen darin enthaltenen Elementen.
     */

    _html_generieren() {

        let eingabeformular = document.createElement("section");
        eingabeformular.id = "eingabeformular-container";
        eingabeformular.innerHTML = 
        
        `<!-- Formular -->
        <form id="eingabeformular" action="#" method="get"></form>
        <!-- Titel -->
        <div class="eingabeformular-zeile">
            <h1>Neue Einnahme / Ausgabe hinzufügen</h1>
        </div>
        <!-- Titel-Typ-Eingabezeile -->
        <div class="eingabeformular-zeile">
            <div class="titel-typ-eingabe-gruppe">
                <label for="titel">Titel</label>
                <input type="text" id="titel" form="eingabeformular" name="titel" placeholder="z.B. Einkaufen" size="10" title="Titel des Eintrags">
                <input type="radio" id="einnahme" name="typ" value="einnahme" form="eingabeformular" title="Typ des Eintrags">
                <label for="einnahme" title="Typ des Eintrags">Einnahme</label>
                <input type="radio" id="ausgabe" name="typ" value="ausgabe" form="eingabeformular" title="Typ des Eintrags" checked>
                <label for="ausgabe" title="Typ des Eintrags">Ausgabe</label>
            </div>
        </div>
        <!-- Betrag-Datum-Eingabezeile -->
        <div class="eingabeformular-zeile">
            <div class="betrag-datum-eingabe-gruppe">
                <label for="betrag">Betrag</label>
                <input type="number" id="betrag" name="betrag" form="eingabeformular" placeholder="z.B. 10,42" size="10" step="0.01" min="0.01" title="Betrag des Eintrags (max. zwei Nachkommastellen, kein €-Zeichen)">
                <label for="datum">Datum</label>
                <input type="date" id="datum" name="datum" form="eingabeformular" size="10" title="Datum des Eintrags">
            </div>
        </div>
        <!-- Absenden-Button -->
        <div class="eingabeformular-zeile">
            <button class="standard" type="submit" form="eingabeformular">Hinzufügen</button>
        </div>`

        this._absenden_event_hinzufügen(eingabeformular);
        return eingabeformular;
    }

    /**
     * Diese globale Methode sorgt für das Anzeigen des Eingabeformulars, direkt unter der Navigationsleiste.
     */

    anzeigen() {
        let navigationsleiste = document.querySelector("#navigationsleiste");
        if (navigationsleiste !== null) {
            navigationsleiste.insertAdjacentElement("afterend", this._html_generieren());
            this._datum_aktualisieren();
        }
    }

}