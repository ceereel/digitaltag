// public/main.js

import { getAll } from './services/PhaseService.js';
import { renderCards } from './components/Cards.js';
import { setupModal } from './components/Modal.js';
import { renderFilterBar } from './components/FilterBar.js';
import { animateJourney } from './services/AnimationServices.js';

document.addEventListener('DOMContentLoaded', () => {
  const cardContainer = document.getElementById('cardContainer');
  const filterPhrase = document.getElementById('filterPhrase');
  const filterBarContainer = document.getElementById('filterBar');
  const roadmapSVG = document.getElementById('roadmapSVG');

  if (!cardContainer || !filterBarContainer) {
    console.warn('❌ Certains éléments DOM sont introuvables. Vérifie les IDs.');
    return;
  }

  try {
    const allPhases = getAll();
    renderCards(cardContainer, allPhases);
    setupModal();
    animateJourney();
    setInterval(animateJourney, 15000);
    renderFilterBar(filterBarContainer, filterPhrase, cardContainer);
  } catch (error) {
    console.error('Erreur lors du chargement de la Journey Map :', error);
  }
});
