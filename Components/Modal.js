import { getUser }              from "../Components/Auth.js";
import { sendEvaluation }       from "../Services/Api.js";

export function setupModal(phases) {
  /* refs DOM */
  const modal   = document.getElementById("modal");
  const box     = document.getElementById("modalBox");
  const mI      = document.getElementById("mIcon");
  const mT      = document.getElementById("mTitle");
  const mS      = document.getElementById("mSub");
  const mC      = document.getElementById("mContent");
  const fb      = document.getElementById("fb");
  const msg     = document.getElementById("msg");
  const sendBtn = document.getElementById("sendBtn");
  const ratingBtns = [...document.querySelectorAll(".rating-btn")];

  let current  = 0;
  let selected = null;

  /* ---------- ouverture ---------- */
  function openModal(idx) {
    const p = phases[idx];
    current = idx; selected = null;

    document.documentElement.style.setProperty("--accent", p.accent);
    box.style.borderLeftColor = p.accent;

    mI.textContent = p.ic;
    mT.textContent = p.phaseLabel;
    mS.textContent = p.moduleLabel;

    mC.innerHTML = `
      <h4>${p.phaseLabel}</h4>
      <p>${p.phaseExplain}</p>

      <h4>${p.moduleLabel}</h4>
      <p>${p.moduleExplain}</p>

      <h4>Fonctionnalités principales</h4>
      <ul>${p.features.map(f => `<li>${f}</li>`).join("")}</ul>

      <h4>Points de contact</h4>
      <ul class="space-y-1">
        ${p.contacts.map(c => `<li class="flex items-center gap-2">${c.icon}<span>${c.label}</span></li>`).join("")}
      </ul>
    `;

    ratingBtns.forEach(b => b.classList.remove("selected"));
    fb.value = ""; msg.classList.add("hidden");

    modal.classList.remove("hidden"); modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }
  window.addEventListener("openModal", e => openModal(e.detail.idx));

  /* ---------- fermeture ---------- */
  function closeModal(){
    modal.classList.add("hidden"); modal.classList.remove("show");
    document.body.style.overflow = "auto";
  }
  document.getElementById("closeBtn").onclick = closeModal;
  modal.onclick  = e => { if (e.target === modal) closeModal(); };
  document.addEventListener("keydown", e => { if (e.key==="Escape") closeModal(); });

  /* ---------- rating ---------- */
  ratingBtns.forEach(btn =>
    btn.onclick = () => {
      selected = btn.dataset.rating;
      ratingBtns.forEach(b=>b.classList.toggle("selected",b===btn));
    });

  /* ---------- envoi ---------- */
  sendBtn.onclick = async () => {
    if(!selected) return alert("Choisissez une émoticône.");

    const user = getUser();
    if(!user) return alert("Veuillez d’abord vous connecter.");

    const payload = {
      ...user,
      module : phases[current].moduleLabel,
      rating : selected,
      comment: fb.value.trim()
    };

    try{
      await sendEvaluation(payload);
      msg.textContent = "✅ Merci, évaluation enregistrée !";
      msg.classList.remove("hidden");
    }catch{
      msg.textContent = "❌ Erreur d’envoi – réessayez plus tard";
      msg.classList.remove("hidden");
    }
  };
}
