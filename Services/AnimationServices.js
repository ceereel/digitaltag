export function animatePhaseIndicator(phases) {
    const dots = [...document.querySelectorAll(".indicator-dot")];
    const icon = document.getElementById("currIcon");
    const text = document.getElementById("currText");
    if (!dots.length || !icon || !text) return;

    let index = 0;
    const stepThrough = () => {
        dots.forEach(d => d.classList.remove("bg-[var(--accent)]"));
        dots[index].classList.add("bg-[var(--accent)]"); // Use corporate accent color
        icon.textContent = phases[index].ic;
        text.textContent = `${phases[index].phaseLabel}`;
        index = (index + 1) % phases.length;
    };
    stepThrough();
    setInterval(stepThrough, 15000);
}
