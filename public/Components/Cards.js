// components/Cards.js
import { getAll } from '../services/PhaseService.js';
import { openModal } from './Modal.js';

// Gradients (fond des cartes)
const PALETTE = {
  1: 'from-[#0077d2] to-[#005fa3] border-white/20',
  2: 'from-[#ffb703] to-[#fb8500] border-white/20',
  3: 'from-[#06d6a0] to-[#118ab2] border-white/20',
  4: 'from-[#9b5de5] to-[#6a4c93] border-white/20',
  5: 'from-[#ef476f] to-[#d90429] border-white/20',
};

// Texte d’explication (intro au-dessus des cartes)
const USE_CASE_TEXTS = {
  1: "Vous avez choisi de faire un diagnostic : cette première étape vous permet de prendre de la hauteur sur votre maturité numérique. Grâce à des radars de performance, vous disposez d’une base solide pour piloter vos priorités stratégiques.",
  2: "Vous souhaitez comparer vos résultats à ceux d’organisations similaires. L’Observatoire vous offre un positionnement sectoriel objectif pour soutenir vos décisions d’investissement.",
  3: "Vous cherchez à structurer votre transformation digitale. Le Canevas vous aide à formaliser les jalons clés, à éviter les redondances et à embarquer vos équipes avec clarté.",
  4: "Vous avez besoin de recommandations immédiates. L’agent IA vous fournit des suggestions basées sur vos échanges en temps réel, pour stimuler l'agilité opérationnelle.",
  5: "Vous visez une mise en œuvre concrète. La Feuille de route vous permet de traduire votre stratégie en actions pilotées, avec des KPIs clairs et des échéances précises."
};

// Libellé du ruban par phase (Digital TAG)
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

// Couleur de fond du ruban (solide, comme avant)
const RIBBON_BG = {
  1: 'bg-[#005fa3]',   // bleu profond
  2: 'bg-[#fb8500]',   // orange
  3: 'bg-[#118ab2]',   // teal/bleu
  4: 'bg-[#6a4c93]',   // violet
  5: 'bg-[#d90429]',   // rose/rouge
};

export function renderCards(container, phases = getAll(), selectedUsecases = []) {
  if (!container) return;
  container.innerHTML = '';

  // Intro dynamique (au-dessus de la rangée)
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
    // stocké pour JourneyView si besoin
    container.dataset.introHTML = intro.outerHTML;
  }

  // Rangée de cartes (sur une seule ligne avec scale via CSS)
  const row = document.createElement('div');
  row.className = 'cards-horizontal';
  row.style.setProperty('--cards-n', String(phases.length));
  row.dataset.count = String(phases.length);

  phases.forEach((p, index) => {
    const ribbonText = ribbonTextByPhase(p.id);
    const ribbonBg   = RIBBON_BG[p.id] || 'bg-[#005fa3]';

    const card = document.createElement('button');
    card.className = `
      journey-step relative overflow-visible
      bg-gradient-to-br ${PALETTE[p.id]}
      rounded-2xl p-4 sm:p-5 shadow-lg border flex flex-col
      transition hover:shadow-2xl text-white card-animated
    `.replace(/\s+/g, ' ').trim();

    // ⚠️ Ruban vertical “original” conservé, seule la taille du texte est réduite
    // - position: absolute; côté droit
    // - inclinaison: -90°
    // - léger arrondi + ombre
    // - police plus petite (text-[10px]) pour tenir sur les libellés longs
    card.innerHTML = `
      <span
        class="absolute -right-2 top-8 -rotate-90 origin-top-right ${ribbonBg}
               text-white shadow-md rounded-t-md
               px-2 py-1 font-semibold tracking-tight
               text-[10px] leading-none select-none"
        style="letter-spacing:.01em;"
        aria-hidden="true"
      >
        ${ribbonText}
      </span>

      <div class="content-scale">
        <div class="badge text-[11px] sm:text-xs px-2 py-0.5 bg-white/15 rounded-full w-fit mb-2">
          Étape ${index + 1}
        </div>

        <div class="text-center mb-3">
          <div class="text-5xl sm:text-6xl mb-1.5">${p.icon}</div>
          <h3 class="text-base sm:text-lg font-bold text-white leading-tight">${p.phaseLabel}</h3>
        </div>

        <div class="space-y-1.5 text-[12.5px] sm:text-sm leading-relaxed">
          ${p.metas.map(txt => `<div class="bg-white/10 rounded px-2 py-1.5 backdrop-blur-sm">${txt}</div>`).join('')}
        </div>

        <p class="mt-3 sm:mt-4 text-center small-hint">Cliquez pour plus de détails</p>
      </div>
    `;

    // Interaction -> ouvre la fiche module
    card.addEventListener('click', () => {
      document.querySelectorAll('.journey-step').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      openModal(p.id);
    });

    row.appendChild(card);

    // Flèche entre cartes (masquée en mobile par le CSS si besoin)
    if (index < phases.length - 1) {
      const arrow = document.createElement('div');
      arrow.className = 'arrow-between';
      arrow.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-[#0077d2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      `;
      row.appendChild(arrow);
    }
  });

  container.appendChild(row);
}
