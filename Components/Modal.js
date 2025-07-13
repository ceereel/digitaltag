/* ------------------------------------------------------------------
   MODAL : ouverture, affichage du contenu, gestion de l’évaluation
   ------------------------------------------------------------------ */
   import { getUser } from "../Components/Auth.js";
   const API = 'https://user-journey-backend.onrender.com/feedback';

   /**
    * Initialise la logique modale et enregistre tous les écouteurs.
    * @param {Array} phases  Tableau retourné par getPhases()
    */
   export function setupModal(phases) {
     /* ------------ Références DOM ------------ */
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

     const API = 'https://digitaltag-feedback-api.onrender.com/feedback';

fetch(API, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)        // { org, sect, mail, module, rating, comment }
}).then(()=> showSuccess())
  .catch(()=> alert("Envoi impossible – réessayez plus tard"));
   
     /* ------------ État interne ------------ */
     let current  = 0;       // index de la phase affichée
     let selected = null;    // emoji sélectionnée
     const notes  = {};      // { phaseIndex : { rate, fb } }
   
     /* ================================================================ */
     /* ==========  OUVERTURE  ========================================= */
     /* ================================================================ */
     function openModal(idx) {
       const p = phases[idx];
       current = idx;
       selected = null;
   
       /* Accent dynamique */
       document.documentElement.style.setProperty("--accent", p.accent);
       box.style.borderLeftColor = p.accent;
   
       /* Contenu (phase + module) */
       mI.textContent = p.ic;
       mT.textContent = p.phaseLabel;
       mS.textContent = p.moduleLabel;
   
       /* Corps : phase → module → fonctionnalités → points de contact  */
       mC.innerHTML = `
         <h4>${p.phaseLabel}</h4>
         <p>${p.phaseExplain}</p>
   
         <h4>${p.moduleLabel}</h4>
         <p>${p.moduleExplain}</p>
   
         <h4>Fonctionnalités principales</h4>
         <ul>
           ${p.features.map(f => `<li>${f}</li>`).join("")}
         </ul>
   
         <h4>Points de contact</h4>
         <ul class="space-y-1">
           ${p.contacts.map(c =>
             `<li class="flex items-center gap-2">${c.icon}<span>${c.label}</span></li>`
           ).join("")}
         </ul>
       `;
   
       /* Reset évaluation */
       ratingBtns.forEach(b => b.classList.remove("selected"));
       fb.value = "";
       msg.classList.add("hidden");
   
       /* Valeurs précédemment saisies → restauration éventuelle */
       if (notes[idx]) {
         setRate(notes[idx].rate);
         fb.value = notes[idx].fb;
       }
   
       /* Affichage */
       modal.classList.remove("hidden");
       modal.classList.add("show");
       document.body.style.overflow = "hidden";
     }
   
     /* ================================================================ */
     /* ==========  FERMETURE  ========================================= */
     /* ================================================================ */
     function closeModal() {
       modal.classList.add("hidden");
       modal.classList.remove("show");
       document.body.style.overflow = "auto";
     }
   
     /* ================================================================ */
     /* ==========  ÉVALUATION  ======================================== */
     /* ================================================================ */
     function setRate(icon) {
       selected = icon;
       ratingBtns.forEach(btn =>
         btn.classList.toggle("selected", btn.dataset.rating === icon)
       );
     }
   
     /* ---------------- Envoi du mail ---------------- */
     function sendEvaluation() {
       if (!selected) return alert("Sélectionnez une émoticône.");
   
       const user = getUser();
       if (!user) return alert("Utilisateur non identifié (veuillez vous connecter).");
   
       const p = phases[current];
   
       const body = [
         `Phase / Module : ${p.phaseLabel} – ${p.moduleLabel}`,
         `Organisation   : ${user.org}`,
         `Secteur        : ${user.sect}`,
         `Mail           : ${user.mail}`,
         `Émoji          : ${selected}`,
         `Commentaire    : ${fb.value.trim() || "—"}`
       ].join("\n");
   
       /* mailto prêt à ouvrir le client courrier */
       const mailto = `mailto:cyrill.gysin@he-ar.ch`
                    + `?subject=Feedback%20${encodeURIComponent(p.moduleLabel)}`
                    + `&body=${encodeURIComponent(body)}`;
   
       window.location.href = mailto;
   
       /* Feedback visuel + sauvegarde */
       notes[current] = { rate: selected, fb: fb.value.trim() };
       msg.classList.remove("hidden");
     }
   
     /* ================================================================ */
     /* ==========  LISTENERS  ========================================= */
     /* ================================================================ */
   
     /* Ouverture (depuis une carte) */
     window.addEventListener("openModal", e => openModal(e.detail.idx));
   
     /* Fermeture */
     document.getElementById("closeBtn").addEventListener("click", closeModal);
     modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
     document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
   
     /* Sélection d'emoji */
     ratingBtns.forEach(btn =>
       btn.addEventListener("click", () => setRate(btn.dataset.rating))
     );
   
     /* Envoi */
     sendBtn.onclick = async ()=> {
        if(!selected)          return alert('Choisissez une émoticône');
        if(!org.value.trim())  return alert('Renseignez l’organisation');
        if(!sector.value.trim()) return alert('Renseignez le secteur');
        if(!emailOk(mail.value)) return alert('Email invalide');
      
        try{
          await sendEvaluation({
            phase   : p.phaseLabel,
            module  : p.moduleLabel,
            organisation: org.value.trim(),
            sector  : sector.value.trim(),
            email   : mail.value.trim(),
            rating  : selected,
            comment : fb.value.trim()
          });
          msg.textContent = '✅ Évaluation enregistrée !';
          msg.classList.remove('hidden');
        }catch(e){
          msg.textContent = '❌ Erreur d’envoi – réessayez';
          msg.classList.remove('hidden');
        }
      };
   }
   