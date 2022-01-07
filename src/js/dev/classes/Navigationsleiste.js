/**
 * Das Modul "Navigationsleiste" ist für die Navigationsleiste der Anwendung zuständig.
 * @module classes/Navigationsleiste
 */

export default class Navigationsleiste {

    /**
    * Die Klasse "Navigationsleiste" stellt alle Eigenschaften
    * und Methoden der Navigationsleiste (inkl. HTML) zur Verfügung.
    */

    constructor() {
        this._html = this._html_generieren();
        }

        _html_generieren() {
            let navigationsleiste = document.createElement("nav");
            navigationsleiste.id = "navigationsleiste";
            navigationsleiste.insertAdjacentHTML("afterbegin", "<a href=\"#\"><span id=\"markenname\">Liqui-Planner</span></a>");
            return navigationsleiste;
        }
        
        anzeigen() {
            if(document.querySelector("body") !== null) {
                document.querySelector("body").insertAdjacentElement("afterbegin", this._html);
            }
        }
    }

