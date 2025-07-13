// public/Services/ApiService.js

const ENDPOINT = "http://localhost:4000/feedback";

export async function sendEvaluation(payload) {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`API error: ${response.status} – ${message}`);
  }
}
