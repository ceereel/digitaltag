import { renderCards } from './Cards.js';
import { getAll } from '../Services/PhaseService.js';
import { animateJourney } from '../Services/AnimationServices.js';

const useCases = [
  {
    id: 1,
    title: 'Du diagnostic à la planification stratégique',
    objective: 'Structurer une transformation numérique de manière concrète',
    modules: [1, 2, 3, 5],
    user: 'Direction d’une PME souhaitant cadrer sa stratégie digitale sur 12 mois.'
  },
  {
    id: 2,
    title: 'Appui à la décision dans un environnement incertain',
    objective: 'Décider par où commencer malgré un manque de clarté',
    modules: [1, 4, 3, 5],
    user: 'Chef de projet numérique sans expertise digitale, en attente de validation managériale.'
  },
  {
    id: 3,
    title: 'Comparaison sectorielle pour justifier des investissements',
    objective: 'Produire un argumentaire pour convaincre la direction ou un investisseur',
    modules: [1, 2, 5],
    user: 'Responsable innovation cherchant à justifier un budget.'
  },
  {
    id: 4,
    title: 'Atelier collaboratif avec accompagnement intelligent',
    objective: 'Faciliter un atelier de transformation avec plusieurs parties prenantes',
    modules: [3, 4, 5],
    user: 'Coach externe ou responsable qualité animant une session avec une équipe de direction.'
  },
  {
    id: 5,
    title: 'Révision périodique et suivi agile',
    objective: 'Adapter en continu les actions à l’évolution de l’organisation',
    modules: [1, 3, 4, 5],
    user: 'PME souhaitant intégrer la plateforme dans son pilotage semestriel.'
  },
  {
    id: 6,
    title: 'Assistance ponctuelle et construction progressive',
    objective: 'Répondre à des questions ciblées au fil de l’eau, et construire le canevas progressivement',
    modules: [4, 3],
    user: 'Chef d’équipe opérationnel ou responsable RH souhaitant structurer quelques actions numériques concrètes.'
  }
];

export function renderFilterBar(container, phraseEl, cardsContainer) {
  const section = document.createElement('section');
  section.className = 'usecase-section';

  const header = document.createElement('h2');
  header.textContent = 'Choisissez un cas d’usage';
  header.className = 'text-lg font-semibold text-center text-[#0077d2] mb-4';
  section.appendChild(header);

  const grid = document.createElement('div');
  grid.className = 'usecase-grid';

  useCases.forEach(uc => {
    const card = document.createElement('div');
    card.className = 'usecase-card';

    const title = document.createElement('h3');
    title.textContent = uc.title;
    card.appendChild(title);

    const objective = document.createElement('p');
    objective.textContent = uc.objective;
    card.appendChild(objective);

    const sequence = document.createElement('div');
    sequence.className = 'module-sequence';
    uc.modules.forEach((id, i) => {
      const phase = getAll().find(p => p.id === id);
      const span = document.createElement('span');
      span.textContent = phase?.phaseLabel || `Module ${id}`;
      sequence.appendChild(span);
      if (i < uc.modules.length - 1) {
        const arrow = document.createElement('span');
        arrow.textContent = '→';
        arrow.className = 'arrow';
        sequence.appendChild(arrow);
      }
    });
    card.appendChild(sequence);

    const button = document.createElement('button');
    button.textContent = 'Suivre ce parcours';
    button.addEventListener('click', () => {
      const suggestedPhases = getAll().filter(p => uc.modules.includes(p.id));
      suggestedPhases.sort((a, b) => uc.modules.indexOf(a.id) - uc.modules.indexOf(b.id));

      phraseEl.textContent = `Parcours sélectionné : ${uc.title}`;

      document.getElementById('filteredOverlay').classList.remove('hidden');
      renderCards(cardsContainer, suggestedPhases);
      animateJourney();
    });
    card.appendChild(button);

    grid.appendChild(card);
  });

  section.appendChild(grid);
  container.appendChild(section);

  // Quitter la vue filtrée
  const overlay = document.getElementById('filteredOverlay');
  overlay.addEventListener('click', e => {
    if (e.target.id === 'filteredOverlay') {
      overlay.classList.add('hidden');
      phraseEl.textContent = '';
      renderCards(cardsContainer);
      animateJourney();
    }
  });
}
