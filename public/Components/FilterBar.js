import { buildSequence } from '../Services/GoalService.js';
import { renderCards }   from './Cards.js';

/* Suggestions prédéfinies */
const QUICK = [
  'Je veux évaluer ma maturité digitale',
  'Je veux me comparer à mon secteur',
  'Je veux définir une feuille de route',
  'Je veux avoir des recommandations',
  'Je veux piloter mes KPIs'
];

export function renderFilterBar(wrapperEl, cardRoot){

  /* ---------- Mark-up ---------- */
  wrapperEl.innerHTML = `
    <div class="filter-wrap">
      <input id="goalInput" type="text" class="filter-input"
             placeholder="Tapez votre objectif (max. 2) et appuyez sur Entrée…"/>
    </div>
    <div id="chipsBox" class="mt-3 flex flex-wrap justify-center gap-2">
      ${QUICK.map(q=>`<span class="suggestion-chip">${q}</span>`).join('')}
    </div>
    <p id="notice" class="mt-2 text-xs text-gray-500 text-center hidden">
      (Vous avez déjà sélectionné 2 objectifs)
    </p>
  `;

  const input   = wrapperEl.querySelector('#goalInput');
  const chips   = wrapperEl.querySelectorAll('.suggestion-chip');
  const notice  = wrapperEl.querySelector('#notice');

  /* ---------- State ---------- */
  const activeGoals = [];           // tableau de chaînes (max 2)

  /* ---------- Internal ---------- */
  function refresh(){
    const seq = buildSequence(activeGoals);
    renderCards(cardRoot, seq);

    chips.forEach(c=>{
      c.classList.toggle('ring-2', activeGoals.includes(c.textContent));
    });
    notice.classList.toggle('hidden', activeGoals.length < 2);
  }

  function addGoal(text){
    if(!text.trim()) return;
    if(activeGoals.includes(text)) return;       // déjà présent
    if(activeGoals.length === 2){
      /* on supprime le plus ancien pour en laisser toujours 2 */
      activeGoals.shift();
    }
    activeGoals.push(text);
    input.value = '';
    refresh();
  }

  /* ---------- Events ---------- */
  input.addEventListener('keydown', e=>{
    if(e.key==='Enter'){
      e.preventDefault();
      addGoal(input.value);
    }
  });

  chips.forEach(chip=>{
    chip.addEventListener('click', ()=>{
      if(activeGoals.includes(chip.textContent)){
        /* toggle off */
        const idx = activeGoals.indexOf(chip.textContent);
        activeGoals.splice(idx,1);
      }else{
        addGoal(chip.textContent);
      }
      refresh();
    });
  });

  /* Affichage initial (toutes les cartes) */
  refresh();
}
