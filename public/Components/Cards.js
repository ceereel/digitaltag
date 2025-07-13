export function createAndAppendCards(phases) {
    const container = document.getElementById("cardContainer");
    if (!container) return console.error("cardContainer manquant");
    container.innerHTML = "";
  
    phases.forEach((p, idx) => {
      const card = document.createElement("div");
      card.className = "phase-card";
      card.dataset.idx = idx;
      card.style.setProperty("--accent", p.accent);
      card.style.borderColor = p.accent;
  
      card.innerHTML = `
        <div class="phase-header">
          <div class="phase-icon" style="color:${p.accent}">${p.ic}</div>
          <div class="phase-title">${p.phaseLabel}</div>
          <div class="phase-sub">${p.moduleLabel}</div>
          <div class="business-goal" style="background:${p.accent}15;color:${p.accent}">
            ${p.objectiveSentence}
          </div>
        </div>
      `;
      card.addEventListener("click", () =>
        window.dispatchEvent(new CustomEvent("openModal", { detail: { idx } }))
      );
      container.appendChild(card);
    });
  }
  