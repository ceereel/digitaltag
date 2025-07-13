import Database from 'better-sqlite3';
const db = new Database('evals.db');
db.exec(`
  CREATE TABLE IF NOT EXISTS evaluations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phase       TEXT,
    module      TEXT,
    organisation TEXT,
    sector      TEXT,
    email       TEXT,
    rating      TEXT,
    comment     TEXT,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);
export default db;