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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS autorisé depuis le frontend Render ou localhost
const ALLOWED_ORIGINS = [
  'http://localhost:4000',
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

app.use(express.static(path.join(__dirname, 'public')));
app.use('/components', express.static(path.join(__dirname, 'public/components')));
app.use('/services', express.static(path.join(__dirname, 'public/services')));


// ────────────────────────────────────────────────────────────────
//  Helpers
// ────────────────────────────────────────────────────────────────
function getToken(req) {
  return req.headers['x-admin-token'] || req.query.token || req.get('x-admin-token');
}

function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

function asJSON(value) {
  try {
    if (Array.isArray(value)) return JSON.stringify(value);
    // si on reçoit déjà du JSON string côté client
    if (typeof value === 'string') {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return JSON.stringify(parsed);
    }
  } catch {}
  return JSON.stringify([]);
}

function requireAdmin(req, res) {
    const token = getToken(req);
    if (token !== ADMIN_TOKEN) return res.status(403).send('Accès refusé – jeton invalide');
}


// ────────────────────────────────────────────────────────────────
//  API Routes
// ────────────────────────────────────────────────────────────────

// Petite route de santé
app.get('/health', (_req, res) => res.send('OK'));


// À quoi sert cet endpoint ?
app.get('/feedback', (req, res) => {
  res.send('✅ API en ligne – utilisez POST /feedback pour soumettre un avis.');
});

app.post('/feedback', (req, res) => {
  const {
    organisation,
    sector,
    email,
    module,
    phase,

    relevance_now = null,       // 1..5
    maturity_fit = null,        // 1..5 (slider)
    expected_impact = null,     // "Rapide" | "Modéré" | "Structurant" | "Transversal"
    implementation_ease = null, // 1..5
    complementarity = [],       // array de phases
    deliverable_clarity = null, // 1..5
    priority = null,            // "Haute" | "Moyenne" | "Basse"
    support_needed = null,      // "Aucun" | "Agent IA" | "Coaching" | "Les deux"
    time_to_start = null,       // "Immédiat" | "< 1 mois" | "1–3 mois" | "> 3 mois"
    nps = null,                 // 0..10
    comment = ''                // texte libre
  } = req.body ?? {};

  if (![organisation, sector, email, module, phase].every(isNonEmptyString)) {
    return res.status(400).send('Champs requis manquants (organisation, sector, email, module, phase).');
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO evaluations (
        organisation, sector, email,
        module, phase,
        relevance_now, maturity_fit, expected_impact, implementation_ease,
        complementarity, deliverable_clarity,
        priority, support_needed, time_to_start,
        nps, comment
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      organisation?.trim(),
      sector?.trim(),
      email?.trim(),
      module?.trim(),
      phase?.trim(),
      relevance_now ?? null,
      maturity_fit ?? null,
      expected_impact ?? null,
      implementation_ease ?? null,
      asJSON(complementarity),
      deliverable_clarity ?? null,
      priority ?? null,
      support_needed ?? null,
      time_to_start ?? null,
      nps ?? null,
      comment ?? ''
    );

    res.sendStatus(200);
  } catch (err) {
    console.error('❌ Erreur SQLite (POST /feedback):', err.message);
    res.status(500).send("Erreur lors de l'enregistrement");
  }
});

app.get('/admin/feedback', (req, res) => {
  requireAdmin(req, res);
  try {
    const rows = db.prepare('SELECT * FROM evaluations ORDER BY created_at DESC').all();
      res.status(200).json(rows);
  } catch (err) {
    console.error('❌ Erreur SQLite (GET /admin/feedback):', err.message);
    res.status(500).send('Erreur lors de la lecture de la base');
  }
});

app.get('/admin/pdf', async (req, res) => {
    requireAdmin(req, res);
    try {
        const rows = db.prepare('SELECT * FROM evaluations ORDER BY created_at DESC').all();
        const pdfBuffer = await buildPdf(rows);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="feedbacks.pdf"');
        res.status(200).send(pdfBuffer);
    } catch (err) {
        console.error('❌ Erreur export PDF:', err.message);
        res.status(500).send('Erreur export PDF');
    }
});

app.get('/admin/csv', (req, res) => {
    requireAdmin(req, res);

  try {
    const rows = db.prepare('SELECT * FROM evaluations ORDER BY created_at DESC').all();

    if (!rows || rows.length === 0) {
      res.setHeader('Content-Disposition', 'attachment; filename="feedbacks.csv"');
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      return res.send(''); // CSV vide
    }


    // Tu peux extraire la construction du csv dans un script js dédié (comme pour le pdf)
    const headers = Object.keys(rows[0]);

    const escapeCSV = (val) => {
      if (val === null || val === undefined) return '';
      const s = String(val);
      if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
      return s;
    };

    const csvLines = [
      headers.map(escapeCSV).join(','),
      ...rows.map(row => headers.map(h => escapeCSV(row[h])).join(','))
    ];
    const csv = csvLines.join('\n');

    res.setHeader('Content-Disposition', 'attachment; filename="feedbacks.csv"');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.status(200).send(csv);
  } catch (err) {
    console.error('❌ Erreur export CSV:', err.message);
    res.status(500).send('Erreur export CSV');
  }
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// ────────────────────────────────────────────────────────────────
//  Lancer le serveur
// ────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Feedback API + Frontend sur http://localhost:${PORT}`);
});
