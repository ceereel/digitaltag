import { getAll } from '../Services/PhaseService.js';
import { openModal } from './Modal.js';

const PALETTE = {
  1: 'from-blue-600 to-blue-800 border-blue-400/30',
  2: 'from-green-600 to-green-800 border-green-400/30',
  3: 'from-purple-600 to-purple-800 border-purple-400/30',
  4: 'from-orange-600 to-orange-800 border-orange-400/30',
  5: 'from-red-600 to-red-800 border-red-400/30'
};

export function renderCards(container, phases = getAll()) {
  container.innerHTML = '';
  const grid = document.createElement('div');
  grid.className = 'relative z-10 grid gap-6 lg:grid-cols-5 text-white';

  phases.forEach((p, index) => {
    const card = document.createElement('button');
    card.className = `
      journey-step bg-gradient-to-br ${PALETTE[p.id]}
      rounded-2xl p-6 shadow-lg border flex flex-col
      transition hover:scale-[1.03] hover:shadow-2xl
    `;
    card.innerHTML = `
      <div class="badge">Étape ${index + 1}</div>
      <div class="text-center mb-4">
        <div class="text-6xl mb-2">${p.icon}</div>
        <h3 class="text-lg font-bold">${p.phaseLabel}</h3>
      </div>
      <div class="space-y-2 text-sm leading-relaxed">
        ${p.metas.map(txt =>
          `<div class="bg-white/10 rounded p-2 backdrop-blur-sm">${txt}</div>`
        ).join('')}
      </div>
      <p class="mt-auto text-center text-xs opacity-80 pt-4">
        Cliquez pour plus de détails
      </p>
    `;
    card.addEventListener('click', () => openModal(p.id));
    grid.appendChild(card);
  });

  container.appendChild(grid);
}
