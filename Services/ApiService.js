export async function sendEvaluation(payload){
    const res = await fetch('https://digitaltag.onrender.com/api/evaluations',{
       method:'POST',
       headers:{'Content-Type':'application/json'},
       body: JSON.stringify(payload)
    });
    if(!res.ok) throw new Error('Échec envoi API');
  }
  