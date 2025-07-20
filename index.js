// index.js
// ────────────────────────────────────────────────────────────────
//  Feedback API + Frontend static – Digital TAG (SQLite)
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
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'S3cr3t123';

const app = express();

// Gérer __dirname avec ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS autorisé depuis le frontend Render ou localhost
const ALLOWED_ORIGINS = [
  'http://localhost:4000',
  'http://127.0.0.1:5500',
  'https://digitaltag.onrender.com'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-admin-token']
}));

app.use(express.json());

// ────────────────────────────────────────────────────────────────
//  Serve fichiers statiques
// ────────────────────────────────────────────────────────────────

// Sert tous les fichiers dans /public (HTML, main.js, styles.css)
app.use(express.static(path.join(__dirname, 'public')));

// Sert aussi les sous-dossiers comme /components ou /services
app.use('/components', express.static(path.join(__dirname, 'public/components')));
app.use('/services', express.static(path.join(__dirname, 'public/services')));

// ────────────────────────────────────────────────────────────────
//  API Routes
// ────────────────────────────────────────────────────────────────

// GET /feedback : simple test
app.get('/feedback', (req, res) => {
  res.send('✅ API en ligne – POST uniquement');
});

// POST /feedback : Sauvegarde une appréciation utilisateur
app.post('/feedback', (req, res) => {
  const {
    organisation,
    sector,
    email,
    module,
    phase,
    clarity,
    usefulness,
    visualAppeal,
    comment = '—'
  } = req.body;

  if (!organisation || !sector || !email || !module || !phase || !clarity || !usefulness || !visualAppeal) {
    return res.status(400).send("Champs requis manquants");
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO evaluations (organisation, sector, email, module, phase, clarity, usefulness, visual_appeal, comment)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(organisation, sector, email, module, phase, clarity, usefulness, visualAppeal, comment);
    res.sendStatus(200);
  } catch (err) {
    console.error("❌ Erreur SQLite :", err.message);
    res.status(500).send("Erreur lors de l'enregistrement");
  }
});

// GET /admin/feedback : Liste protégée
app.get('/admin/feedback', (req, res) => {
  const token = req.headers['x-admin-token'];
  if (token !== ADMIN_TOKEN) return res.status(403).send("Accès refusé – jeton invalide");

  try {
    const rows = db.prepare('SELECT * FROM evaluations ORDER BY created_at DESC').all();
    res.json(rows);
  } catch (err) {
    res.status(500).send("Erreur lors de la lecture de la base");
  }
});

// GET /admin/pdf : Export PDF des évaluations
app.get('/admin/pdf', (req, res) => {
  const token = req.headers['x-admin-token'];
  if (token !== ADMIN_TOKEN) return res.status(403).send("Accès refusé – jeton invalide");

  try {
    const rows = db.prepare('SELECT * FROM evaluations ORDER BY created_at DESC').all();
    const pdfBuffer = buildPdf(rows);
    res.setHeader('Content-Disposition', 'inline; filename="feedbacks.pdf"');
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).send("Erreur export PDF");
  }
});

// Catch-all pour rediriger vers index.html (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// ────────────────────────────────────────────────────────────────
//  Start server
// ────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Feedback API + Frontend sur http://localhost:${PORT}`);
});
