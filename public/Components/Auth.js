// public/components/auth.js

export function saveUser({ org, sect, mail }) {
  if (!org || !sect || !mail) {
    console.warn("⚠️ Paramètres manquants pour saveUser()");
    return;
  }
  localStorage.setItem("dtagUser", JSON.stringify({ org, sect, mail }));
}

export function getUser() {
  try {
    const raw = localStorage.getItem("dtagUser");
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error("Erreur lors de la récupération de l'utilisateur :", err);
    return null;
  }
}

// ✅ Dev tools (console uniquement)
if (typeof window !== 'undefined') {
  window.saveUser = saveUser;
  window.getUser = getUser;
}
