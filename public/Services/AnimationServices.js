export function animateJourney() {
  const dots   = document.querySelectorAll('.timeline-dot');
  const lines  = document.querySelectorAll('.connection-line');
  const gpBar  = document.getElementById('globalProgress');
  const pctTxt = document.getElementById('progressText');
  const icon   = document.getElementById('currentPhaseIcon');
  const label  = document.getElementById('currentPhaseText');
  const icons  = ['🧭','📊','🧩','🤖','📍'];

  if (!dots.length || !gpBar) return;

  dots.forEach(d => d.classList.remove('active'));
  lines.forEach(l => l.classList.remove('animate'));

  let delay = 0;
  icons.forEach((ico, i) => {
    setTimeout(() => {
      dots[i].classList.add('active');
      if (lines[i]) setTimeout(() => lines[i].classList.add('animate'), 300);

      if (i === icons.length - 1) {
        const cyclicLine  = document.getElementById('cyclicLine');
        const cyclicArrow = document.getElementById('cyclicArrow');
        cyclicLine?.classList.add('animate');
        cyclicArrow?.classList.add('animate');
      }

      const pct = ((i + 1) / icons.length) * 100;
      gpBar.style.width    = `${pct}%`;
      pctTxt.textContent   = `${Math.round(pct)}%`;
      icon.textContent     = ico;
      label.textContent    = `Phase ${i + 1}`;
    }, delay);
    delay += 1100;
  });
}
