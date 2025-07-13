// Components/Cards.js

export function createAndAppendCards(phases) {
    const wheel = document.getElementById("wheel");
    if (!wheel || !phases) return;
  
    wheel.innerHTML = ""; // Nettoyage
  
    // Conteneur horizontal scrollable
    wheel.className = "flex overflow-x-auto space-x-6 px-4 py-4 snap-x";
    wheel.style.scrollSnapType = "x mandatory";
  
    phases.forEach((p, i) => {
      const card = document.createElement("div");
      card.className = "card group snap-start flex-shrink-0 w-72 p-4 rounded-xl shadow-md transition-transform duration-300 bg-white hover:shadow-lg";
      card.style.borderLeft = `6px solid ${p.accent}`;
  
      card.innerHTML = `
        <div class="flex items-center mb-2">
          <div class="text-2xl mr-3">${p.ic}</div>
          <div>
            <div class="font-semibold text-sm text-gray-700">Phase ${i + 1}</div>
            <div class="text-xs text-gray-500">${p.sub}</div>
          </div>
        </div>
        <div class="text-xs text-gray-600 mb-2">
          <span class="font-semibold text-gray-700">🎯 Objectifs :</span>
          <ul class="list-disc list-inside mt-1">
            ${p.objectifs.split("<br>").map(line => `<li>${line.trim()}</li>`).join("")}
          </ul>
        </div>
        <div class="text-xs text-gray-600 mb-4">
          <span class="font-semibold text-gray-700">🧩 Points de contact :</span>
          <ul class="list-disc list-inside mt-1">
            ${p.contact.split("<br>").map(line => `<li>${line.trim()}</li>`).join("")}
          </ul>
        </div>
        <div class="text-right">
          <button data-idx="${i}" class="details-btn text-sm font-semibold text-white px-3 py-1 rounded bg-[${p.accent}] hover:bg-opacity-90 transition">Détails</button>
        </div>
      `;
  
      wheel.appendChild(card);
    });
  }
  