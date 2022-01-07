"use strict";

const eingabeformular = {


    formulardaten_holen(e) {

        return {
            titel: e.target.elements.titel.value,
            betrag: e.target.elements.betrag.value,
            ausgabe: e.target.elements.ausgabe.checked,
            datum: e.target.elements.datum.valueAsDate
        }
    },

    formulardaten_verarbeiten(formulardaten) {
            
        return {
            titel: formulardaten.titel.trim(),
            betrag: parseFloat(formulardaten.betrag) *100,
            typ: formulardaten.ausgabe === true ? "ausgabe" : "einnahme",
            datum: formulardaten.datum
        }
    },

    formulardaten_validieren(formulardaten) {

        let fehler = [];

        if(formulardaten.titel === "") { fehler.push("Titel"); }
        if(isNaN(formulardaten.betrag)) { fehler.push("Betrag"); }
        if(formulardaten.datum === null) { fehler.push("Datum"); }
        
        return fehler;
    },

    datum_aktualisieren() {
        let datums_input = document.querySelector("#datum");
        if(datums_input !== null) {
            datums_input.valueAsDate = new Date();
        }
    },
 

    absenden_event_hinzufügen(eingabeformular) {
        eingabeformular.querySelector("#eingabeformular").addEventListener("submit", e => {
            e.preventDefault();
            // console.log(e);
            let formulardaten = this.formulardaten_verarbeiten(this.formulardaten_holen(e));
            // console.log(formulardaten);
            let formular_fehler = this.formulardaten_validieren(formulardaten);
            if(formular_fehler.length === 0) {
                haushaltsbuch.eintrag_hinzufuegen(formulardaten);
                this.fehlerbox_entfernen();
                e.target.reset();
                this.datum_aktualisieren();
            } else if (document.querySelector("#eingabeformular-container") !== null){
                this.fehlerbox_entfernen();
                document.querySelector("#eingabeformular-container").insertAdjacentElement("afterbegin", this.html_fehlerbox_generieren(formular_fehler));
                }
        });
    },

    fehlerbox_entfernen() {
        let bestehende_fehlerbox = document.querySelector(".fehlerbox");
        if(bestehende_fehlerbox !== null) {
            bestehende_fehlerbox.remove()
        }
    },

    html_fehlerbox_generieren(formularfehler) {
        let fehlerbox = document.createElement("div");
        fehlerbox.className = "fehlerbox";
        fehlerbox.insertAdjacentHTML("beforeend", "<span>Folgende Felder wurden nicht korrekt ausgefüllt:</span>");
        fehlerbox.insertAdjacentHTML("beforeend", "<ul></ul>");
        
        formularfehler.forEach(fehler => {
            fehlerbox.lastChild.insertAdjacentHTML("beforeend" ,`<li>${fehler}</li>`);
        })

        return fehlerbox;

    },

    html_generieren() {

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
                <input type="number" id="betrag" name="betrag" form="eingabeformular" placeholder="z.B. 10,42" size="10" step="0.01" title="Betrag des Eintrags (max. zwei Nachkommastellen, kein €-Zeichen)">
                <label for="datum">Datum</label>
                <input type="date" id="datum" name="datum" form="eingabeformular" placeholder="jjjj-mm-tt" size="10" title="Datum des Eintrags (Format: jjjj-mm-tt)">
            </div>
        </div>
        <!-- Absenden-Button -->
        <div class="eingabeformular-zeile">
            <button class="standard" type="submit" form="eingabeformular">Hinzufügen</button>
        </div>`

        this.absenden_event_hinzufügen(eingabeformular);
        return eingabeformular;
    },

    anzeigen() {
        let navigationsleiste = document.querySelector("#navigationsleiste");
        if (navigationsleiste !== null) {
            document.querySelector("#navigationsleiste").insertAdjacentElement("afterend", this.html_generieren());
            this.datum_aktualisieren();
        }
    }

};
