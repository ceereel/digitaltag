/* ---------------------------------------------------------------------
   Components/Cards.js
   - génère la grille responsive des cartes phases
   ------------------------------------------------------------------ */

   import { PhaseService } from '../Services/PhaseService.js';
   import { openModal }    from './Modal.js';
   
   /* Palette d’icônes (juste la couleur du pictogramme) */
   const iconColors = [
     'text-green-600',   // Phase 1
     'text-blue-600',    // Phase 2
     'text-purple-600',  // Phase 3
     'text-orange-600',  // Phase 4
     'text-red-600'      // Phase 5
   ];
   
   /**
    * Injecte la grille des cartes dans le conteneur passé en argument
    * @param {HTMLElement} container – noeud racine où insérer la grille
    */
   export function renderCards(container){
     /* Grille responsive : 1 col. mobile → 5 cols. desktop */
     const grid = document.createElement('div');
     grid.className =
       'relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 font-normal ' +
       'text-[var(--text-main)]';
   
     /* On récupère les données (tableau indexé 0-based) */
     PhaseService.getAll().forEach((phase, idx) => {
   
       /* --- Bouton = carte --- */
       const card = document.createElement('button');
       card.type  = 'button';
       card.className =
         'card-phase group p-6 flex flex-col text-left rounded-2xl shadow-xl ' +
         'transition-transform duration-200 ease-in-out hover:-translate-y-1 ' +
         'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ' +
         `bg-gradient-to-br from-${phase.color}-600 to-${phase.color}-800 border border-${phase.color}-400/40`;
   
       /* --- HTML interne --- */
       card.innerHTML = `
         <!-- Header de carte -->
         <div class="mb-4">
           <div class="card-icon ${iconColors[idx]} text-5xl mb-2">
             ${phase.icon}
           </div>
           <h3 class="text-lg font-semibold mb-1">
             ${phase.title.split(' –')[0] /* « Phase X » */}
           </h3>
           <p class="text-sm text-[var(--text-muted)]">
             ${phase.subtitle}
           </p>
         </div>
   
         <!-- Résumé Objectif / Touchpoints -->
         <div class="space-y-3 text-sm leading-relaxed flex-1">
           <div>
             <span class="text-[var(--accent)]">Objectif&nbsp;:</span>
             <p class="mt-1">${phase.card.objectives}</p>
           </div>
           <div>
             <span class="text-[var(--accent)]">Points de contact&nbsp;:</span>
             <p class="mt-1">${phase.card.touchpoints}</p>
           </div>
         </div>
   
         <!-- Pied -->
         <span class="mt-6 inline-block text-xs text-[var(--accent)] group-hover:underline">
           Découvrir la phase&nbsp;›
         </span>
       `;
   
       /* Ouverture de la modale */
       card.addEventListener('click', () => openModal(idx + 1));
   
       grid.appendChild(card);
     });
   
     container.appendChild(grid);
   }
   