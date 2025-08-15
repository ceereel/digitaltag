const STYLE_ID='journey-view-css';
const ROUTE_ID='routeView';
const HOME_ID='homeView';
const TITLE_ID='routeTitle';
const SUB_ID='routeSubtitle';
const TEXT_ID='routeText';
const CARDS_ID='routeCards';
const BACK_ID='routeBack';

function injectStylesOnce(){
  if (document.getElementById(STYLE_ID)) return;
  const css = `
  :root{--accent:#0077d2;--text:#4b5563;--text-dark:#0f172a;--paper:#fff;--bg:#f9fafb;--max:1100px;}
  .hidden{display:none!important}

  #${ROUTE_ID}{position:relative;min-height:100dvh;width:100%;background:#fff;color:var(--text);}
  #${ROUTE_ID} .wrap{max-width:var(--max);margin-inline:auto;padding:clamp(10px,2.2vw,18px);}

  #${ROUTE_ID} .head{display:flex;align-items:center;justify-content:space-between;gap:10px;
    padding:8px 0 12px;border-bottom:1px solid #eef2f7;}
  #${ROUTE_ID} h1{margin:0;color:var(--text-dark);font:800 clamp(1.05rem,1.7vw,1.25rem)/1.2 Inter,system-ui,sans-serif;letter-spacing:-.01em;}
  #${ROUTE_ID} #${SUB_ID}{margin:.15rem 0 0;color:#475569;font:600 clamp(.9rem,1.1vw,.98rem)/1.35 Inter,sans-serif;}

  #${BACK_ID}{appearance:none;cursor:pointer;border:1.5px solid #e5e7eb;border-radius:12px;background:#f9fafb;color:#374151;
    font:700 .9rem/1 Inter,sans-serif;padding:8px 12px;transition:background .18s,border-color .18s,color .18s,transform .12s,box-shadow .18s;}
  #${BACK_ID}:hover{background:var(--accent);border-color:var(--accent);color:#fff;box-shadow:0 8px 22px rgba(0,119,210,.16);transform:translateY(-1px);}

  /* Bloc intro propre au-dessus des cartes */
  #${TEXT_ID}{margin:12px 0 10px;color:#475569;font-size:.92rem;}
  #${TEXT_ID}.recommend-text{max-width:960px;margin-left:auto;margin-right:auto;}
  #${TEXT_ID}.recommend-text h3{margin:0 0 6px 0;font:700 1rem/1.25 Inter,sans-serif;color:#0f172a;}
  #${TEXT_ID}.recommend-text ul{margin:0;padding-left:1.1rem;}
  #${TEXT_ID}.recommend-text li{margin:6px 0;}

  /* Rangée cartes */
  #${CARDS_ID}{display:flex;flex-wrap:nowrap;gap:12px;justify-content:center;align-items:flex-start;margin-top:12px;}
  #${CARDS_ID} .journey-step{flex:0 0 auto;border-radius:14px;border:1px solid rgba(0,0,0,.06);
    box-shadow:0 1px 2px rgba(16,24,40,.06);transition:transform .12s,box-shadow .12s,border-color .12s;}
  #${CARDS_ID} .journey-step:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(0,0,0,.12);}
  #${ROUTE_ID} .sep{height:8px}
  `;
  const style=document.createElement('style');
  style.id=STYLE_ID; style.textContent=css;
  document.head.appendChild(style);
}

function ensureDOM(){
  injectStylesOnce();
  let route=document.getElementById(ROUTE_ID);
  if(!route){
    route=document.createElement('section');
    route.id=ROUTE_ID;
    route.className='hidden';
    route.innerHTML=`
      <div class="wrap">
        <div class="head">
          <div>
            <h1 id="${TITLE_ID}">Parcours recommandé</h1>
            <div id="${SUB_ID}"></div>
          </div>
          <button id="${BACK_ID}" type="button">⬅ Revenir à la sélection</button>
        </div>
        <div id="${TEXT_ID}" class="hidden"></div>
        <div class="sep"></div>
        <div id="${CARDS_ID}"></div>
      </div>`;
    document.body.appendChild(route);
  }
  return getRefs();
}

function getRefs(){
  return {
    home:document.getElementById(HOME_ID),
    route:document.getElementById(ROUTE_ID),
    titleEl:document.getElementById(TITLE_ID),
    subEl:document.getElementById(SUB_ID),
    textEl:document.getElementById(TEXT_ID),
    cardsEl:document.getElementById(CARDS_ID),
    backBtn:document.getElementById(BACK_ID),
  };
}

export function ensureRouteView(){
  const refs=ensureDOM();
  if(refs.backBtn && !refs.backBtn.dataset.bound){
    refs.backBtn.dataset.bound='1';
    refs.backBtn.addEventListener('click',()=>hideRouteView());
  }
  return refs;
}

export function showRouteView(opts={}){
  const {home,route,titleEl,subEl,textEl,cardsEl}=ensureRouteView();

  if(home) home.classList.add('hidden');
  titleEl.textContent=opts.title||'Parcours recommandé';
  subEl.textContent=opts.subtitle||'';

  // Intro HTML (bloc texte) rendu au-dessus des cartes
  if (opts.introHTML && String(opts.introHTML).trim()){
    textEl.className='recommend-text';
    textEl.innerHTML=opts.introHTML;
    textEl.classList.remove('hidden');
  } else if (opts.recommendationText && opts.recommendationText.trim()){
    textEl.className='recommend-text';
    textEl.textContent=opts.recommendationText.trim();
    textEl.classList.remove('hidden');
  } else {
    textEl.innerHTML=''; textEl.classList.add('hidden');
  }

  // Cartes (éléments fournis)
  cardsEl.innerHTML='';
  if (Array.isArray(opts.cardsHTML)){
    opts.cardsHTML.forEach(html=>{
      const tmp=document.createElement('div');
      tmp.innerHTML=html.trim();
      const el=tmp.firstElementChild;
      if(el) cardsEl.appendChild(el);
    });
  } else if (typeof opts.cardsContainerId==='string'){
    const from=document.getElementById(opts.cardsContainerId);
    if(from){ while(from.firstChild){ cardsEl.appendChild(from.firstChild); } }
  }

  route.classList.remove('hidden');
  window.scrollTo({top:0,behavior:'instant'});
}

export function hideRouteView(){
  const {home,route}=ensureRouteView();
  if(route) route.classList.add('hidden');
  if(home)  home.classList.remove('hidden');
  const {cardsEl,textEl,subEl}=getRefs();
  if(cardsEl) cardsEl.innerHTML='';
  if(textEl){ textEl.innerHTML=''; textEl.classList.add('hidden'); }
  if(subEl) subEl.textContent='';
}