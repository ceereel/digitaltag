// Components/Modal.js
export function setupModal(phases){
    const modal   = document.getElementById("modal");
    const box     = document.getElementById("modalBox");
    const mIcon   = document.getElementById("mIcon");
    const mTitle  = document.getElementById("mTitle");
    const mSub    = document.getElementById("mSub");
    const mBody   = document.getElementById("mContent");
    const fb      = document.getElementById("fb");
    const msg     = document.getElementById("msg");
    const sendBtn = document.getElementById("sendBtn");
  
    let current=0, selected=null;
    const notes={};
  
    /* ---------- ouverture ---------- */
    function openModal(idx){
      const p = phases[idx];
      current = idx; selected = null;
  
      document.documentElement.style.setProperty("--accent",p.accent);
      box.style.borderLeftColor = p.accent;
  
      mIcon.textContent = p.ic;
      mTitle.textContent= p.title;
      mSub.textContent  = p.sub;
  
      /* Contenu : Contexte puis Module */
      mBody.innerHTML = `
        <section class="space-y-3">
          <h4 class="font-semibold text-[${p.accent}]">Contexte de la phase</h4>
          <p>${p.context}</p>
        </section>
  
        <section class="space-y-3 mt-6">
          <h4 class="font-semibold text-[${p.accent}]">Module Digital TAG</h4>
          <p>${p.module}</p>
        </section>
  
        <section class="space-y-3 mt-6">
          <h4 class="font-semibold text-[${p.accent}]">🎯 Objectifs</h4>
          <ul class="list-disc ml-5">
            ${p.objectifs.map(o=>`<li>${o}</li>`).join("")}
          </ul>
        </section>
  
        <section class="space-y-3 mt-6">
          <h4 class="font-semibold text-[${p.accent}]">🧩 Points de contact</h4>
          <ul class="list-disc ml-5">
            ${p.contacts.map(c=>`<li>${c}</li>`).join("")}
          </ul>
        </section>
      `;
  
      /* reset évaluation */
      document.querySelectorAll(".rating-btn").forEach(b=>b.classList.remove("selected"));
      fb.value=""; msg.classList.add("hidden");
      if(notes[idx]){ setRate(notes[idx].rate); fb.value=notes[idx].fb; }
  
      modal.classList.add("show"); modal.classList.remove("hidden");
      document.body.style.overflow="hidden";
    }
  
    /* ---------- fermeture ---------- */
    function closeModal(){
      modal.classList.remove("show"); modal.classList.add("hidden");
      document.body.style.overflow="auto";
    }
  
    /* ---------- rating ---------- */
    function setRate(r){
      selected=r;
      document.querySelectorAll(".rating-btn")
        .forEach(btn=>btn.classList.toggle("selected",btn.dataset.rating===r));
    }
    document.querySelectorAll(".rating-btn")
      .forEach(btn=>btn.onclick=()=>setRate(btn.dataset.rating));
  
    sendBtn.onclick=()=>{
      if(!selected) return alert("Veuillez choisir une évaluation.");
      notes[current]={rate:selected,fb:fb.value.trim()};
      msg.classList.remove("hidden");
      setTimeout(()=>msg.classList.add("hidden"),2000);
    };
  
    /* ---------- listeners globaux ---------- */
    document.getElementById("closeBtn").onclick=closeModal;
    modal.onclick=e=>{if(e.target===modal)closeModal();};
    document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();});
    window.addEventListener("openModal",e=>openModal(e.detail.idx));
  }
  