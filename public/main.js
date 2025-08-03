// public/main.js

import { getAll } from './services/PhaseService.js';
import { renderCards } from './components/Cards.js';
import { setupModal } from './components/Modal.js';
import { renderUsecaseFilter } from './services/UsecaseFilter.js';
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
    // NE PAS afficher les cartes à l'ouverture
    cardContainer.innerHTML = `
      <p class="text-center text-gray-500 text-sm py-4">
        Sélectionnez un besoin pour afficher les modules correspondants.
      </p>
    `;

    setupModal();
    animateJourney();
    setInterval(animateJourney, 15000);

    // Affichage des blocs de services proposés
    renderUsecaseFilter(filterBarContainer, filterPhrase);
  } catch (error) {
    console.error('Erreur lors du chargement de la Journey Map :', error);
  }
});
