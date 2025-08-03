import { renderCards } from '../components/Cards.js';
import { getAll } from './PhaseService.js';
import { animateJourney } from './AnimationServices.js';

const USE_CASES = [
  {
    label: "faire un diagnostic",
    modules: [1],
    accent: "#0077d2",
    description: "Obtenez une vision claire et rapide de la maturité digitale de votre PME."
  },
  {
    label: "une comparaison sectorielle",
    modules: [1, 2],
    accent: "#27AE60",
    description: "Comparez vos résultats avec ceux d’entreprises similaires de votre secteur."
  },
  {
    label: "créer un canevas de transformation",
    modules: [3],
    accent: "#8E44AD",
    description: "Structurez vos actions digitales dans un plan visuel et partagé."
  },
  {
    label: "discuter avec un agent IA",
    modules: [4],
    accent: "#FF884D",
    description: "Recevez des réponses instantanées et adaptées grâce à un assistant intelligent."
  },
  {
    label: "générer une feuille de route",
    modules: [5],
    accent: "#E74C3C",
    description: "Planifiez vos projets digitaux avec des échéances, budgets et indicateurs clairs."
  }
];

let selectedIndexes = [];

function renderUsecaseFilter(container, phraseEl) {
  container.innerHTML = '';
  selectedIndexes = [];

  // Création du bouton de validation
  const validateBtn = document.createElement('button');
  validateBtn.textContent = '✅ Valider mon choix';
  validateBtn.className = 'hidden mt-4 mx-auto block bg-[#0077d2] text-white text-sm px-4 py-2 rounded-lg shadow';
  validateBtn.disabled = true;

  USE_CASES.forEach((usecase, index) => {
    const card = document.createElement('div');
    card.className =
      'rounded-xl border-2 p-4 cursor-pointer transition-transform duration-200 shadow-sm hover:shadow-md hover:-translate-y-1';
    card.style.borderColor = usecase.accent;
    card.dataset.index = index;

    const label = document.createElement('p');
    label.className = 'font-semibold text-sm';
    label.textContent = usecase.label.charAt(0).toUpperCase() + usecase.label.slice(1);
    label.style.color = usecase.accent;

    const desc = document.createElement('p');
    desc.className = 'text-xs text-gray-600 mt-1';
    desc.textContent = usecase.description;

    card.appendChild(label);
    card.appendChild(desc);
    container.appendChild(card);

    card.addEventListener('click', () => {
      const i = selectedIndexes.indexOf(index);
      if (i >= 0) {
        selectedIndexes.splice(i, 1); // Deselect
      } else {
        if (selectedIndexes.length >= 2) return;
        selectedIndexes.push(index); // Select
      }

      updateSelection(container);
      updateValidationState(validateBtn, phraseEl);
    });
  });

  // Bouton "Valider"
  validateBtn.addEventListener('click', () => {
    if (selectedIndexes.length === 0) return;

    const selected = selectedIndexes.map(i => USE_CASES[i]);
    const phrases = selected.map(s => `« ${s.label} »`);
    phraseEl.textContent = `Je voudrais ${phrases.join(' et ')}.`;

    const moduleIds = [...new Set(selected.flatMap(s => s.modules))];
    const allPhases = getAll();
    const selectedPhases = allPhases.filter(p => moduleIds.includes(p.id));
    selectedPhases.sort((a, b) => moduleIds.indexOf(a.id) - moduleIds.indexOf(b.id));

    const filteredContainer = document.getElementById('filteredCards');
    if (!filteredContainer) {
      console.warn('❌ Élément #filteredCards introuvable');
      return;
    }

    filteredContainer.innerHTML = '';
    renderCards(filteredContainer, selectedPhases);
    animateJourney();
    document.getElementById('filteredOverlay')?.classList.remove('hidden');
  });

  container.parentElement.appendChild(validateBtn);

  // Gestion du bouton de réinitialisation
  const overlay = document.getElementById('filteredOverlay');
  overlay?.addEventListener('click', e => {
    if (e.target.id === 'resetFilter' || e.target.id === 'filteredOverlay') {
      overlay.classList.add('hidden');
      phraseEl.textContent = '';
      selectedIndexes = [];
      updateSelection(container);
      validateBtn.classList.add('hidden');
      const filteredContainer = document.getElementById('filteredCards');
      if (filteredContainer) filteredContainer.innerHTML = '';
    }
  });
}

function updateSelection(container) {
  const cards = container.querySelectorAll('div[data-index]');
  cards.forEach((card, i) => {
    card.classList.toggle('ring-2', selectedIndexes.includes(i));
    card.classList.toggle('ring-offset-2', selectedIndexes.includes(i));
  });
}

function updateValidationState(button, phraseEl) {
  if (selectedIndexes.length === 0) {
    button.classList.add('hidden');
    button.disabled = true;
    phraseEl.textContent = '';
  } else {
    button.classList.remove('hidden');
    button.disabled = false;
  }
}

export { renderUsecaseFilter };
