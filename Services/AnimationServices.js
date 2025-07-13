// Services/AnimationServices.js

export function animatePhaseIndicator(phases) {
    const dots = [...document.querySelectorAll('.timeline-dot')];
    const icons = phases.map(p => p.ic);
    const currIcon = document.getElementById('currIcon');
    const currText = document.getElementById('currText');
  
    function stepThrough(i = 0) {
      dots.forEach(d => d.classList.remove('active'));
      dots[i].classList.add('active');
      currIcon.textContent = icons[i];
      currText.textContent = `Phase ${i + 1}`;
      if (i + 1 < phases.length) {
        setTimeout(() => stepThrough(i + 1), 1200);
      }
    }
  
    stepThrough();
    setInterval(stepThrough, 15000);
  }
  