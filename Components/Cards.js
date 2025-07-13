// Components/Cards.js
export function createAndAppendCards(phases) {
    const container = document.getElementById("cardContainer");
    if (!container) return console.error("Container des cartes non trouvé.");
  
    container.innerHTML = "";
  
    phases.forEach((phase, idx) => {
      /* Sécurisation des tableaux */
      const objectifs = Array.isArray(phase.objectifs)
        ? phase.objectifs
        : (phase.objectifs || "").split("<br>").map(t => t.trim()).filter(Boolean);
  
      const contacts = Array.isArray(phase.contacts)
        ? phase.contacts
        : (phase.contacts || []).map(t => ({ label: t, text: "" }));
  
      /* Carte */
      const card = document.createElement("div");
      card.className = "phase-card";
      card.style.borderColor = phase.accent;
      card.dataset.idx = idx;
  
      card.innerHTML = `
        <div class="phase-header">
          <div class="phase-icon" style="color:${phase.accent}">${phase.ic}</div>
          <div class="phase-title">${phase.title}</div>
          <div class="phase-sub">${phase.sub}</div>
          <div class="business-goal italic text-sm mt-2 text-gray-600">« ${phase.objectiveSentence} »</div>
        </div>
      `;
  
      /* Ouverture modale */
      card.addEventListener("click", () => {
        window.dispatchEvent(new CustomEvent("openModal", { detail: { idx } }));
      });
  
      container.appendChild(card);
    });
  }
  