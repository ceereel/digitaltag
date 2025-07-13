// index.js
// ────────────────────────────────────────────────────────────────
//  Feedback API – Digital TAG (version SQLite)
// ────────────────────────────────────────────────────────────────
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './lib/database.js';
import { buildPdf } from './lib/pdf.js';

dotenv.config();

const PORT = process.env.PORT || 4000;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS permissif avec contrôle d'en-têtes
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-admin-token']
}));

app.use(express.json());

// Servir les fichiers statiques (HTML, favicon, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// GET /feedback → test simple
app.get('/feedback', (req, res) => {
  res.send('✅ API en ligne – POST uniquement');
});

// POST /feedback → stocke une évaluation
app.post('/feedback', (req, res) => {
  const { org, sect, mail, module, rating, comment = '—' } = req.body;

  if (!org || !sect || !mail || !module || !rating) {
    return res.status(400).send("Champs requis manquants");
  }

  const stmt = db.prepare(`
    INSERT INTO evaluations (organisation, sector, email, module, phase, rating, comment)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  try {
    stmt.run(org, sect, mail, module, module.split(' – ')[0], rating, comment);
    res.sendStatus(200);
  } catch (err) {
    console.error("Erreur SQLite :", err.message);
    res.status(500).send("Erreur d'enregistrement");
  }
});

// GET /admin/feedback → liste complète des évaluations
app.get('/admin/feedback', (req, res) => {
  const token = req.headers['x-admin-token'];
  if (token !== ADMIN_TOKEN) return res.status(403).send("Accès refusé");

  try {
    const rows = db.prepare('SELECT * FROM evaluations ORDER BY created_at DESC').all();
    res.json(rows);
  } catch (err) {
    res.status(500).send("Erreur lecture SQLite");
  }
});

// GET /admin/pdf → export PDF des feedbacks
app.get('/admin/pdf', (req, res) => {
  const token = req.headers['x-admin-token'];
  if (token !== ADMIN_TOKEN) return res.status(403).send("Accès refusé");

  try {
    const rows = db.prepare('SELECT * FROM evaluations ORDER BY created_at DESC').all();
    const pdfBuffer = buildPdf(rows);
    res.setHeader('Content-Disposition', 'inline; filename=\"feedbacks.pdf\"');
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).send("Erreur export PDF");
  }
});

// TODO (optionnel) : GET /admin/csv pour export CSV

app.listen(PORT, () => {
  console.log(`✅ Feedback API SQLite running on http://localhost:${PORT}`);
});
