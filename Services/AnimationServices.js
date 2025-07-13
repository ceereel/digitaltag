// Services/AnimationServices.js

export function animatePhaseIndicator(phases) {
    const dots = [...document.querySelectorAll(".indicator-dot")];
    const icon = document.getElementById("currIcon");
    const text = document.getElementById("currText");
  
    if (!dots.length || !icon || !text) return;
  
    dots.forEach(dot => dot.classList.remove("bg-[var(--accent)]"));
  
    let index = 0;
    const stepThrough = () => {
      dots.forEach(dot => dot.classList.remove("bg-[var(--accent)]"));
      dots[index].classList.add("bg-[var(--accent)]");
      icon.textContent = phases[index].ic;
      text.textContent = `Phase ${index + 1}`;
      index = (index + 1) % phases.length;
    };
  
    stepThrough();
    setInterval(stepThrough, 15000);
  }
  