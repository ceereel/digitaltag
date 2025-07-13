// Components/Modal.js

export function setupModal(phases) {
    const modal = document.getElementById("modal");
    const box = document.getElementById("modalBox");
    const mI = document.getElementById("mIcon");
    const mT = document.getElementById("mTitle");
    const mS = document.getElementById("mSub");
    const mC = document.getElementById("mContent");
    const fb = document.getElementById("fb");
    const msg = document.getElementById("msg");
    const sendBtn = document.getElementById("sendBtn");
  
    let current = 0;
    let selected = null;
    let notes = {};
  
    function openModal(idx) {
      const p = phases[idx];
      current = idx;
      selected = null;
  
      document.documentElement.style.setProperty("--accent", p.accent);
      box.style.borderLeftColor = p.accent;
      mI.textContent = p.ic;
      mT.textContent = p.title;
      mS.textContent = p.sub;
      mC.innerHTML = `
        <div class="text-sm text-gray-700">
          <h4 class="text-base font-semibold text-[${p.accent}] mb-2">🎯 Objectifs</h4>
          <ul class="list-disc list-inside mb-4">
            ${p.objectifs.split("<br>").map(line => `<li>${line.trim()}</li>`).join("")}
          </ul>
          <h4 class="text-base font-semibold text-[${p.accent}] mb-2">🧩 Points de contact</h4>
          <ul class="list-disc list-inside">
            ${p.contact.split("<br>").map(line => `<li>${line.trim()}</li>`).join("")}
          </ul>
        </div>
      `;
  
      document.querySelectorAll(".rating-btn").forEach(b => b.classList.remove("selected"));
      fb.value = "";
      msg.classList.add("hidden");
  
      if (notes[idx]) {
        setRate(notes[idx].rate);
        fb.value = notes[idx].fb;
      }
  
      modal.classList.add("show");
      document.body.style.overflow = "hidden";
    }
  
    function closeModal() {
      modal.classList.remove("show");
      document.body.style.overflow = "auto";
    }
  
    function setRate(rating) {
      selected = rating;
      document.querySelectorAll(".rating-btn").forEach(btn =>
        btn.classList.toggle("selected", btn.dataset.rating === rating)
      );
    }
  
    document.getElementById("closeBtn").onclick = closeModal;
    modal.onclick = e => { if (e.target === modal) closeModal(); };
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
  
    document.querySelectorAll(".rating-btn").forEach(btn =>
      btn.onclick = () => setRate(btn.dataset.rating)
    );
  
    sendBtn.onclick = () => {
      if (!selected) return alert("Merci de choisir une évaluation.");
      notes[current] = {
        rate: selected,
        fb: fb.value.trim()
      };
      msg.classList.remove("hidden");
      setTimeout(() => msg.classList.add("hidden"), 2000);
    };
  
    // Activation via bouton "Détails"
    document.addEventListener("click", e => {
      const btn = e.target.closest(".details-btn");
      if (btn) {
        const idx = parseInt(btn.dataset.idx);
        if (!isNaN(idx)) openModal(idx);
      }
    });
  }
  