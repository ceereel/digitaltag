// main.js

import { createAndAppendCards } from './Components/Cards.js';
import { animatePhaseIndicator } from './Services/AnimationServices.js';
import { getPhases } from './Services/PhaseService.js';
import { setupModal } from './Components/Modal.js';

document.addEventListener('DOMContentLoaded', () => {
  const phases = getPhases();

  // Initialisation des composants
  createAndAppendCards(phases);
  animatePhaseIndicator(phases);
  setupModal(phases);

  // Gestion des événements personnalisés
  window.addEventListener('openModal', event => {
    const { idx } = event.detail;
    const open = new CustomEvent('openModalInternal', { detail: { idx } });
    window.dispatchEvent(open);
  });
});
