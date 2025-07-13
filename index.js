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

// CORS autorisé depuis le frontend Render
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'https://digitaltag-api.onrender.com'
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

// 🔁 Sert les fichiers statiques depuis /public
app.use(express.static(path.join(__dirname, 'public')));

// ────────────────────────────────────────────────────────────────
//  API Routes
// ────────────────────────────────────────────────────────────────

// GET /feedback (simple test)
app.get('/feedback', (req, res) => {
  res.send('✅ API en ligne – POST uniquement');
});

// POST /feedback (sauvegarde une évaluation)
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

// GET /admin/feedback (liste protégée)
app.get('/admin/feedback', (req, res) => {
  const token = req.headers['x-admin-token'];
  if (token !== ADMIN_TOKEN) return res.status(403).send("Accès refusé – jeton invalide");

  try {
    const rows = db.prepare('SELECT * FROM evaluations ORDER BY created_at DESC').all();
    res.json(rows);
  } catch (err) {
    res.status(500).send("Erreur lecture SQLite");
  }
});

// GET /admin/pdf (export PDF)
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

// Catch-all → redirige vers index.html (cas SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// ────────────────────────────────────────────────────────────────
//  Start server
// ────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Feedback API + Frontend sur http://localhost:${PORT}`);
});
