// /public/components/Modal.js
import { get, getAll } from '../services/PhaseService.js';

/* Réfs DOM (récupérées paresseusement pour éviter les races au bootstrap) */
function $refs() {
  return {
    modal:    document.getElementById('modal'),
    modalBox: document.getElementById('modalBox'),
    mIcon:    document.getElementById('mIcon'),
    mTitle:   document.getElementById('mTitle'),
    mSub:     document.getElementById('mSub'),
    mContent: document.getElementById('mContent'),
    closeBtn: document.getElementById('closeBtn'),
  };
}

/* Couleurs d'accent par phase (alignées avec Cards.js) */
const PHASE_ACCENTS = {
  1: '#0077d2', // Diagnostic
  2: '#ffb703', // Observatoire
  3: '#06d6a0', // Canevas
  4: '#9b5de5', // Agent IA
  5: '#ef476f', // Feuille de route
};

/* —————————————————————————————————————————————
   VUE 1 : FICHE DÉTAIL DU MODULE (contenu par défaut)
   (objectiveSentence volontairement NON affichée ici)
————————————————————————————————————————————— */
function renderDetailView(p) {
  const { modalBox, mIcon, mTitle, mSub, mContent } = $refs();

  // En-tête
  mIcon.textContent  = p.icon;
  mTitle.textContent = p.phaseLabel;
  mSub.textContent   = p.moduleLabel;

  // Accent visuel
  const accent = PHASE_ACCENTS[p.id] || '#0077d2';
  modalBox.style.borderTop = `8px solid ${accent}`;

  // Corps (sans objectiveSentence)
  mContent.innerHTML = `
    <section class="space-y-3 text-[0.92rem] leading-relaxed text-gray-700">
      <p>${p.phaseExplain}</p>
      <p>${p.moduleExplain}</p>

      <div class="mt-3">
        <h4 class="font-semibold mb-1 text-[#0077d2]">Fonctionnalités clés</h4>
        <ul class="list-disc list-inside space-y-1">
          ${p.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>

      <div class="mt-3">
        <h4 class="font-semibold mb-1 text-[#0077d2]">Points de contact</h4>
        <ul class="list-disc list-inside space-y-1">
          ${p.contacts.map(c => `<li>${c.icon} ${c.label}</li>`).join('')}
        </ul>
      </div>

      <div class="mt-5 flex flex-wrap gap-2 justify-end">
        <button id="showFeedbackBtn" class="btn-soft text-sm">💬 Donner mon appréciation</button>
        <button id="nextStepBtn" class="btn-validate text-sm">➡️ Étape suivante</button>
      </div>
    </section>
  `;

  // Actions
  const feedbackBtn = document.getElementById('showFeedbackBtn');
  const nextBtn     = document.getElementById('nextStepBtn');
  if (feedbackBtn) feedbackBtn.addEventListener('click', () => renderFeedbackView(p));
  if (nextBtn)     nextBtn.addEventListener('click', () => openNextPhase(p.id));
}

/* —————————————————————————————————————————————
   VUE 2 : FORMULAIRE DE FEEDBACK (ludique & détaillé)
————————————————————————————————————————————— */
function renderFeedbackView(p) {
  const { mTitle, mSub, mContent } = $refs();
  // Titre/ sous-titre conservés pour garder le contexte
  mTitle.textContent = `${p.phaseLabel} — Feedback`;
  mSub.textContent   = p.moduleLabel;

  mContent.innerHTML = `
    <form id="feedbackForm" class="space-y-5 text-[0.92rem] leading-relaxed text-gray-700">
      <!-- Aide -->
      <p class="text-gray-600 text-[0.88rem]">
        Merci de nous aider à améliorer le module. Vos réponses restent confidentielles.
      </p>

      <!-- 1. Pertinence -->
      <fieldset class="grid gap-2">
        <legend class="font-semibold">🎯 Pertinence pour vos besoins actuels</legend>
        <p class="text-xs text-gray-500">Dans quelle mesure ce module correspond à vos enjeux immédiats ?</p>
        <div class="flex gap-2 flex-wrap mt-1" role="group" aria-label="Pertinence">
          ${[1,2,3,4,5].map(v => `
            <label class="inline-flex items-center gap-1 px-2 py-1 border rounded cursor-pointer">
              <input type="radio" name="relevance_now" value="${v}" class="accent-[#0077d2]" ${v===3?'checked':''}/>
              <span>${'★'.repeat(v)}</span>
            </label>
          `).join('')}
        </div>
      </fieldset>

      <!-- 2. Adéquation maturité (slider) -->
      <fieldset>
        <legend class="font-semibold">🧭 Adéquation à votre niveau de maturité</legend>
        <p class="text-xs text-gray-500">Le module est-il “au bon niveau” pour votre organisation ?</p>
        <input id="maturity_fit" name="maturity_fit" type="range" min="1" max="5" value="3" class="w-full accent-[#0077d2] mt-1"/>
        <div class="flex justify-between text-[0.7rem] text-gray-500">
          <span>Trop bas</span><span>Juste</span><span>Trop avancé</span>
        </div>
      </fieldset>

      <!-- 3. Impact attendu (chips) -->
      <fieldset>
        <legend class="font-semibold">⚡ Impact attendu sur vos objectifs</legend>
        <p class="text-xs text-gray-500">Quel résultat attendez-vous à court/moyen terme ?</p>
        <div class="flex flex-wrap gap-2 mt-1">
          ${['Rapide', 'Modéré', 'Structurant', 'Transversal'].map((label,i)=>`
            <label class="inline-flex items-center gap-1 px-2 py-1 border rounded cursor-pointer">
              <input type="radio" name="expected_impact" value="${label}" class="accent-[#0077d2]" ${i===2?'checked':''}/>
              <span>${label}</span>
            </label>
          `).join('')}
        </div>
      </fieldset>

      <!-- 4. Facilité de mise en œuvre (émoticônes) -->
      <fieldset>
        <legend class="font-semibold">⚙️ Facilité de mise en œuvre</legend>
        <p class="text-xs text-gray-500">Ressources, temps, compétences nécessaires.</p>
        <div class="flex gap-2 mt-1">
          ${[
            {v:'1',t:'😵 Difficile'},
            {v:'2',t:'😕 Compliquée'},
            {v:'3',t:'😐 Gérable'},
            {v:'4',t:'🙂 Assez simple'},
            {v:'5',t:'😄 Facile'},
          ].map((o,i)=>`
            <label class="inline-flex items-center gap-1 px-2 py-1 border rounded cursor-pointer">
              <input type="radio" name="implementation_ease" value="${o.v}" class="accent-[#0077d2]" ${i===2?'checked':''}/>
              <span>${o.t}</span>
            </label>
          `).join('')}
        </div>
      </fieldset>

      <!-- 5. Complémentarité (checkbox chips) -->
      <fieldset>
        <legend class="font-semibold">🤝 Complémentarité avec les autres modules</legend>
        <p class="text-xs text-gray-500">Cochez les modules avec lesquels celui-ci s’imbrique bien.</p>
        <div class="flex flex-wrap gap-2 mt-1">
          ${getAll().map(ph => `
            <label class="inline-flex items-center gap-1 px-2 py-1 border rounded cursor-pointer">
              <input type="checkbox" name="complementarity" value="${ph.phaseLabel}" class="accent-[#0077d2]" ${ph.id!==p.id?'':'disabled'}/>
              <span>${ph.icon} ${ph.phaseLabel}</span>
            </label>
          `).join('')}
        </div>
      </fieldset>

      <!-- 6. Clarté des livrables (slider) -->
      <fieldset>
        <legend class="font-semibold">🧾 Clarté des livrables attendus</legend>
        <p class="text-xs text-gray-500">Exemples : exports, feuille de route, indicateurs…</p>
        <input id="deliverable_clarity" name="deliverable_clarity" type="range" min="1" max="5" value="3" class="w-full accent-[#0077d2] mt-1"/>
        <div class="flex justify-between text-[0.7rem] text-gray-500">
          <span>Floue</span><span>Claire</span>
        </div>
      </fieldset>

      <!-- 7. Priorité + Accompagnement + Délai (sélecteurs/boutons) -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <fieldset>
          <legend class="font-semibold">🚦 Priorité</legend>
          <select id="priority" name="priority" class="w-full text-sm p-2 border border-gray-300 rounded mt-1">
            <option value="Haute">Haute</option>
            <option value="Moyenne" selected>Moyenne</option>
            <option value="Basse">Basse</option>
          </select>
        </fieldset>
        <fieldset>
          <legend class="font-semibold">🧑‍🏫 Accompagnement</legend>
          <div class="flex flex-wrap gap-2 mt-1">
            ${['Aucun','Agent IA','Coaching','Les deux'].map((l,i)=>`
              <label class="inline-flex items-center gap-1 px-2 py-1 border rounded cursor-pointer">
                <input type="radio" name="support_needed" value="${l}" class="accent-[#0077d2]" ${i===0?'checked':''}/>
                <span>${l}</span>
              </label>
            `).join('')}
          </div>
        </fieldset>
        <fieldset>
          <legend class="font-semibold">⏱️ Délai pour démarrer</legend>
          <div class="flex flex-wrap gap-2 mt-1">
            ${['Immédiat','< 1 mois','1–3 mois','> 3 mois'].map((l,i)=>`
              <label class="inline-flex items-center gap-1 px-2 py-1 border rounded cursor-pointer">
                <input type="radio" name="time_to_start" value="${l}" class="accent-[#0077d2]" ${i===1?'checked':''}/>
                <span>${l}</span>
              </label>
            `).join('')}
          </div>
        </fieldset>
      </div>

      <!-- 8. NPS -->
      <fieldset>
        <legend class="font-semibold">❤️ Recommandation (NPS)</legend>
        <p class="text-xs text-gray-500">Dans quelle mesure recommanderiez-vous ce module à un collègue ? (0–10)</p>
        <div class="flex flex-wrap gap-1 mt-1">
          ${Array.from({length:11},(_,i)=>i).map(n=>`
            <label class="inline-flex items-center px-2 py-1 border rounded cursor-pointer text-[0.82rem]">
              <input type="radio" name="nps" value="${n}" class="accent-[#0077d2]" ${n===8?'checked':''}/>
              <span class="ml-1">${n}</span>
            </label>
          `).join('')}
        </div>
      </fieldset>

      <!-- 9. Commentaires -->
      <fieldset>
        <legend class="font-semibold">📝 Commentaires</legend>
        <p class="text-xs text-gray-500">Points bloquants, attentes, idées d’amélioration…</p>
        <textarea id="comment" name="comment" rows="3" class="w-full text-sm p-2 border border-gray-300 rounded mt-1" placeholder="Votre message"></textarea>
      </fieldset>

      <!-- Actions -->
      <div class="mt-4 flex flex-wrap justify-end gap-2">
        <button id="cancelFeedbackBtn" type="button" class="btn-soft text-sm">↩️ Revenir à la fiche</button>
        <button id="submitFeedbackBtn" type="submit" class="btn-validate text-sm">📨 Envoyer mon appréciation</button>
      </div>
    </form>
  `;

  // Boutons actions
  const cancelBtn = document.getElementById('cancelFeedbackBtn');
  if (cancelBtn) cancelBtn.addEventListener('click', () => renderDetailView(p));

  // Soumission
  const form = document.getElementById('feedbackForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Collecte des valeurs
      const FD = new FormData(form);
      const getVal = (name, def='') => FD.get(name) ?? def;
      const getAll = (name) => FD.getAll(name);

      const payload = {
        organisation:   'He-Arc',
        sector:         'Pédagogie',
        email:          'test@he-arc.ch',
        module:         p.moduleLabel,
        phase:          p.phaseLabel,

        relevance_now:       getVal('relevance_now','3'),
        maturity_fit:        getVal('maturity_fit','3'),
        expected_impact:     getVal('expected_impact','Structurant'),
        implementation_ease: getVal('implementation_ease','3'),
        complementarity:     getAll('complementarity'),    // tableau
        deliverable_clarity: getVal('deliverable_clarity','3'),
        priority:            getVal('priority','Moyenne'),
        support_needed:      getVal('support_needed','Aucun'),
        time_to_start:       getVal('time_to_start','< 1 mois'),
        nps:                 getVal('nps','8'),
        comment:             getVal('comment','')
      };

      try {
        const res = await fetch('/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          alert('Merci pour votre retour 🙏');
          closeModal();
        } else {
          alert("Erreur lors de l'envoi du feedback.");
        }
      } catch (err) {
        console.error('❌ Erreur fetch :', err);
        alert('Une erreur est survenue.');
      }
    });
  }
}

/* —————————————————————————————————————————————
   Navigation vers l’étape suivante
————————————————————————————————————————————— */
function openNextPhase(currentId) {
  const phases = getAll().sort((a,b) => a.id - b.id);
  const i = phases.findIndex(ph => ph.id === Number(currentId));
  if (i < 0) return;
  const next = phases[i + 1];
  if (next) openModal(next.id);
  else alert('✅ Vous êtes à la dernière étape.');
}

/* —————————————————————————————————————————————
   API PUBLIQUE
————————————————————————————————————————————— */
export function openModal(id) {
  const p = get(id);
  if (!p) return;
  const { modal } = $refs();
  if (!modal) return;

  renderDetailView(p);

  // Afficher la modale
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.classList.add('noscroll');
}

export function setupModal() {
  const { modal, closeBtn } = $refs();
  if (!modal) return;

  // Fermer (X)
  if (closeBtn && !closeBtn.dataset.bound) {
    closeBtn.dataset.bound = '1';
    closeBtn.addEventListener('click', closeModal);
  }

  // Fermer (Esc / overlay)
  if (!modal.dataset.bound) {
    modal.dataset.bound = '1';
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }
}

function closeModal() {
  const { modal } = $refs();
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.classList.remove('noscroll');
}

// Option compat globale
window.closeModal = closeModal;
