/* Services/AnimationServices.js ---------------------------------- */
/* Gère :                                                         */
/*  – la barre de progression globale                              */
/*  – l’animation des points de la timeline et des lignes SVG      */

const icons = ['🧭', '📊', '🧩', '🤖', '📍'];   // 5 phases

export function animateJourney () {

  /* ⚠️  On (re)récupère les éléments à CHAQUE appel,
         ainsi ils existent même si le DOM vient d’être injecté dynamiquement. */
  const dots        = document.querySelectorAll('.timeline-dot');
  const lines       = document.querySelectorAll('.connection-line');
  const cyclicLine  = document.getElementById('cyclicLine');
  const cyclicArrow = document.getElementById('cyclicArrow');
  const gpBar       = document.getElementById('globalProgress');
  const pctTxt      = document.getElementById('progressText');
  const iconEl      = document.getElementById('currentPhaseIcon');
  const labelEl     = document.getElementById('currentPhaseText');

  /* 1 ░░ Reset */
  dots .forEach(d => d.classList.remove('active'));
  lines.forEach(l => l.classList.remove('animate'));
  cyclicLine ?.classList.remove('animate');
  cyclicArrow?.classList.remove('animate');

  /* 2 ░░ Animation incrémentale */
  let delay = 0;
  icons.forEach((ico, i) => {

    setTimeout(() => {
      /* Point de la timeline */
      dots[i]?.classList.add('active');

      /* Ligne de connexion – n’existe pas forcément pour la dernière itération */
      if (lines[i]) {
        setTimeout(() => lines[i].classList.add('animate'), 300);
      }

      /* Dernière phase → ligne cyclique */
      if (i === icons.length - 1) {
        cyclicLine ?.classList.add('animate');
        cyclicArrow?.classList.add('animate');
      }

      /* Barre de progression & badge courant */
      const pct = ((i + 1) / icons.length) * 100;
      if (gpBar)  gpBar.style.width = pct + '%';
      if (pctTxt) pctTxt.textContent = Math.round(pct) + '%';
      if (iconEl) iconEl.textContent = ico;
      if (labelEl) labelEl.textContent = `Phase ${i + 1}`;

    }, delay);

    delay += 1100;          /* ≈1,1 s entre chaque étape */
  });
}
