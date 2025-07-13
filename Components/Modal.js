export function setupModal (phases) {
    const modal   = document.getElementById("modal");
    const box     = document.getElementById("modalBox");
    const mI      = document.getElementById("mIcon");
    const mT      = document.getElementById("mTitle");
    const mS      = document.getElementById("mSub");
    const mC      = document.getElementById("mContent");
  
    const fb      = document.getElementById("fb");
    const msg     = document.getElementById("msg");
    const sendBtn = document.getElementById("sendBtn");
  
    let current = 0, selected = null;
    const notes = {};
  
    /* -------- ouverture -------- */
    function openModal (idx) {
      const p = phases[idx];
      current = idx; selected = null;
  
      /* couleur d’accent dynamique */
      document.documentElement.style.setProperty("--accent", p.accent);
      box.style.borderLeftColor = p.accent;
  
      /* contenu */
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
        <ul>${p.contacts.map(c => `<li class="flex items-center gap-2">${c.icon}<span>${c.label}</span></li>`).join("")}</ul>
      `;
  
      /* reset rating */
      document.querySelectorAll(".rating-btn").forEach(b => b.classList.remove("selected"));
      fb.value = ""; msg.classList.add("hidden");
      if (notes[idx]) { setRate(notes[idx].rate); fb.value = notes[idx].fb; }
  
      modal.classList.remove("hidden"); modal.classList.add("show");
      document.body.style.overflow = "hidden";
    }
  
    function closeModal () {
      modal.classList.remove("show"); modal.classList.add("hidden");
      document.body.style.overflow = "auto";
    }
  
    function setRate (r) {
      selected = r;
      document.querySelectorAll(".rating-btn").forEach(btn =>
        btn.classList.toggle("selected", btn.dataset.rating === r));
    }
  
    /* listeners */
    document.getElementById("closeBtn").onclick = closeModal;
    modal.onclick = e => { if (e.target === modal) closeModal(); };
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
  
    document.querySelectorAll(".rating-btn").forEach(btn =>
      btn.onclick = () => setRate(btn.dataset.rating));
    sendBtn.onclick = () => {
      if (!selected) return alert("Merci de choisir une évaluation.");
      notes[current] = { rate:selected, fb:fb.value.trim() };
      msg.classList.remove("hidden");
      setTimeout(() => msg.classList.add("hidden"), 2000);
    };
  
    /* écoute globale */
    window.addEventListener("openModal", e => openModal(e.detail.idx));
  }
  