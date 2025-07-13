// Components/Cards.js

export function createAndAppendCards(phases) {
    const container = document.getElementById("cardContainer");
    container.innerHTML = ""; // Nettoyer les anciennes cartes si besoin
  
    phases.forEach((phase, idx) => {
      const card = document.createElement("div");
      card.className = "flex-shrink-0 w-72 sm:w-80 bg-white shadow-lg rounded-xl border-l-8 overflow-hidden";
      card.style.borderLeftColor = phase.accent;
      card.innerHTML = `
        <div class="p-5">
          <div class="text-3xl mb-2">${phase.ic}</div>
          <h3 class="text-lg font-semibold text-gray-800 mb-1">${phase.title}</h3>
          <p class="text-sm text-gray-500 mb-4">${phase.sub}</p>
          <div class="text-sm text-gray-700 mb-2">
            <h4 class="font-semibold mb-1">🎯 Objectifs :</h4>
            <ul class="list-disc list-inside space-y-1">
              ${phase.objectifs.split("<br>").map(line => `<li>${line.trim()}</li>`).join("")}
            </ul>
          </div>
          <div class="text-sm text-gray-700 mb-4">
            <h4 class="font-semibold mb-1">🧩 Points de contact :</h4>
            <ul class="list-disc list-inside space-y-1">
              ${phase.contact.split("<br>").map(line => `<li>${line.trim()}</li>`).join("")}
            </ul>
          </div>
          <div class="text-center">
            <button class="details-btn px-4 py-2 mt-2 rounded bg-[${phase.accent}] text-white font-semibold text-sm hover:opacity-90 transition"
                    data-idx="${idx}">
              ➕ Détails
            </button>
          </div>
        </div>
      `;
  
      container.appendChild(card);
    });
  }
  