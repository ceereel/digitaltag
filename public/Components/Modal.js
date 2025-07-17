import { get } from '../Services/PhaseService.js';

const modal     = document.getElementById('modal');
const modalBox  = document.getElementById('modalBox');
const iconEl    = document.getElementById('mIcon');
const titleEl   = document.getElementById('mTitle');
const subEl     = document.getElementById('mSub');
const contentEl = document.getElementById('mContent');
const closeBtn  = document.getElementById('closeBtn');

export function openModal (id) {
  const p = get(id);
  if (!p) return;

  iconEl.textContent  = p.icon;
  titleEl.textContent = p.phaseLabel;
  subEl.textContent   = p.moduleLabel;
  contentEl.innerHTML = `
    <p class="italic mb-4">${p.objectiveSentence}</p>
    <p class="mb-2 text-sm">${p.phaseExplain}</p>
    <p class="mb-4 text-sm">${p.moduleExplain}</p>

    <h4 class="font-semibold mb-1">Fonctionnalités clés</h4>
    <ul class="list-disc list-inside text-sm mb-4">
      ${p.features.map(f => `<li>${f}</li>`).join('')}
    </ul>

    <h4 class="font-semibold mb-1">Points de contact</h4>
    <ul class="list-disc list-inside text-sm">
      ${p.contacts.map(c => `<li>${c.icon} ${c.label}</li>`).join('')}
    </ul>`;

  modalBox.style.borderTopColor = p.accent;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

export function setupModal () {
  const close = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  };
  modal.addEventListener('click', e => {
    if (e.target === modal) close();
  });
  closeBtn?.addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });
}
