/* ------------------------------------------------------------------
   FilterBar – fabrique la barre de filtres + relaie les évènements
------------------------------------------------------------------ */

import { getFilters } from '../Services/FilterService.js';

/**
 *  container     : élément DOM où injecter la barre
 *  onFilterChange: callback (filterId) => void
 */
export function renderFilterBar (container, onFilterChange) {
  container.innerHTML = '';                        // reset éventuel
  const wrapper = document.createElement('div');
  wrapper.className =
    'flex flex-wrap justify-center gap-2 mb-8';

  /* radio group */
  const name = 'phase-filter';
  getFilters().forEach(f => {
    const lbl        = document.createElement('label');
    lbl.className    =
      'inline-flex items-center gap-2 px-4 py-2 rounded-full ' +
      'cursor-pointer bg-gray-100 hover:bg-gray-200 text-sm';
    const radio      = document.createElement('input');
    radio.type       = 'radio';
    radio.name       = name;
    radio.value      = f.id;
    radio.className  = 'form-radio text-[#0077d2] focus:ring-0';
    if (f.id === 'all') radio.checked = true;

    radio.addEventListener('change', () => onFilterChange(f.id));
    lbl.appendChild(radio);
    lbl.append(f.lbl);

    wrapper.appendChild(lbl);
  });

  container.appendChild(wrapper);
}
