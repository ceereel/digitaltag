// Services/PhaseService.js
export function getPhases() {
    return [
      {
        ic: "🧭",
        accent: "#0077D2",
        title:  "Diagnostic",
        sub:    "Auto-diagnostic de maturité digitale",
  
        // — nouveau —
        desc: `Questionnaire structuré sur cinq dimensions (stratégie, processus, technologie,
               culture et gouvernance) générant radars et scores afin de visualiser le
               positionnement digital de l’entreprise et initier le plan d’amélioration.`,
  
        objectiveSentence: `« Je veux connaître mes forces et mes faiblesses digitales en 10 minutes. »`,
  
        objectifs: [
          "Se situer rapidement sur les 5 dimensions",
          "Identifier forces et faiblesses sans jargon",
          "Mobiliser les équipes grâce à un premier score"
        ],
  
        contacts: [
          { icon:"📋", label:"Questionnaire mobile-first"    , text:"UX fluide, aide contextuelle" },
          { icon:"📊", label:"Radar & scores dynamiques"     , text:"Vue instantanée des résultats" },
          { icon:"💾", label:"Export PDF synthétique"        , text:"Partage interne rapide" }
        ]
      },
  
      {
        ic: "📊",
        accent: "#27AE60",
        title:  "Analyse sectorielle",
        sub:    "Observatoire",
  
        desc: `Compare vos scores à ceux d’entreprises anonymisées similaires et affiche
               des écarts prioritaires dans des tableaux de bord sectoriels exportables.`,
  
        objectiveSentence: `« Je veux savoir où je me situe par rapport aux autres acteurs de mon secteur. »`,
  
        objectifs: [
          "Comprendre sa position sectorielle",
          "Détecter les écarts prioritaires",
          "Justifier des choix auprès du COMEX"
        ],
        contacts: [
          { icon:"📈", label:"Dashboards filtrables"      , text:"Secteur, taille, maturité…" },
          { icon:"🔗", label:"API / Export PPT"           , text:"Intégration rapports internes" },
          { icon:"🕒", label:"Benchmarks temps réel"      , text:"Base anonymisée mise à jour" }
        ]
      },
  
      {
        ic: "🧩",
        accent: "#8E44AD",
        title:  "Structuration",
        sub:    "Canevas de transformation",
  
        desc: `Tableau interactif inspiré du Business Model Canvas, pré-rempli par le diagnostic
               puis enrichi en drag-and-drop pour construire la feuille de route cible.`,
  
        objectiveSentence: `« Je veux prioriser nos actions et jalons dans un canevas visuel partagé. »`,
  
        objectifs: [
          "Formaliser une feuille de route claire",
          "Aligner métiers, IT et direction",
          "Prioriser actions, jalons et KPI"
        ],
        contacts: [
          { icon:"🖱️", label:"Drag-and-drop canvas" , text:"Blocs objectifs, KPI, ressources" },
          { icon:"🤝", label:"Co-édition temps réel", text:"Ateliers multi-utilisateurs" },
          { icon:"🔔", label:"Notifications jalons" , text:"Suivi de validation" }
        ]
      },
  
      {
        ic: "🤖",
        accent: "#FF884D",
        title:  "Accompagnement intelligent",
        sub:    "Agent virtuel et coachs",
  
        desc: `Agent conversationnel exploitant NLP & ML pour reformuler le diagnostic,
               suggérer des actions et détecter signaux faibles, avec apprentissage continu.`,
  
        objectiveSentence: `« Je veux des recommandations précises et adaptées à notre contexte. »`,
  
        objectifs: [
          "Traduire les données en actions concrètes",
          "Obtenir recommandations personnalisées",
          "Détecter incohérences / risques tôt"
        ],
        contacts: [
          { icon:"💬", label:"Chat intégré"        , text:"Interface GPT-like contextualisée" },
          { icon:"✨", label:"Suggestions proactives", text:"Push + e-mail ciblés" },
          { icon:"📊", label:"Dashboard Insight"  , text:"Signaux faibles agrégés" }
        ]
      },
  
      {
        ic: "📍",
        accent: "#E74C3C",
        title:  "Formalisation des actions",
        sub:    "Feuille de route",
  
        desc: `Génère une synthèse visuelle et exportable du plan d’action, séquencée
               court / moyen / long terme, pour piloter et communiquer la transformation.`,
  
        objectiveSentence: `« Je veux une roadmap claire à présenter et à suivre. »`,
  
        objectifs: [
          "Compiler et partager la roadmap",
          "Sécuriser budgets et ressources",
          "Piloter l’exécution"
        ],
        contacts: [
          { icon:"🗺️", label:"Timeline interactive", text:"Vue horizon temporel" },
          { icon:"📤", label:"Exports PDF / Excel" , text:"Partage multi-supports" },
          { icon:"📊", label:"Portefeuille projets", text:"Indicateurs temps réel" }
        ]
      }
    ];
  }
  