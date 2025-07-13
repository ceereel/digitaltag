/* Appelle ton backend Render */
const ENDPOINT = "https://user-journey-backend.onrender.com/";

export async function sendEvaluation(payload){
  const r = await fetch(ENDPOINT,{
    method : "POST",
    headers: { "Content-Type":"application/json" },
    body   : JSON.stringify(payload)
  });
  if(!r.ok) throw new Error("API error");
}
