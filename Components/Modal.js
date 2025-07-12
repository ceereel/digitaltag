/* Components/Modal.js ------------------------------------------------ */
/*  – Fabrique la modale (HTML + listeners) à la première ouverture     */
/*  – openModal(id) : remplit et affiche                               */
/*  – closeModal()  : masque et ré-active le scroll                     */

import { PhaseService } from '../Services/PhaseService.js';

/* références DOM – créées lors du premier openModal() */
let modal, modalBox, iconEl, titleEl, subEl, contentEl;

/* couleurs d’accent pour la bordure haute */
const accentHex = {
  green  : '#22c55e',
  blue   : '#3b82f6',
  purple : '#8b5cf6',
  orange : '#fb923c',
  red    : '#ef4444'
};

/* Construction paresseuse de la modale */
function ensureModal () {
  if (modal) return;           // déjà créée

  modal = document.createElement('div');
  modal.id = 'modal';
  modal.className =
    'fixed inset-0 bg-black/50 hidden items-center justify-center z-50';

  modal.innerHTML = /* html */`
    <div id="modalBox"
         class="bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-[46rem]
                max-h-[90vh] overflow-y-auto border-t-8 border-transparent">
      <div class="flex justify-between items-start mb-6">
        <div class="flex items-center gap-4">
          <div id="modalIcon" class="text-3xl"></div>
          <div>
            <h2 id="modalTitle"   class="text-2xl font-bold"></h2>
            <p  id="modalSubtitle" class="text-gray-500 text-sm"></p>
          </div>
        </div>
        <button id="modalClose"
                class="text-gray-400 hover:text-gray-700 text-3xl font-bold">
          &times;
        </button>
      </div>
      <div id="modalContent" class="prose max-w-none"></div>
    </div>`;

  document.body.appendChild(modal);

  /* cache des éléments internes */
  modalBox   = modal.querySelector('#modalBox');
  iconEl     = modal.querySelector('#modalIcon');
  titleEl    = modal.querySelector('#modalTitle');
  subEl      = modal.querySelector('#modalSubtitle');
  contentEl  = modal.querySelector('#modalContent');

  /* Listeners de fermeture */
  modal.querySelector('#modalClose').addEventListener('click', closeModal);
  modal.addEventListener('click',   e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

/* ---------- API publique ------------------------------------------- */
/* Smooth modal transition with slower fade-in and quicker fade-out */
export function openModal (id) {
  ensureModal();

  const d = PhaseService.get(id);
  if (!d) return console.error(`Phase ${id} inconnue`);

  /* Contenu */
  iconEl.textContent      = d.icon;
  titleEl.textContent     = d.title;
  subEl.textContent       = d.subtitle;
  subEl.style.color = d.subtitleColor ?? '#374151';   // gris par défaut
  contentEl.innerHTML     = d.content;
  modalBox.style.borderTopColor = accentHex[d.color] ?? '#0077d2';

  /* Affiche avec slower fade-in transition */
  modal.classList.remove('hidden');
  modal.style.opacity = '0';
  modal.style.transform = 'translateY(-20px)';
  setTimeout(() => {
    modal.style.opacity = '1';
    modal.style.transform = 'translateY(0)';
    modal.classList.add('flex');
  }, 10); // Delay for transition
  modal.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; // Slower fade-in
  document.body.style.overflow = 'hidden';
}

export function closeModal () {
  if (!modal) return;
  modal.style.transition = 'opacity 0.2s ease, transform 0.2s ease'; // Quicker fade-out
  modal.style.opacity = '0';
  modal.style.transform = 'translateY(-20px)';
  setTimeout(() => {
    modal.classList.remove('flex');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }, 200); // Match the quicker fade-out duration
}

/* Pour l’attribut inline onclick="closeModal()" (facultatif) */
window.closeModal = closeModal;
