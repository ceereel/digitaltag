// Services/AnimationServices.js

export function animateDots(dots, icons, currIconEl, currTextEl) {
    dots.forEach(dot => dot.classList.remove("bg-[var(--accent)]"));
  
    let i = 0;
    (function step() {
      dots[i].classList.add("bg-[var(--accent)]");
      currIconEl.textContent = icons[i];
      currTextEl.textContent = `Phase ${i + 1}`;
      if (++i < icons.length) setTimeout(step, 1000);
    })();
  }
  