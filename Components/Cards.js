// Components/Cards.js
export function createAndAppendCards(phases) {
    /* Conteneur des cartes */
    const container = document.getElementById("cardContainer");
    if (!container) return console.error("Container des cartes non trouvé.");
  
    container.innerHTML = ""; // reset
  
    phases.forEach((phase, idx) => {
      /* Sécurisation : s'assurer que l’on a bien des tableaux */
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
        </div>
  
        <div class="phase-back">
          <div class="section-title" style="color:${phase.accent}">🎯 Objectifs</div>
          <ul>${objectifs.map(o => `<li>${o}</li>`).join("")}</ul>
  
          <div class="section-title" style="color:${phase.accent}">🧩 Points de contact</div>
          <ul>${contacts.map(c =>
            `<li>${typeof c === "string" ? c : c.label}</li>`
          ).join("")}</ul>
        </div>
      `;
  
      /* Clic → dispatch custom event pour la modale */
      card.addEventListener("click", () => {
        window.dispatchEvent(new CustomEvent("openModal", { detail: { idx } }));
      });
  
      container.appendChild(card);
    });
  }
  