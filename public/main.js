// /public/main.js
'use strict';

import './components/auth.js'; 

import { setupModal } from './components/Modal.js';
import { renderUsecaseFilter } from './services/UsecaseFilter.js';
import { animateJourney } from './services/AnimationServices.js';
import { ensureRouteView, showRouteView, hideRouteView } from './components/JourneyView.js';

document.addEventListener('DOMContentLoaded', () => {
  ensureRouteView();

  const moduleModal = document.getElementById('modal');
  if (moduleModal && moduleModal.closest('#homeView')) {
    document.body.appendChild(moduleModal);
  }

  const _showRoute = (opts = {}) => showRouteView(opts);
  const _hideRoute = () => hideRouteView();
  for (const [name, fn] of Object.entries({
    showRecommendedJourney: _showRoute,
    resetRecommendedJourney: _hideRoute,
    showJourneyModal: _showRoute,
    closeJourneyModal: _hideRoute,
  })) {
    try {
      Object.defineProperty(window, name, {
        value: fn, writable: false, configurable: true, enumerable: true
      });
    } catch {
      window[name] = fn;
    }
  }

  const legacyOverlay = document.getElementById('journeyModal');
  if (legacyOverlay) {
    legacyOverlay.classList.add('hidden');
    legacyOverlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('noscroll');
    const obs = new MutationObserver(() => {
      if (!legacyOverlay.classList.contains('hidden')) {
        legacyOverlay.classList.add('hidden');
        legacyOverlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('noscroll');
      }
    });
    obs.observe(legacyOverlay, { attributes: true, attributeFilter: ['class', 'style', 'aria-hidden'] });
  }

  const filterPhrase = document.getElementById('filterPhrase');
  if (filterPhrase) {
    filterPhrase.textContent = 'Sélectionnez un ou plusieurs cas d’usage pour construire votre parcours.';
  }

  try { setupModal(); } catch (e) { console.warn('setupModal optionnel :', e); }

  try {
    if (typeof animateJourney === 'function') {
      animateJourney();
      setInterval(animateJourney, 15000);
    }
  } catch (err) {
    console.warn('Animation ignorée :', err);
  }

  const filterBarContainer = document.getElementById('filterBar');
  if (filterBarContainer) {
    try {
      renderUsecaseFilter(filterBarContainer, filterPhrase);
      console.log('✅ UsecaseFilter initialisé.');
    } catch (err) {
      console.error('❌ Échec init UsecaseFilter :', err);
    }
  } else {
    console.warn('⚠️ Élément #filterBar introuvable.');
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideRouteView();
  });
});
