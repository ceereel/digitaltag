import { get } from '../Services/PhaseService.js';

const modal    = document.getElementById('modal');
const modalBox = document.getElementById('modalBox');
const mIcon    = document.getElementById('mIcon');
const mTitle   = document.getElementById('mTitle');
const mSub     = document.getElementById('mSub');
const mContent = document.getElementById('mContent');
const closeBtn = document.getElementById('closeBtn');

export function openModal(id) {
  const p = get(id);
  if (!p) return;

  mIcon.textContent   = p.icon;
  mTitle.textContent  = p.phaseLabel;
  mSub.textContent    = p.moduleLabel;
  mContent.innerHTML  = `
    <p class="italic mb-4">${p.objectiveSentence}</p>
    <p class="mb-2">${p.phaseExplain}</p>
    <p class="mb-4">${p.moduleExplain}</p>
    <h4 class="font-semibold mb-1 text-[#0077d2]">Fonctionnalités clés</h4>
    <ul class="list-disc list-inside mb-4">
      ${p.features.map(f => `<li>${f}</li>`).join('')}
    </ul>
    <h4 class="font-semibold mb-1 text-[#0077d2]">Points de contact</h4>
    <ul class="list-disc list-inside mb-6">
      ${p.contacts.map(c => `<li>${c.icon} ${c.label}</li>`).join('')}
    </ul>
    <button id="showFeedbackBtn" class="text-sm text-white bg-[#0077d2] px-4 py-2 rounded hover:bg-[#005fa3] transition">Donner mon appréciation</button>
  `;

  modalBox.style.borderTopColor = p.accent;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';

  // Feedback
  setTimeout(() => {
    const feedbackBtn = document.getElementById('showFeedbackBtn');
    if (feedbackBtn) {
      feedbackBtn.addEventListener('click', () => {
        mContent.innerHTML = `
          <h3 class="text-md font-semibold text-gray-800 mb-4">Votre appréciation du module</h3>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium">Compréhension du rôle de ce module</label>
              <input type="range" min="1" max="5" class="w-full accent-[#0077d2]">
            </div>

            <div>
              <label class="block text-sm font-medium">Clarté de la séquence proposée</label>
              <select class="w-full text-sm p-2 border border-gray-300 rounded">
                <option>Oui</option>
                <option>Non</option>
                <option>Moyennement</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium">Pertinence pour vos besoins</label>
              <input type="range" min="1" max="5" class="w-full accent-[#0077d2]">
            </div>

            <div>
              <label class="block text-sm font-medium">La carte vous aide-t-elle à vous repérer ?</label>
              <select class="w-full text-sm p-2 border border-gray-300 rounded">
                <option>Oui</option>
                <option>Non</option>
                <option>Partiellement</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium">Souhaitez-vous réutiliser cette carte ?</label>
              <select class="w-full text-sm p-2 border border-gray-300 rounded">
                <option>Oui</option>
                <option>Non</option>
                <option>Peut-être</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium">Commentaire libre</label>
              <textarea rows="3" class="w-full text-sm p-2 border border-gray-300 rounded" placeholder="Ex. : Ce module est utile, mais..."></textarea>
            </div>

            <button id="submitFeedbackBtn" class="mt-4 bg-[#0077d2] text-white px-4 py-2 rounded hover:bg-[#005fa3] text-sm">
              Envoyer mon appréciation
            </button>
          </div>
        `;

        setTimeout(() => {
          const submitBtn = document.getElementById('submitFeedbackBtn');
          if (submitBtn) {
            submitBtn.addEventListener('click', () => {
              closeModal();
            });
          }
        }, 100);
      });
    }
  }, 100);
}

export function setupModal() {
  closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }
  window.closeModal = closeModal;
}
