const _PHASES = [
  {
    id: 1,
    icon: "🧭",
    accent: "#0077d2",
    phaseLabel: "Diagnostic",
    moduleLabel: "Auto-diagnostic de maturité digitale",
    objectiveSentence: "Je veux une vision claire de ma maturité digitale",
    phaseExplain:
      "Première étape : poser un diagnostic partagé qui servira de référence tout au long du cycle.",
    moduleExplain:
      "Questionnaire guidé sur 5 axes → radars & scores en 15 min pour concentrer vos efforts.",
    features: [
      "Questionnaire structuré sur 5 dimensions",
      "Indicateurs visuels : radars, scores numériques",
      "Matrices de positionnement",
      "Base d'analyse stratégique"
    ],
    contacts: [
      { icon: "📋", label: "Formulaire guidé" },
      { icon: "🖼️", label: "Vue radar" }
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
      "Comparer vos indicateurs à ceux d’organisations similaires pour prioriser vos investissements.",
    moduleExplain:
      "Dashboards filtrables + exports/API pour convaincre votre comité de direction.",
    features: [
      "Dashboards filtrables",
      "Comparaisons représentatives",
      "Export PPT / API"
    ],
    contacts: [
      { icon: "📈", label: "Dashboards" },
      { icon: "🗂️", label: "Filtres avancés" },
      { icon: "🔗", label: "API export" }
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
      "Formaliser objectifs, actions et jalons dans un canevas unique pour éviter les silos.",
    moduleExplain:
      "Canevas drag-and-drop pré-rempli, coédition temps réel pour garder tout le monde aligné.",
    features: [
      "Drag-and-drop intuitif",
      "Co-édition en temps réel"
    ],
    contacts: [
      { icon: "🗺️", label: "Vue canevas" },
      { icon: "🤝", label: "Atelier collaboratif" }
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
      "Boucle d’amélioration continue avec IA, coaching et monitoring régulier.",
    moduleExplain:
      "L’agent écoute vos réunions et propose des actions concrètes en temps réel.",
    features: [
      "Écoute active des réunions",
      "Recommandations issues de la littérature scientifique"
    ],
    contacts: [
      { icon: "💬", label: "Chat IA" },
      { icon: "🔊", label: "Retranscription & push" }
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
      "Timeline, budgets et KPI pour suivre l’exécution et communiquer.",
    moduleExplain:
      "Timeline interactive, portefeuille projets, exports PDF/Excel/API.",
    features: [
      "Timeline interactive",
      "Export PDF / Excel / API",
      "Portefeuille KPIs live"
    ],
    contacts: [
      { icon: "🗓️", label: "Timeline" },
      { icon: "📤", label: "Exports" },
      { icon: "📊", label: "Suivi KPIs" }
    ]
  }
];

// Ajout de metas résumées
_PHASES.forEach(p => {
  p.metas = [
    p.objectiveSentence,
    `${p.contacts[0].icon} ${p.contacts[0].label}`
  ];
});

export function getAll() {
  return _PHASES.map(p => ({ ...p }));
}

export function get(id) {
  return _PHASES.find(p => p.id === Number(id));
}
