# PME Journey Map

## Présentation générale
**DigitalTAG** est une application web interactive développée dans le cadre d’un projet de Bachelor en informatique de gestion (HEG Arc, 2025).  
Elle vise à accompagner les PME dans leur transition digitale, en proposant un parcours de transformation structuré et adapté à leurs besoins.

L’application repose sur une logique de **Customer/PME Journey Map** :  
- Les utilisateurs sélectionnent un **cas d’usage**correspondant à leur situation.  
- La plateforme génère un **parcours recommandé** composé de modules numériques.  
- Chaque module peut être exploré via une **carte interactive et une modale détaillée**.  
- Un **système de feedback** permet de recueillir les retours des organisations, et ainsi de définir une courbe émotionnelle pour la direction du projet.  
- Les résultats sont centralisés dans une interface **administrateur** pour analyse et suivi.  

## Fonctionnalités principales

### Vue utilisateur (PME)
- 🗂 **Sélection des cas d’usage** : choix parmi 5 use cases prédéfinis.  
- 🛠 **Modules interactifs** : Diagnostic, Observatoire, Canevas, Agent IA, Feuille de route.  
- 🔄 **Parcours recommandé** : génération dynamique selon le cas d’usage choisi.  
- 📝 **Feedback** : formulaire complet (pertinence, maturité, priorité, NPS, commentaires).  
- 📱 **Responsive design** : expérience fluide sur desktop et mobile (scroll horizontal sur cartes).  

### Vue administrateur
- 🔐 **Accès protégé par jeton**.  
- 📊 **Visualisation des résultats** :
  - Tableau détaillé des évaluations,
  - Regroupement **par organisation**,
  - Graphiques dynamiques (Chart.js).  
- 📂 **Export des données** (CSV, PDF).  

### Backend
- API REST (Node.js + Express).  
- Stockage des évaluations dans une base **SQLite3** locale.  
- Endpoints sécurisés pour la collecte et la consultation des données.  

## Architecture du projet

DigitalTAG/
│
├── public/ # Frontend (statique : HTML, CSS, JS)
│ ├── index.html # Page principale (use cases + PME Journey Map)
│ ├── admin.html # Interface administrateur
│ ├── styles.css # Feuille de style principale
│ ├── components/ # Composants front-end
│ │ ├── Cards.js # Affichage des cartes (modules)
│ │ ├── Modal.js # Gestion des modales (contenu + feedback)
│ │ ├── JourneyView.js # Vue "Parcours recommandé"
│ │ ├── UsecaseFilter.js # Gestion des use cases
│ │ ├── auth.js # Authentification utilisateur (organisation, secteur, email)
│ │ └── admin.js # Scripts de l’espace admin
│ └── services/ # Services partagés
│ ├── PhaseService.js # Métadonnées des phases et modules
│ ├── AnimationServices.js # Animations front-end
│ └── ApiService.js # Requêtes API vers le backend
│
├── server.js # Serveur Node.js / Express
├── feedback.db # Base SQLite (évaluations)
├── package.json # Dépendances npm
└── README.md # Documentation


## Technologies utilisées

### Frontend
- **HTML5 / CSS3** (structuration + design responsive)  
- **TailwindCSS** (via CDN)  
- **JavaScript ES Modules** (modularisation, logique applicative)  
- **Chart.js** (visualisation des feedbacks dans admin)  

### Backend
- **Node.js + Express.js** (API REST)  
- **SQLite3** (base de données embarquée, persistante)  

## Installation et configuration

### Prérequis
- Node.js ≥ 18.x  
- npm ≥ 9.x  

### Étapes d’installation
1. Cloner le dépôt :
   ```bash
   git clone https://github.com/mon-compte/DigitalTAG.git
   cd DigitalTAG
2. Installer les dépendances :
npm install

3. Initialiser la base de données :
La base feedback.db est générée automatiquement au premier lancement.
Structure principale :

CREATE TABLE evaluations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  organisation TEXT,
  sector TEXT,
  email TEXT,
  phase INTEGER,
  module TEXT,
  relevance_now INTEGER,
  maturity_fit INTEGER,
  expected_impact TEXT,
  implementation_ease INTEGER,
  deliverable_clarity INTEGER,
  priority TEXT,
  support_needed TEXT,
  time_to_start TEXT,
  nps INTEGER,
  comment TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

4. Démarrer le serveur :
npm start
Accès via http://localhost:4000

## Mode d’emploi

### Utilisateur PME
Accéder à l’URL principale.
- Sélectionner un cas d’usage (ex. “Je veux une vision claire de ma maturité digitale”).
- Visualiser le parcours recommandé et cliquer sur les cartes pour plus de détails.
- Renseigner un feedback à chaque module.

### Administrateur
Accéder à /admin.html.
Entrer le jeton d’accès (défini côté backend).

Visualiser :
- Les évaluations par module,
- Les organisations ayant participé,
- Les statistiques graphiques.
- Exporter en PDF ou CSV si nécessaire.

7. Points forts
- Interface modulaire et responsive.
- Feedbacks regroupés par organisation pour analyse stratégique.
- Architecture simple (Express + SQLite) → déploiement rapide.
- Adapté à un contexte académique et PME réelles.

## Pistes d’amélioration

🔑 Authentification avancée (JWT, sessions).
🌍 Internationalisation (FR/EN/DE).
📬 Notifications automatiques par email.
📈 Tableau de bord administrateur enrichi (filtres, exports XLSX).
☁️ Hébergement sur une plateforme cloud (Render, Railway, Vercel).

## Contexte académique
Projet développé dans le cadre d’un travail de Bachelor à la HEG Arc (HES-SO), en 2025.
Il mobilise des compétences en :
- Développement web full-stack (Node.js, ES Modules, Chart.js)
- Bases de données relationnelles (SQLite3)
- UX/UI et techniques de business analyse
- Gestion de projet

## Licence
Projet académique – utilisation libre dans un cadre pédagogique et de recherche.
