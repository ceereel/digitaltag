// Components/Modal.js
export function setupModal(phases){
    const modal=document.getElementById("modal");
    const box  =document.getElementById("modalBox");
    const mI   =document.getElementById("mIcon");
    const mT   =document.getElementById("mTitle");
    const mS   =document.getElementById("mSub");
    const mC   =document.getElementById("mContent");
    const fb   =document.getElementById("fb");
    const msg  =document.getElementById("msg");
    const send =document.getElementById("sendBtn");
  
    let cur=0, sel=null;
    const notes={};
  
    function open(idx){
      const p=phases[idx];cur=idx;sel=null;
  
      document.documentElement.style.setProperty("--accent",p.accent);
      box.style.borderLeftColor=p.accent;
      mI.textContent=p.ic; mT.textContent=p.title; mS.textContent=p.sub;
  
      mC.innerHTML=`
        <p>${p.content}</p>
        <div class="section-title" style="color:${p.accent}">🎯 Objectifs</div>
        <ul>${p.objectifs.map(o=>`<li>${o}</li>`).join("")}</ul>
        <div class="section-title" style="color:${p.accent}">🧩 Points de contact</div>
        <ul>${p.contact.map(c=>`<li>${c}</li>`).join("")}</ul>
      `;
  
      document.querySelectorAll(".rating-btn").forEach(b=>b.classList.remove("selected"));
      fb.value=""; msg.classList.add("hidden");
      if(notes[idx]){setRate(notes[idx].rate);fb.value=notes[idx].fb;}
  
      modal.classList.remove("hidden");modal.classList.add("show");
      document.body.style.overflow="hidden";
    }
    function close(){
      modal.classList.remove("show");modal.classList.add("hidden");
      document.body.style.overflow="auto";
    }
    function setRate(r){
      sel=r;
      document.querySelectorAll(".rating-btn").forEach(b=>
        b.classList.toggle("selected",b.dataset.rating===r));
    }
  
    document.getElementById("closeBtn").onclick=close;
    modal.onclick=e=>{if(e.target===modal)close();};
    document.addEventListener("keydown",e=>{if(e.key==="Escape")close();});
    document.querySelectorAll(".rating-btn").forEach(btn=>btn.onclick=()=>setRate(btn.dataset.rating));
    send.onclick=()=>{
      if(!sel) return alert("Merci de choisir une évaluation.");
      notes[cur]={rate:sel,fb:fb.value.trim()};
      msg.classList.remove("hidden");
      setTimeout(()=>msg.classList.add("hidden"),2000);
    };
  
    window.addEventListener("openModal",e=>open(e.detail.idx));
  }
  