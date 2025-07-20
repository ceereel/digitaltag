// main.js

import { getAll } from './Services/PhaseService.js';
import { renderCards } from './Components/Cards.js';
import { setupModal } from './Components/Modal.js';
import { renderFilterBar } from './Components/FilterBar.js';
import { animateJourney } from './Services/AnimationServices.js';

document.addEventListener('DOMContentLoaded', () => {
  const cardContainer = document.getElementById('cardContainer');
  const filterPhrase = document.getElementById('filterPhrase');
  const filterBarContainer = document.getElementById('filterBar');
  const roadmapSVG = document.getElementById('roadmapSVG');

  if (!cardContainer || !filterBarContainer) {
    console.warn('❌ Certains éléments DOM sont introuvables. Vérifie les IDs.');
    return;
  }

  // Affiche toutes les cartes
  const allPhases = getAll();
  renderCards(cardContainer, allPhases);

  // Active les modales
  setupModal();

  // Animation de la roadmap
  animateJourney();
  setInterval(animateJourney, 15000);

  // Filtres dynamiques
  renderFilterBar(filterBarContainer, filterPhrase, cardContainer);
});
