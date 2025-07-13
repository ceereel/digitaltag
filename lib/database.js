// lib/database.js
import Database from 'better-sqlite3';
import fs from 'fs';

if (!fs.existsSync('data')) fs.mkdirSync('data');
const db = new Database('data/evals.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS evaluations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phase        TEXT,
    module       TEXT,
    organisation TEXT,
    sector       TEXT,
    email        TEXT,
    rating       TEXT,
    comment      TEXT,
    created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

export default db;
