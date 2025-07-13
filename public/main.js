import { getPhases }            from "./Services/PhaseService.js";
import { createAndAppendCards } from "../Components/Cards.js";
import { setupModal }           from "../Components/Modal.js";
import { saveUser, getUser }    from "../Components/Auth.js";

const phases = getPhases();
createAndAppendCards(phases);
setupModal(phases);

/* ----- Login rapide ----- */
const overlay = document.getElementById("loginOverlay");
const form    = document.getElementById("loginForm");

const existing = getUser();
if(existing){ overlay.classList.add("hidden"); }
else{
  form.addEventListener("submit", e=>{
    e.preventDefault();
    saveUser({
      org : document.getElementById("org").value.trim(),
      sect: document.getElementById("sect").value.trim(),
      mail: document.getElementById("mail").value.trim()
    });
    overlay.classList.add("hidden");
  });
}
