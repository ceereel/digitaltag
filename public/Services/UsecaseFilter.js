// /public/Services/UsecaseFilter.js
// Grille des “use cases” + construction de la page recommandation

// ⚠️ Chemins en minuscules (FS sensibles à la casse)
import { renderCards } from '../components/Cards.js';
import { getAll }     from './PhaseService.js';
import { animateJourney } from './AnimationServices.js';

// Ordre canonique des modules (1→5)
const ORDER = [1, 2, 3, 4, 5];

// Use cases (texte court pour lisibilité)
const USE_CASES = [
  {
    label: "Je veux une vision claire de ma maturité digitale",
    modules: [1],
    accent: "#0077d2",
    description: "Radars & scores pour identifier forces/faiblesses et priorités."
  },
  {
    label: "Je veux me situer par rapport à mes pairs et mon secteur",
    modules: [2],
    accent: "#27AE60",
    description: "Comparaisons sectorielles et par profil pour objectiver vos choix."
  },
  {
    label: "Je veux visualiser la trajectoire de l'entreprise",
    modules: [3],
    accent: "#8E44AD",
    description: "Canevas pour structurer objectifs, jalons et ressources."
  },
  {
    label: "Je veux des recommandations immédiates et contextualisées",
    modules: [4],
    accent: "#FF884D",
    description: "Agent IA pour suggestions d’actions en temps réel."
  },
  {
    label: "Je veux piloter mon plan d’action",
    modules: [5],
    accent: "#E74C3C",
    description: "Timeline, budgets et KPI pour suivre l’exécution."
  }
];

// Sélection courante (indices USE_CASES)
let selectedIndexes = new Set();

/**
 * Rendu des cartes de sélection + interactions.
 * @param {HTMLElement} container - conteneur .grid qui recevra les cartes
 * @param {HTMLElement|null} phraseEl - élément où afficher la phrase lisible
 */
function renderUsecaseFilter(container, phraseEl) {
  if (!container) return;

  // Reset
  container.innerHTML = '';
  selectedIndexes = new Set();

  // Bouton de validation (sous la grille)
  const validateBtn = document.createElement('button');
  validateBtn.textContent = 'Valider mon choix';
  validateBtn.className = 'hidden mt-4 mx-auto block btn-validate';
  validateBtn.disabled = true;

  // Rendu des cartes
  USE_CASES.forEach((usecase, index) => {
    const card = document.createElement('div');
    card.className = [
      'rounded-xl border-2 p-4 cursor-pointer transition-transform duration-200',
      'shadow-sm bg-gray-50 text-gray-700',
      'hover:bg-[#0077d2] hover:text-white hover:shadow-md hover:-translate-y-1'
    ].join(' ');
    card.tabIndex = 0; // A11y
    card.dataset.index = index;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-pressed', 'false');

    const title = document.createElement('p');
    title.className = 'font-semibold text-sm';
    title.textContent = usecase.label;

    const desc = document.createElement('p');
    desc.className = 'text-xs mt-1 opacity-90';
    desc.textContent = usecase.description;

    card.appendChild(title);
    card.appendChild(desc);
    container.appendChild(card);

    const toggle = () => {
      if (selectedIndexes.has(index)) selectedIndexes.delete(index);
      else selectedIndexes.add(index);
      updateSelection(container);
      updateValidationState(validateBtn, phraseEl);
    };

    card.addEventListener('click', toggle);
    card.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggle();
      }
    });
  });

  // Validation → ouvre la page recommandation
  validateBtn.addEventListener('click', () => {
    if (selectedIndexes.size === 0) return;

    const selected = [...selectedIndexes].map(i => USE_CASES[i]);

    // Liste de modules unique, ordonnée
    let moduleIds = unique(selected.flatMap(s => s.modules));

    // “Tout coché” → 1..5
    if (selectedIndexes.size === USE_CASES.length) moduleIds = [1,2,3,4,5];

    // Si 5 (Roadmap) sans 3 (Canevas), on ajoute 3 avant
    if (moduleIds.includes(5) && !moduleIds.includes(3)) moduleIds.push(3);

    moduleIds.sort((a, b) => ORDER.indexOf(a) - ORDER.indexOf(b));

    // Phases choisies
    const phases = getAll()
      .filter(p => moduleIds.includes(p.id))
      .sort((a, b) => moduleIds.indexOf(a.id) - moduleIds.indexOf(b.id));

    // Construit les cartes dans un conteneur “stage” (pas d’intro ici)
    const stage = document.createElement('div');
    const stageId = `ucStage-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
    stage.id = stageId;
    renderCards(stage, phases, []); // ⬅️ pas d’intro dans le row

    // Recommandation text pour JourneyView (#routeText)
    const recommendationText = 'Commencez par ces phases, puis itérez selon vos priorités.';

    // Ouvre la page reco en DÉPLACANT les vrais nœuds pour garder les listeners
    if (typeof window.showRecommendedJourney === 'function') {
      document.body.appendChild(stage);
      window.showRecommendedJourney({
        cardsContainerId: stageId, // JourneyView déplacera les enfants vers #routeCards
        subtitle: selected.map(s => s.label).join(' · '),
        recommendationText
      });
    }

    // Animation (optionnelle)
    try { if (typeof animateJourney === 'function') animateJourney(); } catch {}
  });

  // Bouton sous la grille
  container.after(validateBtn);
}

/* ===== Helpers d’UI ===== */

/** Met à jour l’état visuel des cartes sélectionnées (bleu persistant). */
function updateSelection(container) {
  const cards = container.querySelectorAll('div[data-index]');
  cards.forEach(card => {
    const i = Number(card.dataset.index);
    const on = selectedIndexes.has(i);
    // Utilise la classe .selected (déjà stylée dans styles.css)
    card.classList.toggle('selected', on);
    card.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
}

/** Affiche/masque le bouton et la phrase. */
function updateValidationState(button, phraseEl) {
  if (!button) return;
  const empty = selectedIndexes.size === 0;
  button.classList.toggle('hidden', empty);
  button.disabled = empty;
  if (phraseEl && empty) phraseEl.textContent = '';
}

/** Unique en conservant l’ordre d’apparition. */
function unique(arr) {
  const seen = new Set();
  const out = [];
  for (const v of arr) {
    if (!seen.has(v)) { seen.add(v); out.push(v); }
  }
  return out;
}

export { renderUsecaseFilter };
