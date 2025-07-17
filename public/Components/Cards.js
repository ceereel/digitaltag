/* ------------------------------------------------------------------
   Cards – construit dynamiquement la grille des cartes phases
------------------------------------------------------------------ */

import { get, getAll } from '../Services/PhaseService.js';
import { openModal }  from './Modal.js';

/* Palette pour les dégradés ---------------------------------------- */
const PALETTE = {
  1: 'from-green-600  to-green-800  border-green-400/30',
  2: 'from-blue-600   to-blue-800   border-blue-400/30',
  3: 'from-purple-600 to-purple-800 border-purple-400/30',
  4: 'from-orange-600 to-orange-800 border-orange-400/30',
  5: 'from-red-600    to-red-800    border-red-400/30'
};

/**
 *  container : élément DOM cible
 *  phasesArr : tableau d’objets phase (défaut = getAll())
 */
export function renderCards (container, phasesArr = getAll()) {
  if (!container) return;
  container.innerHTML = '';

  const grid = document.createElement('div');
  grid.className =
    'grid gap-6 lg:grid-cols-5 text-white font-medium';

  phasesArr.forEach(p => {
    const btn = document.createElement('button');
    btn.className =
      `journey-step bg-gradient-to-br ${PALETTE[p.id]} ` +
      'rounded-2xl p-6 shadow-lg border flex flex-col transition ' +
      'hover:scale-[1.04] hover:shadow-2xl focus:outline-none';
    btn.innerHTML = `
      <div class="text-center mb-4">
        <div class="text-5xl mb-2">${p.icon}</div>
        <h3 class="text-lg font-bold">${p.phaseLabel}</h3>
      </div>

      <div class="space-y-2 text-sm leading-relaxed">
        ${p.metas.map(t => `<div class="bg-white/10 p-2 rounded">${t}</div>`).join('')}
      </div>

      <p class="mt-auto text-xs opacity-80 pt-4">
        Cliquez pour plus de détails
      </p>`;
    btn.addEventListener('click', () => openModal(p.id));
    grid.appendChild(btn);
  });

  container.appendChild(grid);
}
