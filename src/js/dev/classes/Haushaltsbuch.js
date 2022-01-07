/**
 * Das Modul "Haushaltsbuch" ist der Kern des Programms. 
 * Hier werden die Funktionen der einzelnen Teile wie Eingabeformular,
 * Gesamtbilanz, Monatslistensammlung usw. zusammengeführt und verbunden.
 * @module classes/Haushaltsbuch
 */

import Navigationsleiste from "./Navigationsleiste.js";
import Eingabeformular from "./Eingabeformular.js";
import Monatslistensammlung from "./Monatslistensammlung.js";
import Gesamtbilanz from "./Gesamtbilanz.js";
import Eintrag from "./Eintrag.js";

/**
 * Die Klasse "Haushaltsbuch" stellt alle Eigenschaften
 * und Methoden des Haushaltsbuches zur Verfügung.
 */

export default class Haushaltsbuch {

    constructor() {
        this._eintraege = [];
        this._navigationsleiste = new Navigationsleiste();
        this._eingabeformular = new Eingabeformular();
        this._monatslistensammlung = new Monatslistensammlung();
        this._gesamtbilanz = new Gesamtbilanz();
        this._wiederherstellen();
    }

    /**
     * Diese globale Methode instanziiert einen neuen Eintrag und fügt ihn in das 
     * Einträge-Array hinzu, sowie aktualisiert Monatslistensammlung und Gesamtbilanz.
     * Danach werden noch die Daten im Local Storage gespeichert.
     * @param {Object} eintragsdaten 
     */

    eintrag_hinzufuegen(eintragsdaten) { 
        let neuer_eintrag = new Eintrag(eintragsdaten.titel, eintragsdaten.betrag, eintragsdaten.typ, eintragsdaten.datum);
        this._eintraege.push(neuer_eintrag);
        this._monatslistensammlung._aktualisieren(this._eintraege);
        this._gesamtbilanz.aktualisieren(this._eintraege);
        this._speichern();
    }

    /**
     * Diese globale Methode entfernt einen Eintrag aus dem Einträge-Array des Haushaltsbuches
     * @param {Number} timestamp 
     */

    eintrag_entfernen(timestamp) {
        this._eintraege.forEach(eintrag => {
            if(eintrag._timestamp == timestamp) {
                this._eintraege.splice(this._eintraege.indexOf(eintrag), 1);
            }
        })
        this._monatslistensammlung._aktualisieren(this._eintraege);

        this._gesamtbilanz.aktualisieren(this._eintraege);
        this._speichern();
    }

    /**
     * Diese globale Methode sorgt für das Anzeigen aller Bestandteile
     * des Haushaltsbuches.
     */

    start() {
        this._navigationsleiste.anzeigen();
        this._eingabeformular.anzeigen();
        this._monatslistensammlung.anzeigen();
        this._gesamtbilanz.anzeigen();
        
    }

    /**
     * Diese private Methode speichert alle aktuellen Daten im Local Storage.
     */

    _speichern() {
        localStorage.setItem("eintraege", JSON.stringify(this._eintraege));
    }

    /**
     * Diese private Methode holt die gespeicherten Daten aus dem Local Storage
     * und instanziiert dann wieder die einzelnen Einträge.
     */

    _wiederherstellen() {
        let gespeicherte_eintraege = localStorage.getItem("eintraege");
        if(gespeicherte_eintraege !== null) {
            JSON.parse(gespeicherte_eintraege).forEach(eintrag => {
                this.eintrag_hinzufuegen({
                    titel: eintrag._titel,
                    betrag: eintrag._betrag,
                    typ: eintrag._typ,
                    datum: new Date(eintrag._datum)
                })
            });

        }
    }


    
}
