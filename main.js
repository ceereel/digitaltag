import { createAndAppendCards } from './Components/Cards.js';
import { animatePhaseIndicator } from './Services/AnimationServices.js';
import { getPhases } from './Services/PhaseService.js';
import { setupModal } from './Components/Modal.js';

document.addEventListener('DOMContentLoaded', () => {
  const phases = getPhases();

  createAndAppendCards(phases);
  setupModal(phases); // doit être appelé après que le DOM contient les modales
  animatePhaseIndicator(phases);
});
