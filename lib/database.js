// /lib/database.js
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../data/feedback.db');

const isFirstRun = !fs.existsSync(dbPath);
const db = new Database(dbPath);

//J'essaierai de revoir la structure de la DB
//Privilégier plusieurs tables (organisation pour ton user, evaluation, etc...)
db.exec(`
  CREATE TABLE IF NOT EXISTS evaluations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    -- User info
    organisation TEXT NOT NULL,
    sector       TEXT NOT NULL,
    email        TEXT NOT NULL,

    -- Module / Phase
    module TEXT NOT NULL,
    phase  TEXT NOT NULL,

    -- New rich feedback fields (nullable by design)
    relevance_now        INTEGER,   -- 1..5
    maturity_fit         INTEGER,   -- 1..5
    expected_impact      INTEGER,   -- 1..5 or text if you later swap
    implementation_ease  INTEGER,   -- 1..5
    deliverable_clarity  INTEGER,   -- 1..5
    complementarity      TEXT,      -- free text or "Oui/Non/Partiel"
    priority             TEXT,      -- Haute/Moyenne/Basse
    support_needed       TEXT,      -- Aucun/Agent IA/Coaching/Les deux
    time_to_start        TEXT,      -- Immédiat/<1 mois/1–3 mois/>3 mois

    nps                  INTEGER,   -- 0..10
    would_reuse          TEXT,      -- Oui/Non/Peut-être

    -- Legacy/UX toggles, keep nullable
    understanding        TEXT,
    clarity              TEXT,
    navigation           TEXT,

    comment              TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

function ensureColumn(table, col, type) {
  const info = db.prepare(`PRAGMA table_info(${table})`).all();
  const has = info.some(c => c.name === col);
  if (!has) {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${col} ${type}`);
  }
}

[
  ['relevance_now',       'INTEGER'],
  ['maturity_fit',        'INTEGER'],
  ['expected_impact',     'INTEGER'],
  ['implementation_ease', 'INTEGER'],
  ['deliverable_clarity', 'INTEGER'],
  ['complementarity',     'TEXT'],
  ['priority',            'TEXT'],
  ['support_needed',      'TEXT'],
  ['time_to_start',       'TEXT'],
  ['nps',                 'INTEGER'],
  ['would_reuse',         'TEXT'],
  ['understanding',       'TEXT'],
  ['clarity',             'TEXT'],
  ['navigation',          'TEXT'],
  ['comment',             'TEXT'],
].forEach(([c, t]) => ensureColumn('evaluations', c, t));

console.log('📦 SQLite ready at', dbPath);
export default db;
