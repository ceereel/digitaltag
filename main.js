// main.js  ------------------------------------------------------------
// ⚠️  Plus d'import de ./styles.css ici !

import { renderCards }   from './Components/Cards.js';
import { animateJourney} from './Services/AnimationServices.js';

document.addEventListener('DOMContentLoaded', () => {
  const appRoot = document.getElementById('app');

  // 1) construit la grille des cartes
  renderCards(appRoot);


  // 2) lance l’animation de la timeline + barre de progression
  animateJourney();
  setInterval(animateJourney, 15_000);   // relance toutes les 15 s
});
