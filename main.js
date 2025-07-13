import { getPhases }            from "./Services/PhaseService.js";
import { createAndAppendCards } from "./Components/Cards.js";
import { setupModal }           from "./Components/Modal.js";
import { saveUser, getUser }    from "./Components/Auth.js";

/* ----- Phases & cartes ----- */
const phases = getPhases();
createAndAppendCards(phases);
setupModal(phases);

/* ----- Connexion rapide ----- */
const overlay = document.getElementById("loginOverlay");
const form    = document.getElementById("loginForm");

function finishedLogin(user){
  saveUser(user);
  overlay.classList.add("hidden");
}

/* Si déjà enregistré → on passe directement */
const existing = getUser();
if(existing){ overlay.classList.add("hidden"); }
else{
  form.addEventListener("submit", e=>{
    e.preventDefault();
    finishedLogin({
      org : document.getElementById("org").value.trim(),
      sect: document.getElementById("sect").value.trim(),
      mail: document.getElementById("mail").value.trim()
    });
  });
}
