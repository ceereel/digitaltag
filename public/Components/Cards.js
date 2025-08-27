// /public/components/Cards.js
import { getAll } from '../services/PhaseService.js';
import { openModal } from './Modal.js';

const PALETTE = {
  1: 'from-[#0077d2] to-[#005fa3] border-white/20',
  2: 'from-[#ffb703] to-[#fb8500] border-white/20',
  3: 'from-[#06d6a0] to-[#118ab2] border-white/20',
  4: 'from-[#9b5de5] to-[#6a4c93] border-white/20',
  5: 'from-[#ef476f] to-[#d90429] border-white/20',
};

const USE_CASE_TEXTS = {
  1: "Vous avez choisi de faire un diagnostic : cette première étape vous permet de prendre de la hauteur sur votre maturité numérique. Grâce à des radars de performance, vous disposez d’une base solide pour piloter vos priorités stratégiques.",
  2: "Vous souhaitez comparer vos résultats à ceux d’organisations similaires. L’Observatoire vous offre un positionnement sectoriel objectif pour soutenir vos décisions d’investissement.",
  3: "Vous cherchez à structurer votre transformation digitale. Le Canevas vous aide à formaliser les jalons clés, à éviter les redondances et à embarquer vos équipes avec clarté.",
  4: "Vous avez besoin de recommandations immédiates. L’agent IA vous fournit des suggestions basées sur vos échanges en temps réel, pour stimuler l'agilité opérationnelle.",
  5: "Vous visez une mise en œuvre concrète. La Feuille de route vous permet de traduire votre stratégie en actions pilotées, avec des KPIs clairs et des échéances précises."
};

function ribbonTextByPhase(id) {
  switch (Number(id)) {
    case 1: return 'Digital Arc Hub';
    case 2: return 'Observatoire';
    case 3: return 'Canevas';
    case 4: return 'Agent IA';
    case 5: return 'Feuille de route';
    default: return '';
  }
}

const RIBBON_BG = {
  1: 'bg-[#005fa3]',
  2: 'bg-[#fb8500]',
  3: 'bg-[#118ab2]',
  4: 'bg-[#6a4c93]',
  5: 'bg-[#d90429]',
};

export function renderCards(container, phases = getAll(), selectedUsecases = []) {
  if (!container) return;
  container.innerHTML = '';

  if (selectedUsecases.length > 0) {
    const intro = document.createElement('div');
    intro.className = 'recommend-text';
    intro.innerHTML = `
      <h3>Pourquoi ce parcours vous est recommandé</h3>
      <ul>
        ${selectedUsecases
          .filter(id => USE_CASE_TEXTS[id])
          .map(id => `<li>${USE_CASE_TEXTS[id]}</li>`).join('')}
      </ul>
    `;
    container.appendChild(intro);
    container.dataset.introHTML = intro.outerHTML;
  }

  const row = document.createElement('div');
  row.className = 'cards-horizontal';
  row.style.setProperty('--cards-n', String(phases.length));
  row.dataset.count = String(phases.length);

  row.style.overflowX = 'auto';
  row.style.overflowY = 'hidden';
  row.style.webkitOverflowScrolling = 'touch';
  row.style.scrollSnapType = 'x mandatory';
  row.style.scrollPadding = '12px'; 

  enableDragScroll(row);

  phases.forEach((p, index) => {
    const ribbonText = ribbonTextByPhase(p.id);
    const ribbonBg   = RIBBON_BG[p.id] || 'bg-[#005fa3]';

    const card = document.createElement('button');
    card.className = `
      journey-step relative overflow-visible scale-180
      bg-gradient-to-br ${PALETTE[p.id]}
      rounded-xl p-3 shadow-md border flex flex-col
      transition hover:shadow-xl text-white card-animated
    `.replace(/\s+/g, ' ').trim();

    card.style.scrollSnapAlign = 'start';
    card.style.scrollMargin = '12px';

    card.innerHTML = `
      <span
        class="absolute -right-1.5 top-6 -rotate-90 origin-top-right ${ribbonBg}
               text-white shadow-md rounded-t-md
               px-1.5 py-0.5 font-semibold tracking-tight
               text-[9px] leading-none select-none"
        style="letter-spacing:.01em;"
        aria-hidden="true"
      >
        ${ribbonText}
      </span>

      <div class="content-scale">
        <div class="badge text-[10px] px-1.5 py-0.5 bg-white/15 rounded-full w-fit mb-1.5">
          Étape ${index + 1}
        </div>

        <div class="text-center mb-2">
          <div class="text-4xl mb-1">${p.icon}</div>
          <h3 class="text-sm font-bold text-white leading-tight">${p.phaseLabel}</h3>
        </div>

        <div class="space-y-1 text-[11px] leading-relaxed">
          ${p.metas.map(txt => `<div class="bg-white/10 rounded px-1.5 py-1 backdrop-blur-sm">${txt}</div>`).join('')}
        </div>

        <p class="mt-2 text-center text-[10px] italic opacity-80">Cliquez pour plus de détails</p>
      </div>
    `;

    card.addEventListener('click', () => {
      document.querySelectorAll('.journey-step').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      openModal(p.id);
    });

    row.appendChild(card);

    if (index < phases.length - 1) {
      const arrow = document.createElement('div');
      arrow.className = 'arrow-between';
      arrow.style.flex = '0 0 auto';
      arrow.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#0077d2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      `;
      row.appendChild(arrow);
    }
  });

  container.appendChild(row);
}
function enableDragScroll(el) {
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let moved = 0;

  const clickBlocker = (e) => {
    if (moved > 5) {
      e.preventDefault();
      e.stopPropagation();
    }
    moved = 0;
  };

  el.addEventListener('pointerdown', (e) => {
    isDown = true;
    startX = e.clientX;
    scrollLeft = el.scrollLeft;
    moved = 0;
    el.classList.add('is-dragging');
    el.setPointerCapture?.(e.pointerId);
  });

  el.addEventListener('pointermove', (e) => {
    if (!isDown) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 2) moved = Math.max(moved, Math.abs(dx));
    el.scrollLeft = scrollLeft - dx;
  });

  const endDrag = (e) => {
    isDown = false;
    el.classList.remove('is-dragging');
  };
  el.addEventListener('pointerup', endDrag);
  el.addEventListener('pointercancel', endDrag);
  el.addEventListener('pointerleave', endDrag);

  el.addEventListener('click', clickBlocker, true);
}
