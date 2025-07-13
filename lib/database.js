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
      organisation TEXT NOT NULL,
      sector TEXT NOT NULL,
      email TEXT NOT NULL,
      module TEXT NOT NULL,
      phase TEXT NOT NULL,
      rating TEXT NOT NULL,
      comment TEXT DEFAULT '—',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log("📦 Nouvelle base SQLite initialisée.");
}

export default db;