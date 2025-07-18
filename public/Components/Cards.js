import { get } from '../Services/PhaseService.js';
import { openModal } from './Modal.js';

const PALETTE={1:'from-green-600 to-green-800 border-green-400/30',
               2:'from-blue-600 to-blue-800 border-blue-400/30',
               3:'from-purple-600 to-purple-800 border-purple-400/30',
               4:'from-orange-600 to-orange-800 border-orange-400/30',
               5:'from-red-600 to-red-800 border-red-400/30'};

export function renderCards(container, ids){
  container.innerHTML='';
  const grid=document.createElement('div');
  grid.className='grid gap-6 lg:grid-cols-5 text-white font-medium';
  ids.forEach(id=>{
    const p=get(id);
    if(!p) return;
    const card=document.createElement('button');
    card.className=`bg-gradient-to-br ${PALETTE[id]} rounded-2xl p-6 shadow-lg border flex flex-col transition hover:scale-[1.04] hover:shadow-2xl`;
    card.innerHTML=`
      <div class="text-center mb-4">
        <div class="text-5xl mb-2">${p.icon}</div>
        <h3 class="text-lg font-semibold">${p.phaseLabel}</h3>
      </div>
      <div class="space-y-2 text-[13px] leading-snug">
        ${p.metas.map(t=>`<div class="bg-white/10 rounded p-2">${t}</div>`).join('')}
      </div>
      <p class="mt-auto text-center text-xs opacity-70 pt-3">Cliquez pour détails</p>`;
    card.addEventListener('click',()=>openModal(id));
    grid.appendChild(card);
  });
  container.appendChild(grid);
}
