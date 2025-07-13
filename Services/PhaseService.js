// Services/PhaseService.js

export const getAllPhases = () => [
    {
      id: 1,
      icon: "🧭",
      title: "Phase 1 • Diagnostic",
      subtitle: "Auto-diagnostic de maturité digitale",
      accent: "#0077D2",
      objectifs: [
        "Se situer rapidement sur les 5 dimensions.",
        "Identifier ses forces / faiblesses sans jargon.",
        "Obtenir un score pour mobiliser."
      ],
      contacts: [
        "Questionnaire interactif mobile-first.",
        "Radar & scores dynamiques.",
        "Tooltip d’aide & export PDF."
      ]
    },
    {
      id: 2,
      icon: "📊",
      title: "Phase 2 • Benchmark",
      subtitle: "Analyse comparative",
      accent: "#27AE60",
      objectifs: [
        "Comprendre sa position sectorielle.",
        "Détecter les écarts prioritaires.",
        "Justifier des choix auprès du COMEX."
      ],
      contacts: [
        "Tableaux de bord filtrables.",
        "Benchmarks anonymisés temps réel.",
        "API export / PPT."
      ]
    },
    {
      id: 3,
      icon: "🧩",
      title: "Phase 3 • Structuration",
      subtitle: "Canevas de transformation",
      accent: "#8E44AD",
      objectifs: [
        "Formaliser une feuille de route claire.",
        "Aligner métiers, IT et direction.",
        "Prioriser actions, jalons et KPIs."
      ],
      contacts: [
        "Canvas drag & drop.",
        "Co-édition multi-curseur.",
        "Validation + notifications."
      ]
    },
    {
      id: 4,
      icon: "🤖",
      title: "Phase 4 • IA",
      subtitle: "Accompagnement intelligent",
      accent: "#FF884D",
      objectifs: [
        "Traduire les données en actions concrètes.",
        "Obtenir recommandations personnalisées.",
        "Détecter incohérences / risques tôt."
      ],
      contacts: [
        "Chat GPT-like intégré.",
        "Suggestions push & mail.",
        "Dashboard des signaux faibles."
      ]
    },
    {
      id: 5,
      icon: "📍",
      title: "Phase 5 • Roadmap",
      subtitle: "Formalisation des actions",
      accent: "#E74C3C",
      objectifs: [
        "Compiler et partager la roadmap.",
        "Sécuriser budgets et ressources.",
        "Piloter l’exécution."
      ],
      contacts: [
        "Timeline visuelle.",
        "Export PDF, Excel, API.",
        "Vue portefeuille & indicateurs temps réel."
      ]
    }
  ];
  