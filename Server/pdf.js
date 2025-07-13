import PDFDocument from 'pdfkit';
export function buildPdf(rows){
  const doc = new PDFDocument({margin:40});
  const chunks=[];
  doc.on('data',c=>chunks.push(c)).on('end',()=>{});
  doc.fontSize(18).text('Feedback Digital TAG', {align:'center'});
  doc.moveDown();
  rows.forEach(r=>{
    doc.fontSize(12).fillColor('#0077d2').text(`${r.phase} – ${r.module}`);
    doc.fillColor('#000').text(`Organisation : ${r.organisation}`);
    doc.text(`Secteur       : ${r.sector}`);
    doc.text(`Email         : ${r.email}`);
    doc.text(`Évaluation    : ${r.rating}`);
    if(r.comment) doc.text(`Commentaire   : ${r.comment}`);
    doc.moveDown(0.8).strokeColor('#bbb').moveTo(40,doc.y).lineTo(550,doc.y).stroke();
    doc.moveDown();
  });
  doc.end();
  return Buffer.concat(chunks);
}
