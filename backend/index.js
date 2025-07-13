import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app  = express();
const PORT = process.env.PORT || 4000;

/* Autorise ton front Render uniquement */
app.use(cors({ origin: "https://digitaltag.onrender.com" }));
app.use(express.json());

/* POST /feedback ---------------------------------------------------- */
app.post("/feedback", (req, res) => {
  const d   = req.body;                                  // {org, sect, mail, module, rating, comment}
  if (!d?.org || !d?.mail || !d?.module || !d?.rating)
    return res.status(400).json({ error: "payload incomplet" });

  const now  = new Date().toISOString();
  const line = `[${now}] ${d.org} | ${d.module} | ${d.rating} | ${d.comment || "—"}\n`;
  fs.appendFile(path.join(__dirname, "feedback.log"), line, err => {
    if (err) return res.status(500).json({ error: "write error" });
    res.sendStatus(200);
  });
});

/* GET /admin/feedback ---------------------------------------------- */
app.get("/admin/feedback", (req, res) => {
  fs.readFile(path.join(__dirname, "feedback.log"), "utf8", (err, txt) => {
    if (err) return res.status(500).json({ error: "read error" });
    res.type("text/plain").send(txt);
  });
});

app.listen(PORT, () => console.log("Feedback API running →", PORT));
