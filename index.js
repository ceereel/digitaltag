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

// ────────────────────────────────────────────────────────────────
//  Servir tous les fichiers statiques depuis /public
// ────────────────────────────────────────────────────────────────

app.use(express.static(path.join(__dirname, 'public')));
app.use('/components', express.static(path.join(__dirname, 'public/components')));
app.use('/services', express.static(path.join(__dirname, 'public/services')));

// ────────────────────────────────────────────────────────────────
//  API Routes
// ────────────────────────────────────────────────────────────────

app.get('/feedback', (req, res) => {
  res.send('✅ API en ligne – POST uniquement');
});

app.post('/feedback', (req, res) => {
  console.log("📥 Données reçues :", req.body);

  const {
    organisation,
    sector,
    email,
    module,
    phase,
    understanding = null,
    clarity = null,
    relevance = null,
    navigation = null,
    reuse = null,
    comment = '—'
  } = req.body;

  // Vérifie la présence des champs obligatoires
  if (!organisation || !sector || !email || !module || !phase) {
    return res.status(400).send("Champs requis manquants");
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO evaluations (
        organisation, sector, email, module, phase,
        understanding, clarity, relevance, navigation, reuse, comment
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      organisation,
      sector,
      email,
      module,
      phase,
      understanding,
      clarity,
      relevance,
      navigation,
      reuse,
      comment
    );

    res.sendStatus(200);
  } catch (err) {
    console.error("❌ Erreur SQLite :", err.message);
    res.status(500).send("Erreur lors de l'enregistrement");
  }
});

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

// (Optionnel) route CSV si tu ajoutes l'export
app.get('/admin/csv', (req, res) => {
  const token = req.query.token;
  if (token !== ADMIN_TOKEN) return res.status(403).send("Accès refusé – jeton invalide");

  try {
    const rows = db.prepare('SELECT * FROM evaluations ORDER BY created_at DESC').all();
    const header = Object.keys(rows[0]).join(',');
    const csv = rows.map(r => Object.values(r).join(',')).join('\n');
    res.setHeader('Content-Disposition', 'attachment; filename="feedbacks.csv"');
    res.setHeader('Content-Type', 'text/csv');
    res.send(header + '\n' + csv);
  } catch (err) {
    res.status(500).send("Erreur export CSV");
  }
});

// Rediriger tout le reste vers index.html (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// ────────────────────────────────────────────────────────────────
//  Lancer le serveur
// ────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`✅ Feedback API + Frontend sur http://localhost:${PORT}`);
});
