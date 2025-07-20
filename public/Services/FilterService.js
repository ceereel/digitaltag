// Définit les 6 use cases et fournit la logique de mapping
export const useCases = [
  {
    id: 1,
    label: "Du diagnostic à la planification stratégique",
    objective: "Structurer une transformation numérique de manière concrète",
    phases: [1,2,3,5]
  },
  {
    id: 2,
    label: "Appui à la décision dans un environnement incertain",
    objective: "Décider par où commencer malgré un manque de clarté",
    phases: [1,4,3,5]
  },
  {
    id: 3,
    label: "Comparaison sectorielle pour justifier des investissements",
    objective: "Produire un argumentaire pour convaincre la direction ou un investisseur",
    phases: [1,2,5]
  },
  {
    id: 4,
    label: "Atelier collaboratif avec accompagnement intelligent",
    objective: "Faciliter un atelier de transformation avec plusieurs parties prenantes",
    phases: [3,4,5]
  },
  {
    id: 5,
    label: "Révision périodique et suivi agile",
    objective: "Adapter en continu les actions à l’évolution de l’organisation",
    phases: [1,3,4,5]
  },
  {
    id: 6,
    label: "Assistance ponctuelle et construction progressive",
    objective: "Construire le canevas pas-à-pas en sollicitant l’agent virtuel",
    phases: [4,3]
  }
];

/**
 * Renvoie la phrase « Je veux … et … » pour les use cases sélectionnés
 */
export function getPhraseForUseCases(selectedIds) {
  const objs = useCases
    .filter(uc => selectedIds.includes(uc.id))
    .map(uc => uc.objective);
  if (objs.length === 0) return "";
  return `Je veux ${objs.join(" et ")}.`;
}

/**
 * Regroupe et ordonne les phases à afficher pour ces use cases
 */
export function getPhasesForUseCases(selectedIds) {
  const phases = new Set();
  useCases
    .filter(uc => selectedIds.includes(uc.id))
    .forEach(uc => uc.phases.forEach(p => phases.add(p)));
  return [...phases].sort((a,b)=>a-b);
}
