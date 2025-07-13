// Stocke / récupère l'utilisateur dans localStorage
export function saveUser({ org, sect, mail }) {
    localStorage.setItem("dtagUser", JSON.stringify({ org, sect, mail }));
  }
  export function getUser() {
    const raw = localStorage.getItem("dtagUser");
    return raw ? JSON.parse(raw) : null;
  }
  