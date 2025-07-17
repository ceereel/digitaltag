/* ------------------------------------------------------------------
   FilterService
   - centralise les règles de filtrage disponibles
   - renvoie la liste des phases à conserver selon le filtre choisi
------------------------------------------------------------------ */

import { getAll } from './PhaseService.js';

/**  Les filtres proposés dans la barre.
 *   id  : identifiant technique
 *   lbl : libellé affiché
 *   test: fonction qui reçoit (phase) et renvoie true/false
 */
const FILTERS = [
  {
    id  : 'all',
    lbl : 'Toutes',
    test: () => true
  },
  {
    id  : 'diagnostic',
    lbl : 'Diagnostic',
    test: p => p.id === 1
  },
  {
    id  : 'benchmark',
    lbl : 'Benchmark',
    test: p => p.id === 2
  },
  {
    id  : 'structuration',
    lbl : 'Structuration',
    test: p => p.id === 3
  },
  {
    id  : 'conseil',
    lbl : 'IA & Conseil',
    test: p => p.id === 4
  },
  {
    id  : 'roadmap',
    lbl : 'Feuille de route',
    test: p => p.id === 5
  }
];

/* ------------------------------------------------------------------ */
/*  API                                                               */
/* ------------------------------------------------------------------ */

/** Liste complète des filtres pour la UI */
export function getFilters () {
  return FILTERS.map(f => ({ id: f.id, lbl: f.lbl }));
}

/** Retourne les phases qui passent le filtre */
export function applyFilter (filterId) {
  const f = FILTERS.find(x => x.id === filterId) ?? FILTERS[0]; // défaut = all
  return getAll().filter(p => f.test(p));
}
