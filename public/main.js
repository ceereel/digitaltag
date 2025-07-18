import { renderFilterBar } from './Components/FilterBar.js';
import { setupModal }      from './Components/Modal.js';

/* points d’ancrage DOM */
const cardsRoot  = document.getElementById('cardContainer');
const filterRoot = document.getElementById('filterBar');

/* barre + rendu initial */
renderFilterBar(filterRoot, cardsRoot);

/* modale (× / esc) */
setupModal();
