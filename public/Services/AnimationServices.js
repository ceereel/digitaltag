/* Anime la timeline _si_ elle existe dans le DOM ----------------------- */

let active = false;

const dots  = document.querySelectorAll('.timeline-dot');
const lines = document.querySelectorAll('.connection-line');
const bar   = document.getElementById('globalProgress');
const pct   = document.getElementById('progressText');
const cLine = document.getElementById('cyclicLine');
const cArr  = document.getElementById('cyclicArrow');

if (dots.length && lines.length && bar && pct) active = true;

export function animateJourney () {
  if (!active) return;                   // rien à faire

  dots.forEach(d => d.classList.remove('active'));
  lines.forEach(l => l.classList.remove('animate'));

  let delay = 0;
  dots.forEach((dot, i) => {
    setTimeout(() => {
      dot.classList.add('active');
      lines[i] && lines[i].classList.add('animate');

      const ratio = (i + 1) / dots.length * 100;
      bar.style.width = ratio + '%';
      pct.textContent = Math.round(ratio) + '%';

      if (i === dots.length - 1 && cLine && cArr) {
        cLine.classList.add('animate');
        cArr .classList.add('animate');
      }
    }, delay);
    delay += 1100;
  });
}
