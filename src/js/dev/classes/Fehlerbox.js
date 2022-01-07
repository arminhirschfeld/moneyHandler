/**
 * Das Modul "Fehlerbox" ist für die Bereitsstellung der Fehleranzeigen im Eingabeformular zuständig. 
 * @module classes/Fehlerbox
 */

/**
 * Die Klasse "Fehlerbox" stellt alle Eigenschaften
 * und Methoden der Fehlerbox (inkl. HTML) zur Verfügung.
 */

export default class Fehlerbox {

    constructor(fehlertext, formular_fehler) {
        this._fehlertext = fehlertext;
        this._formular_fehler = formular_fehler;
        this._html = this._html_generieren();
    }

    /**
     * Diese private Methode generiert das HTML für eine Fehleranzeige im Eingabeformular.
     * @returns {Element} - HTML
     */

    _html_generieren() {
        let fehlerbox = document.createElement("div");
        fehlerbox.className = "fehlerbox";
        fehlerbox.insertAdjacentHTML("beforeend", `<span>${this._fehlertext}</span>`);
        fehlerbox.insertAdjacentHTML("beforeend", "<ul></ul>");
        
        this._formular_fehler.forEach(fehler => {
            fehlerbox.lastChild.insertAdjacentHTML("beforeend" ,`<li>${fehler}</li>`);
        })

        return fehlerbox;
    }

    /**
     * Diese private Methode sorgt dafür, dass zuvor erstellter 
     * (und angezeigter) Fehler wieder aus dem Eingabeformular entfernt wird
     */

    _entfernen() {
        let bestehende_fehlerbox = document.querySelector(".fehlerbox");
        if(bestehende_fehlerbox !== null) {
            bestehende_fehlerbox.remove()
        }
    }

    /**
     * Diese globale Methode sorgt für die Anzeige der Fehlerbox im Eingabeformular.
     */

    anzeigen() {
        this._entfernen();
        document.querySelector("#eingabeformular-container").insertAdjacentElement("afterbegin", this._html);
    }
    
}