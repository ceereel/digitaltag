// ───────────────────────────────────────────────
// auth.js — Gestion user (localStorage) + dropdown + modales
// ───────────────────────────────────────────────

export function saveUser({ org, sect, mail }) {
  localStorage.setItem("dtagUser", JSON.stringify({ org, sect, mail }));
}
export function getUser() {
  try { const raw = localStorage.getItem("dtagUser"); return raw ? JSON.parse(raw) : null; }
  catch { return null; }
}

const SECTEURS = [
  "Nature, environnement",
  "Hôtellerie-restauration, alimentation, tourisme",
  "Construction, bâtiment, aménagement intérieur",
  "Industrie, technique, informatique",
  "Transports, véhicules, logistique",
  "Économie, management, commerce",
  "Administration publique, justice, sécurité",
  "Art, design, culture, mode",
  "Médias, information, communication",
  "Santé, sport, bien-être",
  "Formation, social"
];

function renderAuthModal(user = {}) {
  return `
    <div id="authModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-[100000]">
      <div class="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg space-y-4 relative">
        <h2 class="text-lg font-semibold text-[#0077d2]">Informations utilisateur</h2>
        <p class="text-sm text-gray-600">Merci de compléter ou modifier vos informations :</p>

        <input type="text" id="authOrg" placeholder="Organisation"
               class="w-full border px-3 py-2 text-sm rounded"
               value="${user.org || ''}" />

        <select id="authSect" class="w-full border px-3 py-2 text-sm rounded bg-white">
          <option value="">-- Sélectionnez un secteur --</option>
          ${SECTEURS.map(s => `<option value="${s}" ${user.sect === s ? 'selected' : ''}>${s}</option>`).join('')}
        </select>

        <input type="email" id="authMail" placeholder="Email professionnel"
               class="w-full border px-3 py-2 text-sm rounded"
               value="${user.mail || ''}"
               pattern="^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$" /> <!-- Ajout d'un pattern pour la validation du mail. Tu devras aussi faire la validation lors de la soumission du formulaire-->

        <div class="flex justify-between gap-4 pt-4">
          <button id="cancelAuth" class="w-1/2 border border-gray-300 text-sm py-2 rounded hover:bg-gray-100">Annuler</button>
          <button id="authSubmit" class="w-1/2 bg-[#0077d2] text-white font-semibold py-2 rounded hover:bg-[#005fa3]">Enregistrer</button>
        </div>
      </div>
    </div>
  `;
}
function renderLogoutModal() {
  return `
    <div id="logoutModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-[100000]">
      <div class="bg-white p-6 rounded-xl w-[90%] max-w-sm shadow-lg text-center space-y-4">
        <h2 class="text-lg font-semibold text-[#0077d2]">Se déconnecter ?</h2>
        <p class="text-sm text-gray-600">Voulez-vous vraiment vous déconnecter ?</p>
        <div class="flex justify-center gap-4 pt-2">
          <button id="confirmLogout" class="bg-[#0077d2] text-white text-sm px-4 py-2 rounded hover:bg-[#005fa3]">Se déconnecter</button>
          <button id="cancelLogout" class="border text-sm px-4 py-2 rounded hover:bg-gray-100">Annuler</button>
        </div>
      </div>
    </div>
  `;
}
function openAuthModal(prefill) {
  document.body.insertAdjacentHTML("beforeend", renderAuthModal(prefill));
}
function openLogoutModal() {
  document.body.insertAdjacentHTML("beforeend", renderLogoutModal());
}
function closeEl(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}
function setUserOrgLabel() {
  const user = getUser();
  const label = document.getElementById("userOrg");
  if (label) label.textContent = user?.org || "Compte";
}

function toggleUserDropdown() {
  const dd = document.getElementById("userDropdown");
  if (!dd) return;
  dd.classList.toggle("hidden");
}
function hideUserDropdown() {
  document.getElementById("userDropdown")?.classList.add("hidden");
}
function clickInside(el, target) {
  return el && (el === target || el.contains(target));
}

document.addEventListener("DOMContentLoaded", () => {
  setUserOrgLabel();

  if (!getUser()) openAuthModal();

  document.addEventListener("click", (e) => {
    const t = e.target;

    if (t.closest && t.closest("#userBtn")) {
      e.stopPropagation();
      toggleUserDropdown();
      return;
    }

    const dd = document.getElementById("userDropdown");
    const btn = document.getElementById("userBtn");
    if (!clickInside(dd, t) && !clickInside(btn, t)) {
      hideUserDropdown();
    }

    if (t.id === "editUser") {
      hideUserDropdown();
      openAuthModal(getUser() || {});
      return;
    }

    if (t.id === "logoutBtn") {
      hideUserDropdown();
      openLogoutModal();
      return;
    }

    if (t.id === "cancelAuth") {
      closeEl("authModal");
      return;
    }
    if (t.id === "authSubmit") {
      const org = document.getElementById("authOrg")?.value.trim();
      const sect = document.getElementById("authSect")?.value.trim();
      const mail = document.getElementById("authMail")?.value.trim();
      if (!org || !sect || !mail) { alert("Merci de remplir tous les champs."); return; }
        // Regex + popup simple pour l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(mail)) {
            alert("Merci d’entrer une adresse email valide.");
            return;
        }

      saveUser({ org, sect, mail });
      setUserOrgLabel();
      closeEl("authModal");
      return;
    }
    if (t.id === "authModal") {
      closeEl("authModal");
      return;
    }

    if (t.id === "cancelLogout") { closeEl("logoutModal"); return; }
    if (t.id === "confirmLogout") {
      localStorage.removeItem("dtagUser");
      location.reload();
      return;
    }
    if (t.id === "logoutModal") { closeEl("logoutModal"); return; }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideUserDropdown();
      closeEl("authModal");
      closeEl("logoutModal");
    }
  });
});

window.getUser = getUser;
window.saveUser = saveUser;
