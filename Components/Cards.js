// Components/Cards.js
export function createAndAppendCards(phases){
    const container=document.getElementById("cardContainer");
    if(!container) return console.error("Container des cartes non trouvé.");
  
    container.innerHTML="";
  
    phases.forEach((phase,idx)=>{
      const card=document.createElement("div");
      card.className="phase-card";
      card.style.borderColor=phase.accent;
      card.dataset.idx=idx;
  
      card.innerHTML=`
        <div class="phase-header">
          <div class="phase-icon" style="color:${phase.accent}">${phase.ic}</div>
          <div class="phase-title">${phase.title}</div>
          <div class="phase-sub">${phase.sub}</div>
        </div>
        <div class="phase-back">
          <div class="section-title" style="color:${phase.accent}">🎯 Objectifs</div>
          <ul>${phase.objectifs.map(o=>`<li>${o}</li>`).join("")}</ul>
          <div class="section-title" style="color:${phase.accent}">🧩 Points de contact</div>
          <ul>${phase.contact.map(c=>`<li>${c}</li>`).join("")}</ul>
        </div>
      `;
  
      card.addEventListener("click",()=>window.dispatchEvent(
        new CustomEvent("openModal",{detail:{idx}})));
  
      container.appendChild(card);
    });
  }
  