/**
 * Das Modul "Monatsliste" ist für die einzelnen Monatslisten der Anwendung zuständig.
 * @module classes/Monatsliste
 */

/**
 * Die Klasse "Monatsliste" stellt alle Eigenschaften
 * und Methoden der Monatsliste (inkl. HTML) zur Verfügung.
 */
export class Monatsliste {

    constructor(monat, jahr) {
        this._jahr = jahr;
        this._monat = monat;
        this._eintraege = [];
        this._bilanz = 0;
        this._html = this._html_generieren();
    }

    /**
     * Diese Methode ist der Getter für das Datum als Monat der Monatsliste
     * @returns {Date} - Monat
     */

    monat() {
        return this._monat;
    }

    /**
     * Diese Methode ist der Getter für das Datum als Jahr der Monatsliste
     * @returns {Date} - Jahr
     */

    jahr() {
        return this._jahr;
    }

    /**
     * Diese Methode ist der Getter für das HTML der Monatsliste
     * @returns {Date} - aktuelles HTML Element
     */

    html() {
        return this._html;
    }

    /**
     * Diese globale Methode fügt einen Eintrag zur Monatsliste hinzu
     * und erneuert die Bilanz und Anzeige der Monatsliste.
     * @param {Eintrag} 
     */

    eintrag_hinzufuegen(eintrag) {
        this._eintraege.push(eintrag);
        this._bilanzieren();
        this._aktualisieren();
        
    }

    /**
     * Diese private Methode sortiert die Monatsliste nach Datum.
     */

    _eintraege_sortieren() {
        this._eintraege.sort((a, b) => {
            if(a._datum > b._datum) {
                return -1;
            } else if(a._datum < b._datum) {
                return 1
            } else {
                if(a.timestamp() > b.timestamp()) {
                    return -1;
                } else {
                    return 1;
                }
            }
        });
    }

    /**
     * Diese private Methode berechnet die Monatsbilanz.
     */

    _bilanzieren() {
        let monatsbilanz = 0;
        this._eintraege.forEach(eintrag => {
            if(eintrag.typ() === "einnahme"){
                monatsbilanz += eintrag.betrag();
            } else {
                monatsbilanz -= eintrag.betrag();
            }
            
        })
        this._bilanz = monatsbilanz;
    }

    /**
     * Diese private Methode zeigt die Monatsliste an.
     */

    _eintraege_anzeigen() {

        (document.querySelectorAll(".monatsliste ul")).forEach(a => {
            a.remove();
        });

        let ul = document.createElement("ul");
        for(let eintrag of this._eintraege) {

            ul.insertAdjacentElement("beforeend", eintrag._html);
        }
        document.querySelector(".monatsliste").insertAdjacentElement("afterbegin", ul);
    }

    /**
     * Diese private Methode generiert ein neues HTML Element,
     * welches alle Bestandteile der Monatsliste beinhaltet.
     * @returns {Element} - HTML der Monatsliste
     */

    _html_generieren() {
        let monatsliste_container = document.createElement("article");
        monatsliste_container.className = "monatsliste";

        let heading = document.createElement("h2");

        let monat_jahr = document.createElement("span");
        monat_jahr.className = "monat-jahr";
        monat_jahr.textContent = `${(new Date(this.jahr(), this.monat() -1).toLocaleDateString("de-DE", {month: "long", year: "numeric"}))}`
        heading.insertAdjacentElement("beforeend", monat_jahr);

        let monatsbilanz = document.createElement("span");
        this._bilanz < 0 ? monatsbilanz.setAttribute("class", "monatsbilanz negativ") : monatsbilanz.setAttribute("class", "monatsbilanz positiv");
        monatsbilanz.textContent = `${(this._bilanz /100).toFixed(2).replace(/\./, ",") }€`;
        heading.insertAdjacentElement("beforeend", monatsbilanz);

        monatsliste_container.insertAdjacentElement("beforeend", heading);

        let liste = document.createElement("ul");

        this._eintraege.forEach(eintrag => {
            liste.insertAdjacentElement("beforeend", eintrag.html());
        })
        monatsliste_container.insertAdjacentElement("beforeend", liste);

        return monatsliste_container;
    }

    /**
     * Diese private Methode aktualisiert alle Daten der Monatsliste.
     */

    _aktualisieren() {
        this._eintraege_sortieren();
        this._html = this._html_generieren();
    }

    
}
