/* ------------------------------------------------------------------
   main.js – point d’entrée
------------------------------------------------------------------ */

import { renderCards }      from './Components/Cards.js';
import { setupModal }       from './Components/Modal.js';
import { renderFilterBar }  from './Components/FilterBar.js';
import { applyFilter }      from './Services/FilterService.js';
import { animateJourney }   from './Services/AnimationServices.js';

/* ----------------- Montage initial ----------------- */
const cardZone   = document.getElementById('cardContainer');
const filterZone = document.createElement('div');
cardZone.before(filterZone);          // barre juste au-dessus des cartes

// cartes complètes
renderCards(cardZone);
// barre de filtres
renderFilterBar(filterZone, (filterId) => {
  const filtered = applyFilter(filterId);
  renderCards(cardZone, filtered);
});

// modale, timeline, etc.
setupModal();
animateJourney();
setInterval(animateJourney, 15_000);

/* -------------- (optionnel) overlay login ---------- */
const overlay = document.getElementById('loginOverlay');
const form    = document.getElementById('loginForm');

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  overlay?.classList.add('hidden');
});
