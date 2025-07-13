import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db.js';
import { buildPdf } from './pdf.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

/* POST /api/evaluations  ----------------------- */
app.post('/api/evaluations', (req,res)=>{
  const {phase,module,organisation,sector,email,rating,comment} = req.body;
  const stmt = db.prepare(`
    INSERT INTO evaluations (phase,module,organisation,sector,email,rating,comment)
    VALUES (?,?,?,?,?,?,?)
  `);
  stmt.run(phase,module,organisation,sector,email,rating,comment||'');
  res.json({status:'ok'});
});

/* GET  /api/evaluations/pdf  ------------------- */
app.get('/api/evaluations/pdf', (req,res)=>{
  const rows = db.prepare('SELECT * FROM evaluations ORDER BY created_at DESC').all();
  const pdfBuffer = buildPdf(rows);          // => Buffer
  res.setHeader('Content-Type','application/pdf');
  res.setHeader('Content-Disposition','attachment; filename="evaluations.pdf"');
  res.send(pdfBuffer);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>console.log('API up on',PORT));
