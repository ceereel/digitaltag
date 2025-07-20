// public/components/auth.js

export function saveUser({ org, sect, mail }) {
  localStorage.setItem("dtagUser", JSON.stringify({ org, sect, mail }));
}

export function getUser() {
  try {
    const raw = localStorage.getItem("dtagUser");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// ✅ Expose pour tests console (dev only)
window.saveUser = saveUser;
window.getUser = getUser;