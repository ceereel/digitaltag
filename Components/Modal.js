// Components/Modal.js
export function setupModal(phases) {
    /* Raccourcis DOM */
    const modal   = document.getElementById("modal");
    const box     = document.getElementById("modalBox");
    const mI      = document.getElementById("mIcon");
    const mT      = document.getElementById("mTitle");
    const mS      = document.getElementById("mSub");
    const mC      = document.getElementById("mContent");
    const fb      = document.getElementById("fb");
    const msg     = document.getElementById("msg");
    const sendBtn = document.getElementById("sendBtn");
    const ratingButtons = [...document.querySelectorAll(".rating-btn")];
  
    let current   = 0;
    let selected  = null;
    const notes   = {};
  
    /* ------- ouverture ------- */
    function openModal(idx){
      const p = phases[idx];
      current  = idx;
      selected = null;
  
      /* Palette dynamique */
      document.documentElement.style.setProperty("--accent", p.accent);
      box.style.borderLeftColor = p.accent;
  
      /* Contenu header */
      mI.textContent = p.ic;
      mT.textContent = p.title;
      mS.textContent = p.sub;
  
      /* Corps de texte */
      mC.innerHTML = `
      <p class="mb-4">${p.desc}</p>
    
      <h4 class="section-title" style="color:${p.accent}">Objectifs métier clés</h4>
      <ul class="list-disc ml-5 mb-6">${p.objectifs.map(o=>`<li>${o}</li>`).join("")}</ul>
    
      <h4 class="section-title" style="color:${p.accent}">Points de contact</h4>
      <ul class="contact-list">
        ${p.contacts.map(c=>`
          <li class="contact-item">
            <span class="contact-icon">${c.icon}</span>
            <span>
              <strong>${c.label}</strong><br>
              <span class="contact-text">${c.text}</span>
            </span>
          </li>`).join("")}
      </ul>
    `;
  
      /* Reset évaluation */
      ratingButtons.forEach(b=>b.classList.remove("selected"));
      fb.value=""; msg.classList.add("hidden");
      if(notes[idx]){ setRate(notes[idx].rate); fb.value=notes[idx].fb; }
  
      /* Affichage */
      modal.classList.remove("hidden"); modal.classList.add("show");
      document.body.style.overflow="hidden";
    }
  
    /* ------- fermeture ------- */
    function closeModal(){
      modal.classList.remove("show");
      setTimeout(()=>modal.classList.add("hidden"),300);
      document.body.style.overflow="auto";
    }
  
    /* ------- notation ------- */
    function setRate(r){
      selected=r;
      ratingButtons.forEach(b=>b.classList.toggle("selected",b.dataset.rating===r));
    }
  
    /* --- listeners globaux --- */
    document.getElementById("closeBtn").onclick=closeModal;
    modal.onclick = e=>{ if(e.target===modal) closeModal(); };
    document.addEventListener("keydown",e=>{ if(e.key==="Escape") closeModal(); });
  
    ratingButtons.forEach(btn=>btn.onclick=()=>setRate(btn.dataset.rating));
    sendBtn.onclick=()=>{
      if(!selected) return alert("Merci de choisir une évaluation.");
      notes[current]={rate:selected,fb:fb.value.trim()};
      msg.classList.remove("hidden");
      setTimeout(()=>msg.classList.add("hidden"),2000);
    };
  
    /* --- écoute ouverture depuis carte --- */
    window.addEventListener("openModal",e=>openModal(e.detail.idx));
  }
  