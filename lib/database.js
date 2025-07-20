// lib/database.js
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Gère __dirname même avec ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Point vers le fichier SQLite (persisté sur Render)
const dbPath = path.join(__dirname, '../data/feedback.db');

// Si base absente, créer le fichier + la table
const isFirstRun = !fs.existsSync(dbPath);

const db = new Database(dbPath);

if (isFirstRun) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS evaluations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      -- Informations utilisateur
      organisation TEXT NOT NULL,
      sector TEXT NOT NULL,
      email TEXT NOT NULL,

      -- Module évalué
      module TEXT NOT NULL,
      phase TEXT NOT NULL,

      -- Critères UX (facultatifs)
      understanding TEXT DEFAULT NULL,
      clarity TEXT DEFAULT NULL,
      relevance TEXT DEFAULT NULL,
      navigation TEXT DEFAULT NULL,
      reuse TEXT DEFAULT NULL,
      comment TEXT DEFAULT NULL,

      -- Timestamp
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log("📦 Base de données SQLite initialisée avec table 'evaluations'.");
}

export default db;
