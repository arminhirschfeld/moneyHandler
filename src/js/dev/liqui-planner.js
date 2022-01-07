/**
 * Das Modul "main" erstellt eine neue Instanz des Haushaltsbuch 
 * und startet die Anwendung (also zeigt auch alles an)
 * @module main
 */

import Haushaltsbuch from "./classes/Haushaltsbuch.js";

let liqui_planner = new Haushaltsbuch();
liqui_planner.start();

export default liqui_planner;