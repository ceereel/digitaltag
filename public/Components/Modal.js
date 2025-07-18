import { get } from '../Services/PhaseService.js';

const modal    = document.getElementById('modal');
const box      = document.getElementById('modalBox');
const mIcon    = document.getElementById('mIcon');
const mTitle   = document.getElementById('mTitle');
const mSub     = document.getElementById('mSub');
const mContent = document.getElementById('mContent');
const closeBtn = document.getElementById('closeBtn');

export function openModal(id){
  const p = get(id);
  if(!p) return;
  mIcon.textContent  = p.icon;
  mTitle.textContent = p.phaseLabel;
  mSub.textContent   = p.moduleLabel;

  mContent.innerHTML = `
    <p class="italic">${p.objectiveSentence}</p>
    <p>${p.phaseExplain}</p>
    <p>${p.moduleExplain}</p>
    <h4 class="font-semibold mt-4 mb-1">Fonctionnalités clés</h4>
    <ul class="list-disc list-inside">
      ${p.features.map(f=>`<li>${f}</li>`).join('')}
    </ul>
    <h4 class="font-semibold mt-4 mb-1">Points de contact</h4>
    <ul class="list-disc list-inside">
      ${p.contacts.map(c=>`<li>${c.icon} ${c.label}</li>`).join('')}
    </ul>
  `;
  box.style.borderTopColor = p.accent;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow='hidden';
}

export function setupModal(){
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e=>{
    if(e.target===modal) closeModal();
  });
  document.addEventListener('keydown', e=>{
    if(e.key==='Escape') closeModal();
  });
}
function closeModal(){
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow='';
}
