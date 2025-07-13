import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: 'https://digitaltag.onrender.com' }));
app.use(express.json());

app.post('/feedback', (req, res) => {
  const data = req.body;
  const now = new Date().toISOString();
  const line = `[${now}] ${data.org} | ${data.module} | ${data.rating} | ${data.comment || '—'}\n`;

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

app.listen(PORT, () => {
  console.log(`Feedback API running on port ${PORT}`);
});
