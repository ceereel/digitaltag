// lib/pdf.js
import PDFDocument from 'pdfkit';

export function buildPdf(rows = []) {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ size: 'A4', margin: 40 });
            const chunks = [];

            doc.on('data', chunk => chunks.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(chunks)));
            doc.on('error', reject);

            // Métadonnées (optionnel mais sympa)
            doc.info = {
                Title: 'Feedback Digital TAG',
                Author: 'Digital TAG',
                Producer: 'pdfkit',
            };

            // Titre
            doc.fontSize(18).text('Feedback Digital TAG', { align: 'center' });
            doc.moveDown();

            if (!rows || rows.length === 0) {
                doc.fontSize(12).text('Aucun feedback pour le moment.', { align: 'left' });
                doc.end();
                return;
            }

            // Helper pour parser un array encodé en JSON (ex: complementarity)
            const asArray = (v) => {
                try {
                    const x = typeof v === 'string' ? JSON.parse(v) : v;
                    return Array.isArray(x) ? x : [];
                } catch {
                    return [];
                }
            };

            rows.forEach((r, idx) => {
                // En-tête de la fiche
                doc
                    .fontSize(12)
                    .fillColor('#0077d2')
                    .text(`${r.phase ?? '-'} – ${r.module ?? '-'}`, { width: 515 });

                // Corps
                doc.fillColor('#000');
                doc.text(`Organisation : ${r.organisation ?? '-'}`);
                doc.text(`Secteur       : ${r.sector ?? '-'}`);
                doc.text(`Email         : ${r.email ?? '-'}`);

                // Tes champs existants (il n'y a pas "rating" en DB -> utilise nps ou autres)
                if (Number.isInteger(r.nps)) doc.text(`NPS           : ${r.nps}/10`);
                if (r.priority) doc.text(`Priorité      : ${r.priority}`);
                if (r.support_needed) doc.text(`Support       : ${r.support_needed}`);
                if (r.time_to_start) doc.text(`Démarrage     : ${r.time_to_start}`);

                const comp = asArray(r.complementarity);
                if (comp.length) doc.text(`Complémentarité : ${comp.join(', ')}`);

                if (r.comment) {
                    doc.moveDown(0.3);
                    doc.font('Helvetica').text(`Commentaire : ${r.comment}`, { width: 515 });
                }

                // Séparateur sauf pour la dernière
                if (idx < rows.length - 1) {
                    doc.moveDown(0.8)
                        .strokeColor('#bbb')
                        .moveTo(40, doc.y)
                        .lineTo(555, doc.y)
                        .stroke();
                    doc.moveDown();
                }
            });

            doc.end();
        } catch (e) {
            reject(e);
        }
    });
}
