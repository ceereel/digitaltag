/* ------------------------------------------------------------------
 *  Services/PhaseService.js
 *  -> stocke toutes les données métier de la Journey Map
 *  -> expose un micro-service { get(id), getAll() }
 * -----------------------------------------------------------------*/

export const PhaseService = (() => {
    /* Palette simplifiée (réutilisée côté Modal) */
    const palette = {
      1: 'green',
      2: 'blue',
      3: 'purple',
      4: 'orange',
      5: 'red'
    };
  
    /* -------------------- Données des 5 phases -------------------- */
    const phases = {
      /* === Phase 1 ================================================= */
      1: {
        color: palette[1],
        title:    'Phase 1 – Entrée guidée',
        subtitle: 'Auto-diagnostic de maturité digitale',
        icon:     '🧭',
  
        /* Résumé pour la carte (affiché avant ouverture de la modale) */
        card: {
          objectives : 'Évaluer la maturité digitale actuelle et identifier les axes prioritaires.',
          touchpoints: 'Questionnaire en 5 dimensions, radar de maturité.'
        },
  
        /* Contenu HTML complet de la modale */
        content: `
          <h3 class="text-xl font-bold mb-4 text-green-600">🎯 Auto-diagnostic</h3>
          <p class="mb-6">
            Le module d'auto-diagnostic vous permet d'évaluer de manière structurée votre niveau de maturité digitale,
            selon cinq dimensions clés :<strong> stratégie, processus, technologie, culture digitale et gouvernance</strong>.
          </p>
  
          <div class="bg-gray-100 rounded-lg p-4 mb-6">
            <h4 class="font-semibold mb-2 text-green-700">✨ Fonctionnalités principales&nbsp;:</h4>
            <ul class="list-disc list-inside space-y-2">
              <li>Questionnaire structuré sur 5 dimensions</li>
              <li>Indicateurs visuels : diagrammes radar, scores numériques</li>
              <li>Matrices synthétiques de positionnement</li>
              <li>Base d’analyse pour la stratégie digitale</li>
            </ul>
          </div>
  
          <p class="mb-4">
            En répondant au questionnaire, vous obtenez des indicateurs visuels clairs qui reflètent votre positionnement.
          </p>
  
          <p class="mb-4">
            Ces résultats constituent une base d’analyse solide pour orienter votre réflexion stratégique ou alimenter votre feuille de route.
          </p>
  
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <p class="text-green-700"><strong>💡 Avantage&nbsp;:</strong> module activable à tout moment, indépendamment des autres fonctionnalités.</p>
          </div>`
      },
  
      /* === Phase 2 ================================================= */
      2: {
        color: palette[2],
        title:    'Phase 2 – Analyse comparative',
        subtitle: 'Observatoire et benchmarking sectoriel',
        icon:     '📊',
        card: {
          objectives : 'Se comparer aux pairs et détecter les opportunités d’amélioration.',
          touchpoints: 'Observatoire sectoriel, tableaux de bord dynamiques.'
        },
        content: `
          <h3 class="text-xl font-bold mb-4 text-blue-600">🔍 Observatoire</h3>
          <p class="mb-6">
            Comparez-vous à une base de cas anonymisés pour situer votre entreprise dans son écosystème.
          </p>
  
          <div class="bg-gray-100 rounded-lg p-4 mb-6">
            <h4 class="font-semibold mb-2 text-blue-700">✨ Fonctionnalités principales&nbsp;:</h4>
            <ul class="list-disc list-inside space-y-2">
              <li>Filtres : secteur d’activité, taille, profil de maturité</li>
              <li>Tableaux de bord dynamiques des tendances</li>
              <li>Exports PDF et API interne</li>
            </ul>
          </div>
  
          <p class="mb-4">Accédez à des comparaisons pertinentes et contextualisées.</p>
  
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p class="text-blue-700"><strong>💡 Avantage&nbsp;:</strong> consultable à tout moment, sans prérequis.</p>
          </div>`
      },
  
      /* === Phase 3 ================================================= */
      3: {
        color: palette[3],
        title:    'Phase 3 – Structuration',
        subtitle: 'Canevas de transformation digitale',
        icon:     '🧩',
        card: {
          objectives : 'Construire une feuille de route claire et priorisée.',
          touchpoints: 'Canevas drag-and-drop, blocs éditables.'
        },
        content: `
          <h3 class="text-xl font-bold mb-4 text-purple-600">🎨 Canevas</h3>
          <p class="mb-6">
            Organisez vos initiatives dans un canevas inspiré du Business Model Canvas.
          </p>
  
          <div class="bg-gray-100 rounded-lg p-4 mb-6">
            <h4 class="font-semibold mb-2 text-purple-700">✨ Fonctionnalités principales&nbsp;:</h4>
            <ul class="list-disc list-inside space-y-2">
              <li>Interface drag-and-drop intuitive</li>
              <li>Blocs éditables : objectifs, jalons, responsables, indicateurs</li>
              <li>Compatible ateliers collaboratifs</li>
            </ul>
          </div>
  
          <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p class="text-purple-700"><strong>💡 Avantage&nbsp;:</strong> outil évolutif, modifiable à tout moment.</p>
          </div>`
      },
  
      /* === Phase 4 ================================================= */
      4: {
        color: palette[4],
        title:    'Phase 4 – IA Accompagnement',
        subtitle: 'Agent conversationnel intelligent',
        icon:     '🤖',
        card: {
          objectives : 'Bénéficier d’un coaching intelligent et contextuel.',
          touchpoints: 'Agent conversationnel IA, suggestions personnalisées.'
        },
        content: `
          <h3 class="text-xl font-bold mb-4 text-orange-600">🧠 Agent conversationnel</h3>
          <p class="mb-6">
            L’IA reformule vos diagnostics et propose des actions adaptées à votre contexte.
          </p>
  
          <div class="bg-gray-100 rounded-lg p-4 mb-6">
            <h4 class="font-semibold mb-2 text-orange-700">✨ Fonctionnalités principales&nbsp;:</h4>
            <ul class="list-disc list-inside space-y-2">
              <li>Reformulation des diagnostics en langage accessible</li>
              <li>Suggestions d’actions personnalisées</li>
              <li>Détection de signaux faibles</li>
            </ul>
          </div>
  
          <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p class="text-orange-700"><strong>💡 Avantage&nbsp;:</strong> accompagnement automatisé mais personnalisé.</p>
          </div>`
      },
  
      /* === Phase 5 ================================================= */
      5: {
        color: palette[5],
        title:    'Phase 5 – Formalisation',
        subtitle: 'Feuille de route numérique',
        icon:     '📍',
        card: {
          objectives : 'Partager et suivre la feuille de route numérique.',
          touchpoints: 'Timeline exportable, rapports & exports.'
        },
        content: `
          <h3 class="text-xl font-bold mb-4 text-red-600">🗺️ Feuille de route</h3>
          <p class="mb-6">
            Génère une synthèse visuelle des actions à court, moyen et long terme.
          </p>
  
          <div class="bg-gray-100 rounded-lg p-4 mb-6">
            <h4 class="font-semibold mb-2 text-red-700">✨ Fonctionnalités principales&nbsp;:</h4>
            <ul class="list-disc list-inside space-y-2">
              <li>Synthèse visuelle par horizon temporel</li>
              <li>Export & partage facilités</li>
              <li>Outil de pilotage interne</li>
            </ul>
          </div>
  
          <div class="bg-red-50 border border-red-200 rounded-lg p-4">
            <p class="text-red-700"><strong>💡 Avantage&nbsp;:</strong> communication claire et suivi des actions.</p>
          </div>`
      }
    };
  
    /* ------------------- Mini-API partagée ------------------------ */
    const get    = id => phases[id] ?? null;
    
    /* Convert phases object to an array for iteration */
    const getAll = () => Object.values(phases);
  
    return { get, getAll };
  })();
