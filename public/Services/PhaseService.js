/* ------------------------------------------------------------------
   PhaseService
   - Centralise toutes les données métier de la Journey Map
   - API publique :
       • getAll() → tableau ordonné des 5 phases
       • get(id)  → un seul objet phase (id = 1‥5)
------------------------------------------------------------------ */

const PHASES  = [
  /* ---------- Phase 1 ------------------------------------------------ */
  {
    id: 1,
    icon: "🧭",
    accent: "#0077d2",
    phaseLabel: "Diagnostic",
    moduleLabel: "Auto-diagnostic de maturité digitale",
    objectiveSentence: "« Je veux une vision claire de ma maturité digitale »",
    phaseExplain:
      "Première étape : obtenir une vision factuelle de votre maturité pour " +
      "poser un diagnostic partagé, base de référence du cycle.",
    moduleExplain:
      "Le questionnaire (5 axes) génère radars et scores chiffrés en 15 min ; " +
      "vous savez où concentrer vos efforts.",
    features: [
      "Questionnaire structuré sur 5 dimensions",
      "Indicateurs visuels : radars, scores numériques",
      "Matrices synthétiques de positionnement",
      "Base d'analyse pour la stratégie digitale"
    ],
    contacts: [
      { icon: "📋", label: "Formulaire guidé" },
      { icon: "🖼️", label: "Vue radar" }
    ]
  },

  /* ---------- Phase 2 ------------------------------------------------ */
  {
    id: 2,
    icon: "📊",
    accent: "#27AE60",
    phaseLabel: "Positionnement sectoriel",
    moduleLabel: "Observatoire",
    objectiveSentence:
      "« Je veux me situer par rapport à mes pairs et à mon secteur »",
    phaseExplain:
      "Confronte vos indicateurs à ceux d’organisations similaires pour repérer " +
      "vos écarts et prioriser vos investissements.",
    moduleExplain:
      "Dashboards filtrables + exports/API prêts à convaincre votre comité.",
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

  /* ---------- Phase 3 ------------------------------------------------ */
  {
    id: 3,
    icon: "🧩",
    accent: "#8E44AD",
    phaseLabel: "Structuration",
    moduleLabel: "Canevas de transformation",
    objectiveSentence:
      "« Je veux visualiser la trajectoire de l'entreprise »",
    phaseExplain:
      "Objectifs, actions, jalons et KPIs alignés dans un canevas unique ; " +
      "priorisation des projets et suppression des silos.",
    moduleExplain:
      "Canevas drag-and-drop pré-rempli ; co-édition pour garder tout le monde " +
      "aligné.",
    features: [
      "Drag-and-drop intuitif",
      "Co-édition temps réel"
    ],
    contacts: [
      { icon: "🗺️", label: "Vue canevas" },
      { icon: "🤝", label: "Atelier collaboratif" }
    ]
  },

  /* ---------- Phase 4 ------------------------------------------------ */
  {
    id: 4,
    icon: "🤖",
    accent: "#FF884D",
    phaseLabel: "Accompagnement ponctuel",
    moduleLabel: "Agent conversationnel intelligent",
    objectiveSentence:
      "« Je veux des recommandations immédiates et contextualisées »",
    phaseExplain:
      "Boucle d’amélioration continue : IA, coaching, monitoring régulier.",
    moduleExplain:
      "L’agent écoute vos échanges et pousse des actions concrètes en temps réel.",
    features: [
      "Écoute active des réunions",
      "Recommandations issues de la littérature scientifique"
    ],
    contacts: [
      { icon: "💬", label: "Chat IA" },
      { icon: "🔊", label: "Retranscription & push dans le canevas" }
    ]
  },

  /* ---------- Phase 5 ------------------------------------------------ */
  {
    id: 5,
    icon: "📍",
    accent: "#E74C3C",
    phaseLabel: "Formalisation",
    moduleLabel: "Feuille de route",
    objectiveSentence: "« Je veux piloter mon plan d’action »",
    phaseExplain:
      "Timeline, budgets et KPIs assurent le suivi et la communication.",
    moduleExplain:
      "Timeline interactive, portefeuille projet et exports (PDF/Excel/API).",
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

/* --------- métas rapides pour l’aperçu --------- */
PHASES.forEach(p => {
  p.metas = [
    p.objectiveSentence,
    `${p.contacts[0].icon} ${p.contacts[0].label}`
  ];
});

/* ------------------ API publique ------------------ */
export function getAll () {
  return PHASES.map(p => ({ ...p }));   // copie profonde = immuable
}

export function get (id) {
  return PHASES.find(p => p.id === Number(id));
}