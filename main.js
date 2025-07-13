import { getPhases }           from "./Services/PhaseService.js";
import { createAndAppendCards } from "./Components/Cards.js";
import { setupModal }           from "./Components/Modal.js";

document.addEventListener("DOMContentLoaded", () => {
  const phases = getPhases();
  createAndAppendCards(phases);
  setupModal(phases);
});
