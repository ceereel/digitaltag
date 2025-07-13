export function createAndAppendCards (phases) {
    const container = document.getElementById("cardContainer");
    if (!container) return console.error("Container des cartes non trouvé.");
  
    container.innerHTML = "";
  
    phases.forEach((phase, idx) => {
      const card = document.createElement("div");
      card.className = "phase-card";
      card.dataset.idx = idx;
      card.style.setProperty("--accent", phase.accent);
      card.style.borderColor = phase.accent;
  
      card.innerHTML = `
        <div class="phase-header">
          <div class="phase-icon" style="color:${phase.accent}">${phase.ic}</div>
          <div class="phase-title">${phase.phaseLabel}</div>
          <div class="phase-sub">${phase.moduleLabel}</div>
          <div class="business-goal" style="background:${phase.accent}15;color:${phase.accent}">
            ${phase.objectiveSentence}
          </div>
        </div>
      `;
  
      card.addEventListener("click", () => {
        window.dispatchEvent(new CustomEvent("openModal", { detail: { idx } }));
      });
  
      container.appendChild(card);
    });
  }
  