// ────────────────────────────────────────────────────────────────
//  Feedback API – Digital TAG
//  → accepte le front de production ET le front local (127.0.0.1)
// ────────────────────────────────────────────────────────────────
import express from 'express';
import cors     from 'cors';
import fs       from 'fs';

const PORT = process.env.PORT || 4000;
const app   = express();

/* ------------------------------------------------------------------
   CORS : liste blanche dynamique
   ------------------------------------------------------------------ */
const whitelist = [
  'https://digitaltag.onrender.com', // front déployé
  'http://127.0.0.1:5500',           // dev local (Live Server, Vite…)
  'http://localhost:5500'            // alternative localhost
];

app.use(
  cors({
    origin: (origin, cb) => {
      // origin === undefined → requête Postman/cURL : on accepte
      if (!origin || whitelist.includes(origin)) return cb(null, true);
      cb(new Error('Not allowed by CORS: ' + origin));
    }
  })
);

/* ------------------------------------------------------------------
   Middleware
   ------------------------------------------------------------------ */
app.use(express.json());

/* ------------------------------------------------------------------
   Routes
   ------------------------------------------------------------------ */
app.post('/feedback', (req, res) => {
  const { org, module, rating, comment = '—' } = req.body;
  const now  = new Date().toISOString();
  const line = `[${now}] ${org} | ${module} | ${rating} | ${comment}\n`;

  fs.appendFile('feedback.log', line, err => {
    if (err) return res.status(500).send("Erreur d'enregistrement");
    res.sendStatus(200);
  });
});

app.get('/admin/feedback', (req, res) => {
  fs.readFile('feedback.log', 'utf8', (err, content) => {
    if (err) return res.status(500).send("Erreur de lecture");
    res.type('text/plain').send(content);
  });
});

/* ------------------------------------------------------------------
   Lancement
   ------------------------------------------------------------------ */
app.listen(PORT, () => {
  console.log(`✅ Feedback API running on port ${PORT}`);
});
