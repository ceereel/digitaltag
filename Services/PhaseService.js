// Services/PhaseService.js
export function getPhases() {
    return [
      {
        ic:"🧭",accent:"#0077D2",
        title:"Phase 1 • Diagnostic",sub:"Auto-diagnostic",
        content:`Questionnaire structuré (stratégie, processus, techno, culture, gouvernance). Les réponses génèrent des indicateurs visuels pour situer l’entreprise.`,
        objectifs:[
          "Se situer sur 5 dimensions",
          "Identifier forces / faiblesses",
          "Obtenir un score mobilisateur"
        ],
        contact:[
          "Questionnaire mobile-first",
          "Radar & scores dynamiques",
          "Tooltip + export PDF"
        ]
      },
      {
        ic:"📊",accent:"#27AE60",
        title:"Phase 2 • Benchmark",sub:"Analyse comparative",
        content:`Compare les performances de l’entreprise à celles d’organisations similaires via un observatoire dynamique et exportable.`,
        objectifs:[
          "Comprendre sa position sectorielle",
          "Détecter les écarts prioritaires",
          "Justifier ses choix au COMEX"
        ],
        contact:[
          "Dashboards filtrables",
          "Benchmarks anonymisés temps réel",
          "API / export PPT"
        ]
      },
      {
        ic:"🧩",accent:"#8E44AD",
        title:"Phase 3 • Structuration",sub:"Canevas interactif",
        content:`Tableau inspiré du Business Model Canvas, pré-rempli et enrichi pour construire une feuille de route claire.`,
        objectifs:[
          "Formaliser la roadmap",
          "Aligner métiers / IT / direction",
          "Prioriser actions & KPIs"
        ],
        contact:[
          "Canvas drag-and-drop",
          "Co-édition multi-curseur",
          "Validation + notifications"
        ]
      },
      {
        ic:"🤖",accent:"#FF884D",
        title:"Phase 4 • IA",sub:"Agent intelligent",
        content:`Un agent conversationnel (NLP + ML) reformule les diagnostics, propose des actions et détecte les signaux faibles.`,
        objectifs:[
          "Traduire données en actions",
          "Recommandations personnalisées",
          "Détecter incohérences / risques"
        ],
        contact:[
          "Chat GPT-like intégré",
          "Suggestions push & mail",
          "Dashboard signaux faibles"
        ]
      },
      {
        ic:"📍",accent:"#E74C3C",
        title:"Phase 5 • Roadmap",sub:"Formalisation des actions",
        content:`Synthèse visuelle et exportable du plan d’action numérique (court / moyen / long terme).`,
        objectifs:[
          "Compiler et partager la roadmap",
          "Sécuriser budgets et ressources",
          "Piloter l’exécution"
        ],
        contact:[
          "Timeline visuelle",
          "Export PDF / Excel / API",
          "Vue portefeuille & indicateurs"
        ]
      }
    ];
  }
  