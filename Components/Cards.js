// Components/Cards.js
export function createAndAppendCards(phases){
    const container = document.getElementById("cardContainer");
    if(!container) return console.error("Container des cartes non trouvé.");
  
    container.innerHTML = "";
  
    phases.forEach((phase,idx)=>{
      const card=document.createElement("div");
      card.className="phase-card";
      card.style.borderColor=phase.accent;
      card.style.setProperty("--accent",phase.accent); // var CSS locale
      card.dataset.idx=idx;
  
      /* Face avant uniquement */
      card.innerHTML=`
        <div class="phase-header">
          <div class="phase-icon" style="color:${phase.accent}">${phase.ic}</div>
          <div class="phase-title">${phase.title}</div>
          <div class="phase-sub">${phase.sub}</div>
  
          <div class="business-goal">
            « ${phase.objectiveSentence} »
          </div>
        </div>
      `;
  
      /* Clic -> custom event => Modal */
      card.addEventListener("click",()=>window.dispatchEvent(
        new CustomEvent("openModal",{detail:{idx}})
      ));
  
      container.appendChild(card);
    });
  }
  