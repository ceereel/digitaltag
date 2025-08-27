// /public/components/JourneyView.js
const STYLE_ID = 'journey-view-css';
const ROUTE_ID = 'routeView';
const HOME_ID  = 'homeView';
const TITLE_ID = 'routeTitle';
const SUB_ID   = 'routeSubtitle';
const CARDS_ID = 'routeCards';
const BACK_ID  = 'routeBack';

function injectStylesOnce() {
  if (document.getElementById(STYLE_ID)) return;
  const css = `
  :root{
    --accent:#0077d2; --accent-600:#005fa3;
    --text:#4b5563; --text-dark:#0f172a;
    --bg:#f9fafb; --paper:#ffffff;
    --max:1100px; --pad:clamp(12px,3vw,20px);
    --shadow-sm:0 1px 2px rgba(16,24,40,.06);
    --border:#e5e7eb;
  }
  .hidden{display:none!important}

  #${ROUTE_ID}{position:relative;min-height:100dvh;width:100%;background:#fff;color:var(--text);}
  #${ROUTE_ID} .wrap{max-width:var(--max);margin-inline:auto;padding-inline:var(--pad);}

  /* Header (mêmes classes/IDs que la home) */
  #${ROUTE_ID} header.sticky.top-0{position:sticky; top:0; z-index:1000;}

  /* Bandeau titre */
  #${ROUTE_ID} .head{
    display:flex; align-items:center; justify-content:space-between; gap:10px;
    padding:14px 0 12px; border-bottom:1px solid #eef2f7;
  }
  #${ROUTE_ID} h1#${TITLE_ID}{
    margin:0; color:#0f172a;
    font:800 clamp(1.05rem,1.7vw,1.25rem)/1.2 Inter,system-ui,sans-serif; letter-spacing:-.01em;
  }
  #${ROUTE_ID} #${SUB_ID}{
    margin:.15rem 0 0; color:#475569; font:600 clamp(.9rem,1.1vw,.98rem)/1.35 Inter,system-ui,sans-serif;
  }

  /* Bouton retour */
  #${BACK_ID}{
    appearance:none; cursor:pointer; border:1.5px solid var(--border); border-radius:12px;
    background:#f9fafb; color:#374151; font:700 .9rem/1 Inter,system-ui,sans-serif; padding:8px 12px;
    transition:background .18s,border-color .18s,color .18s,transform .12s,box-shadow .18s;
  }
  #${BACK_ID}:hover{
    background:var(--accent); border-color:var(--accent); color:#fff;
    box-shadow:0 8px 22px rgba(0,119,210,.16); transform:translateY(-1px);
  }

  /* Rangée cartes */
  #${CARDS_ID}{
    display:flex; flex-wrap:nowrap; gap:12px; justify-content:center; align-items:flex-start; margin-top:12px;
  }
  #${CARDS_ID} .journey-step{
    flex:0 0 auto; border-radius:14px; border:1px solid rgba(0,0,0,.06);
    box-shadow:var(--shadow-sm);
    transition:transform .12s,box-shadow .12s,border-color .12s;
  }
  #${CARDS_ID} .journey-step:hover{ transform:translateY(-2px); box-shadow:0 8px 22px rgba(0,0,0,.12); }
  #${ROUTE_ID} .sep{height:8px}

  /* Footer */
  #${ROUTE_ID} footer.site-footer{margin-top:24px; border-top:1px solid var(--border); background:#fff;}
  #${ROUTE_ID} .ft-top{
    max-width:var(--max); margin-inline:auto; padding:18px var(--pad);
    display:grid; grid-template-columns:1fr; gap:12px;
  }
  @media (min-width:640px){ #${ROUTE_ID} .ft-top{ grid-template-columns:repeat(3,1fr); } }
  #${ROUTE_ID} .ft-top h3{font-weight:600; color:#111827; margin:0 0 6px 0; font-size:.95rem;}
  #${ROUTE_ID} .ft-top p, #${ROUTE_ID} .ft-top a{color:#6b7280; font-size:.88rem; text-decoration:none;}
  #${ROUTE_ID} .ft-top a:hover{ color:var(--accent); }
  #${ROUTE_ID} .ft-bottom{border-top:1px solid var(--border); text-align:center; padding:12px var(--pad); font-size:.78rem; color:#6b7280;}
  `;
  const style = document.createElement('style');
  style.id = STYLE_ID; style.textContent = css;
  document.head.appendChild(style);
}

function ensureDOM() {
  injectStylesOnce();

  let route = document.getElementById(ROUTE_ID);
  if (!route) {
    route = document.createElement('section');
    route.id = ROUTE_ID;
    route.className = 'hidden';
    route.innerHTML = `
      <!-- Header (identique à index.html pour conserver le style/JS) -->
      <header class="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
          <div class="leading-tight">
            <h1 class="text-[1.1rem] font-extrabold tracking-tight text-[#0f172a]">Digital TAG</h1>
            <p class="text-[0.82rem] text-[#0077d2]">De l’état des lieux à l’action.</p>
          </div>
          <div class="relative text-[0.9rem]">
            <button id="userBtn" class="btn-soft">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 15c2.886 0 5.524.913 7.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span id="userOrg" class="font-medium">...</span>
            </button>
            <div id="userDropdown" class="hidden absolute right-0 mt-1 w-48 bg-white border rounded shadow-md z-50">
              <button id="editUser" class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Modifier mes informations</button>
              <button id="logoutBtn" class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Se déconnecter</button>
            </div>
          </div>
        </div>
      </header>

      <div class="wrap">
        <div class="head">
          <div>
            <h1 id="${TITLE_ID}">Parcours recommandé</h1>
            <div id="${SUB_ID}"></div>
          </div>
          <button id="${BACK_ID}" type="button">⬅ Revenir à la sélection</button>
        </div>

        <div class="sep"></div>
        <div id="${CARDS_ID}"></div>
      </div>

      <footer class="site-footer">
        <div class="ft-top">
          <div>
            <h3>Digital TAG</h3>
            <p>HEG Arc — Institut de Digitalisation des Organisations.</p>
          </div>
          <div>
            <h3>Contact</h3>
            <p>info@heg-arc.ch<br/>Espace de l’Europe 21, 2000 Neuchâtel</p>
          </div>
          <div>
            <h3>Liens</h3>
            <div class="flex flex-col gap-1">
              <a href="#platform">La plateforme</a>
              <a href="#journey">PME Journey Map</a>
              <a href="#">Mentions légales</a>
            </div>
          </div>
        </div>
        <div class="ft-bottom">
          © <span id="routeYearSpan"></span> HEG Arc – Digital TAG. Tous droits réservés.
        </div>
      </footer>
    `;
    document.body.appendChild(route);

    const y = route.querySelector('#routeYearSpan');
    if (y) y.textContent = String(new Date().getFullYear());

    wireRouteHeaderUserMenu(route);
  }
  return getRefs();
}

function wireRouteHeaderUserMenu(root) {
  const userBtn      = root.querySelector('#userBtn');
  const userDropdown = root.querySelector('#userDropdown');
  const userOrg      = root.querySelector('#userOrg');

  try {
    const raw = localStorage.getItem('dtagUser');
    const user = raw ? JSON.parse(raw) : null;
    if (user && user.org && userOrg) userOrg.textContent = user.org;
  } catch {}

  if (userBtn && userDropdown) {
    userBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      userDropdown.classList.toggle('hidden');
      userBtn.classList.toggle('is-selected');
    });
    document.addEventListener('click', (e) => {
      if (!userDropdown.classList.contains('hidden')) {
        const inside = userDropdown.contains(e.target) || userBtn.contains(e.target);
        if (!inside) {
          userDropdown.classList.add('hidden');
          userBtn.classList.remove('is-selected');
        }
      }
    });
  }

  const routeEdit   = root.querySelector('#editUser');
  const routeLogout = root.querySelector('#logoutBtn');
  const homeEdit    = document.querySelector('#homeView #editUser');
  const homeLogout  = document.querySelector('#homeView #logoutBtn');

  if (routeEdit) {
    routeEdit.addEventListener('click', () => {
      userDropdown?.classList.add('hidden');
      userBtn?.classList.remove('is-selected');
      if (homeEdit) homeEdit.click();
    });
  }
  if (routeLogout) {
    routeLogout.addEventListener('click', () => {
      userDropdown?.classList.add('hidden');
      userBtn?.classList.remove('is-selected');
      if (homeLogout) homeLogout.click();
      else { localStorage.removeItem('dtagUser'); location.reload(); }
    });
  }
}

function getRefs() {
  return {
    home:    document.getElementById(HOME_ID),
    route:   document.getElementById(ROUTE_ID),
    titleEl: document.getElementById(TITLE_ID),
    subEl:   document.getElementById(SUB_ID),
    cardsEl: document.getElementById(CARDS_ID),
   backBtn: document.getElementById(BACK_ID),
  };
}

export function ensureRouteView() {
  const refs = ensureDOM();
  if (refs.backBtn && !refs.backBtn.dataset.bound) {
    refs.backBtn.dataset.bound = '1';
    refs.backBtn.addEventListener('click', () => hideRouteView());
  }
  return refs;
}

export function showRouteView(opts = {}) {
  const { home, route, titleEl, subEl, cardsEl } = ensureRouteView();

  if (home) home.classList.add('hidden');

  titleEl.textContent = opts.title || 'Parcours recommandé';
  subEl.textContent   = opts.subtitle || 'Commencez par ces phases et itérez selon vos besoins.';

  cardsEl.innerHTML = '';

  if (Array.isArray(opts.cardsHTML)) {
    opts.cardsHTML.forEach(html => {
      const tmp = document.createElement('div');
      tmp.innerHTML = html.trim();
      tmp.querySelectorAll('.recommend-text').forEach(n => n.remove());
      tmp.querySelectorAll('.journey-step, .arrow-between').forEach(el => cardsEl.appendChild(el));
    });
  } else if (typeof opts.cardsContainerId === 'string') {
    const from = document.getElementById(opts.cardsContainerId);
    if (from) {
      // on sélectionne explicitement ce qu’on veut déplacer
      const nodes = from.querySelectorAll('.journey-step, .arrow-between');
      nodes.forEach(el => cardsEl.appendChild(el)); // on déplace (pas de clone)
      from.querySelectorAll('.recommend-text').forEach(n => n.remove());
    }
  }

  route.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'instant' });
}

export function hideRouteView() {
  const { home, route } = ensureRouteView();
  if (route) route.classList.add('hidden');
  if (home)  home.classList.remove('hidden');
  const { cardsEl, subEl } = getRefs();
  if (cardsEl) cardsEl.innerHTML = '';
  if (subEl) subEl.textContent = '';
}
