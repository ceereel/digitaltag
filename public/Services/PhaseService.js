// PhaseService.js 
// ────────────────────────────────────────────────────────────────
//  Définition des 5 phases/modules de la plateforme Digital TAG enrichis
// ────────────────────────────────────────────────────────────────

const _PHASES = [
  {
    id: 1,
    icon: "🧭",
    accent: "#0077d2",
    phaseLabel: "Diagnostic",
    moduleLabel: "Auto-diagnostic de maturité digitale",
    objectiveSentence: "Je veux une vision claire de ma maturité digitale",
    phaseExplain:
      "Cette phase constitue le point de départ stratégique de toute transformation numérique. Elle permet de réaliser un état des lieux objectif et partagé de la maturité digitale de l’organisation afin d’identifier rapidement les forces, faiblesses et priorités d’action.",
    moduleExplain:
      "Un questionnaire structuré sur cinq dimensions clés (stratégie, culture, organisation, processus et technologie) fournit en moins de 20 minutes une visualisation claire de la situation actuelle. Les résultats, présentés sous forme de radars et de matrices, constituent la référence pour piloter l’ensemble du parcours Digital TAG.",
    features: [
      "Questionnaire structuré sur 5 axes de maturité",
      "Radars et scores détaillés pour chaque dimension",
      "Matrices de positionnement sectoriel et global",
      "Synthèse automatique des forces et faiblesses"
    ],
    contacts: [
      { icon: "📋", label: "Formulaire guidé interactif" },
      { icon: "📊", label: "Radars & matrices dynamiques" }
    ]
  },
  {
    id: 2,
    icon: "📊",
    accent: "#27AE60",
    phaseLabel: "Positionnement sectoriel",
    moduleLabel: "Observatoire",
    objectiveSentence: "Je veux me situer par rapport à mes pairs et mon secteur",
    phaseExplain:
      "Cette étape permet d’élargir la perspective en comparant vos performances digitales avec celles d’organisations similaires, afin de valider ou d’ajuster vos priorités d’investissement et de transformation.",
    moduleExplain:
      "Grâce à un observatoire alimenté par les données consolidées de l’écosystème Digital TAG, vous accédez à des tableaux de bord filtrables par secteur, taille, région et profil client. Ces analyses comparatives vous aident à objectiver vos décisions devant les parties prenantes.",
    features: [
      "Tableaux de bord filtrables (secteur, taille, région, clientèle)",
      "Benchmark dynamique multi-critères",
      "Exportation directe en PPT, PDF ou via API",
      "Indicateurs de tendance et d’écart sectoriel"
    ],
    contacts: [
      { icon: "📈", label: "Dashboard interactif" },
      { icon: "🗂️", label: "Filtres multi-critères avancés" },
      { icon: "📤", label: "Exports et intégrations API" }
    ]
  },
  {
    id: 3,
    icon: "🧩",
    accent: "#8E44AD",
    phaseLabel: "Structuration",
    moduleLabel: "Canevas de transformation",
    objectiveSentence: "Je veux visualiser la trajectoire de l'entreprise",
    phaseExplain:
      "Cette phase vise à transformer l’analyse en plan structuré et actionnable. Le canevas centralise vos objectifs, jalons, ressources et indicateurs, tout en facilitant la collaboration interne pour éviter les silos et garantir l’alignement stratégique.",
    moduleExplain:
      "Un tableau interactif en drag-and-drop, pré-rempli avec les données issues du diagnostic et du benchmark, permet de formaliser une feuille de route intégrée. Les équipes peuvent coéditer le canevas en temps réel et suivre l’avancement via un système d’alertes.",
    features: [
      "Canevas interactif avec glisser-déposer",
      "Pré-remplissage automatique depuis les étapes précédentes",
      "Coédition temps réel multi-utilisateurs",
      "Suivi des jalons et dépendances"
    ],
    contacts: [
      { icon: "🗺️", label: "Vue canevas centralisé" },
      { icon: "🤝", label: "Ateliers collaboratifs" }
    ]
  },
  {
    id: 4,
    icon: "🤖",
    accent: "#FF884D",
    phaseLabel: "Accompagnement IA",
    moduleLabel: "Agent conversationnel intelligent",
    objectiveSentence: "Je veux des recommandations immédiates et contextualisées",
    phaseExplain:
      "L’agent conversationnel agit comme un coach digital en temps réel. Il reformule vos besoins, interprète vos données et propose des actions adaptées à votre contexte, pour accélérer la mise en œuvre et améliorer la prise de décision.",
    moduleExplain:
      "Basé sur le NLP et le machine learning, l’agent IA analyse vos échanges, détecte les opportunités d’optimisation et propose des recommandations concrètes, directement exploitables dans le canevas ou la feuille de route.",
    features: [
      "Analyse en langage naturel (NLP)",
      "Reformulation et priorisation des actions",
      "Suggestions issues de la base de connaissances Digital TAG",
      "Interactions multimodales (texte, audio)"
    ],
    contacts: [
      { icon: "💬", label: "Chat IA interactif" },
      { icon: "📥", label: "Intégration directe au canevas" }
    ]
  },
  {
    id: 5,
    icon: "📍",
    accent: "#E74C3C",
    phaseLabel: "Formalisation",
    moduleLabel: "Feuille de route",
    objectiveSentence: "Je veux piloter mon plan d’action",
    phaseExplain:
      "Dernière étape du parcours, la feuille de route formalise et orchestre la mise en œuvre. Elle regroupe les actions, budgets, indicateurs et échéances dans un format clair, exportable et prêt à être suivi.",
    moduleExplain:
      "Outil central de pilotage, la feuille de route compile automatiquement les informations des phases précédentes et offre une vision consolidée des projets. Elle intègre un suivi des KPIs et une gestion du portefeuille de projets, avec possibilité d’exporter vers vos outils internes.",
    features: [
      "Timeline interactive et personnalisable",
      "Suivi dynamique des KPIs et budgets",
      "Exports PDF, Excel et API",
      "Gestion de portefeuille de projets"
    ],
    contacts: [
      { icon: "🗓️", label: "Timeline dynamique" },
      { icon: "📊", label: "Vue indicateurs" },
      { icon: "📤", label: "Exports multi-formats" }
    ]
  }
];

// ────────────────────────────────────────────────────────────────
//  Enrichissement avec métadonnées pour affichage sur les cartes
// ────────────────────────────────────────────────────────────────
_PHASES.forEach(p => {
  p.metas = [
    p.objectiveSentence,
    `${p.contacts[0].icon} ${p.contacts[0].label}`
  ];
});

// ────────────────────────────────────────────────────────────────
//  Fonctions d'accès
// ────────────────────────────────────────────────────────────────
export function getAll() {
  return _PHASES.map(p => ({ ...p }));
}

export function get(id) {
  return _PHASES.find(p => p.id === Number(id));
}
