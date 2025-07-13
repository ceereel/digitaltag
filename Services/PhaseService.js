// Services/PhaseService.js
export function getPhases() {
    return [
      /* ---------- Phase 1 ---------- */
      {
        ic: "🧭",
        accent: "#0077D2",
        title:  "Phase 1 • Diagnostic",
        sub:    "Auto-diagnostic",
        objectiveSentence: "Je dois connaître ma maturité digitale avant d’agir.",
        /* Nouveau : contexte + module */
        context: `Toute transformation débute par une photographie précise de la
                  maturité numérique de l’entreprise afin d’objectiver les forces
                  et les faiblesses sur les dimensions clés.`,
        module : `Le module “Auto-diagnostic” s’appuie sur un questionnaire couvrant
                  stratégie, processus, technologie, culture et gouvernance.
                  Les réponses alimentent automatiquement des radars, scores
                  et matrices synthétiques pour visualiser votre positionnement.`,
        objectifs: [
          "Se situer rapidement sur les 5 dimensions",
          "Identifier forces / faiblesses sans jargon",
          "Obtenir un score pour mobiliser"
        ],
        contacts: [
          "Questionnaire interactif mobile-first",
          "Radar & scores dynamiques",
          "Tooltip d’aide • Export PDF"
        ]
      },
  
      /* ---------- Phase 2 ---------- */
      {
        ic: "📊",
        accent: "#27AE60",
        title:  "Phase 2 • Benchmark",
        sub:    "Comparaison sectorielle",
        objectiveSentence: "Je veux me situer face à mes pairs du secteur.",
        context: `Après le diagnostic, il est crucial de se comparer à des
                  organisations similaires pour hiérarchiser les priorités
                  et convaincre les parties prenantes.`,
        module : `L’“Observatoire” Digital TAG interroge une base de cas
                  anonymisés ; filtres (taille, secteur, maturité) et dashboards
                  dynamiques mettent en évidence vos écarts et bonnes pratiques.
                  Les données sont exportables via API ou PPT.`,
        objectifs: [
          "Comprendre sa position sectorielle",
          "Détecter les écarts prioritaires",
          "Justifier des choix auprès du COMEX"
        ],
        contacts: [
          "Dashboards filtrables en temps réel",
          "Benchmarks anonymisés",
          "API / Export PPT"
        ]
      },
  
      /* ---------- Phase 3 ---------- */
      {
        ic: "🧩",
        accent: "#8E44AD",
        title:  "Phase 3 • Structuration",
        sub:    "Canevas interactif",
        objectiveSentence: "Je dois traduire mes priorités en feuille de route claire.",
        context: `Les enseignements précédents doivent se transformer en trajectoire
                  opérationnelle : objectifs, actions, jalons et KPIs alignés
                  avec toutes les équipes.`,
        module : `Le “Canevas de transformation” est un tableau drag-and-drop
                  inspiré du Business Model Canvas ; pré-rempli par vos résultats,
                  il se complète en atelier (multi-curseur) et reste évolutif
                  pour une planification agile.`,
        objectifs: [
          "Formaliser une feuille de route claire",
          "Aligner métiers, IT et direction",
          "Prioriser actions & jalons"
        ],
        contacts: [
          "Canvas drag-and-drop",
          "Co-édition en temps réel",
          "Notifications de validation"
        ]
      },
  
      /* ---------- Phase 4 ---------- */
      {
        ic: "🤖",
        accent: "#FF884D",
        title:  "Phase 4 • IA",
        sub:    "Accompagnement intelligent",
        objectiveSentence: "Je veux des recommandations personnalisées en continu.",
        context: `Au fur et à mesure de l’exécution, l’entreprise a besoin de
                  conseils contextualisés et d’une veille proactive pour sécuriser
                  sa trajectoire.`,
        module : `L’agent conversationnel Digital TAG, basé NLP/ML, reformule les
                  résultats, détecte signaux faibles et propose actions ou
                  formations adaptées. Disponible via chat, notifications push
                  ou mail.`,
        objectifs: [
          "Traduire données en actions concrètes",
          "Recevoir recommandations personnalisées",
          "Repérer incohérences / risques tôt"
        ],
        contacts: [
          "Chat GPT-like intégré",
          "Suggestions push & mail",
          "Dashboard signaux faibles"
        ]
      },
  
      /* ---------- Phase 5 ---------- */
      {
        ic: "📍",
        accent: "#E74C3C",
        title:  "Phase 5 • Roadmap",
        sub:    "Formalisation",
        objectiveSentence: "Je dois partager la roadmap et piloter l’exécution.",
        context: `Pour embarquer les parties prenantes et suivre l’avancement, la
                  feuille de route doit être synthétique, visuelle et exportable.`,
        module : `Le module “Feuille de route” génère automatiquement une timeline
                  court / moyen / long terme, un portefeuille projets et des
                  exports PDF, Excel ou API pour le reporting.`,
        objectifs: [
          "Compiler & partager la roadmap",
          "Sécuriser budgets / ressources",
          "Piloter l’exécution"
        ],
        contacts: [
          "Timeline visuelle",
          "Exports multiples",
          "Vue portefeuille + indicateurs"
        ]
      }
    ];
  }
  