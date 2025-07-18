import { suggestPhases, defaultSequence } from '../Services/GoalService.js';
import { renderCards }                     from './Cards.js';

/* suggestions rapides pour l’autocomplete */
const QUICK = [
  'Diagnostiquer ma maturité',
  'Me comparer au marché',
  'Définir une feuille de route',
  'Obtenir des recommandations',
  'Piloter mes KPIs'
];

export function renderGoalBar(container, cardContainer){
  container.innerHTML = `
    <div class="flex flex-col items-center gap-2">
      <input id="goalInput" type="text"
        class="w-full max-w-md border rounded px-3 py-2 text-sm"
        placeholder="Ex : définir une feuille de route…" list="goalList"/>
      <datalist id="goalList">
        ${QUICK.map(q=>`<option value="${q}">`).join('')}
      </datalist>
      <button id="goalBtn" class="btn-primary px-6">Suggérer un parcours</button>
      <button id="resetBtn" class="text-xs underline text-gray-500 hidden">Réinitialiser</button>
    </div>
  `;

  const input  = container.querySelector('#goalInput');
  const goBtn  = container.querySelector('#goalBtn');
  const reset  = container.querySelector('#resetBtn');

  function applyFilter(){
    const seq = suggestPhases(input.value);
    const ids = seq ?? defaultSequence();
    renderCards(cardContainer, ids);
    reset.classList.toggle('hidden', seq===null);
  }

  goBtn.addEventListener('click', applyFilter);
  input.addEventListener('keydown', e=>{
    if(e.key==='Enter') applyFilter();
  });
  reset.addEventListener('click', ()=>{
    input.value='';
    applyFilter();
  });
}
