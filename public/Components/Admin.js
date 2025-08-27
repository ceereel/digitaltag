// /public/components/admin.js
document.addEventListener('DOMContentLoaded', () => {
  const tokenInput = document.getElementById('tokenInput');
  const loadBtn    = document.getElementById('loadBtn');
  const pdfBtn     = document.getElementById('pdfBtn');
  const csvBtn     = document.getElementById('csvBtn');
  const errorEl    = document.getElementById('error');

  const tabs = Array.from(document.querySelectorAll('.tab'));
  const panels = {
    overview: document.getElementById('panel-overview'),
    orgs:     document.getElementById('panel-orgs'),
    evals:    document.getElementById('panel-evals'),
  };

  // Overview KPIs + chart canvases
  const kpiGlobal = document.getElementById('kpiGlobal');

  // Orgs
  const orgTable  = document.getElementById('orgTable');
  const orgTbody  = orgTable?.querySelector('tbody');
  const orgSearch = document.getElementById('orgSearch');
  const orgDetail = document.getElementById('orgDetail');
  const orgBack   = document.getElementById('orgBack');
  const orgTitle  = document.getElementById('orgTitle');
  const kpiOrg    = document.getElementById('kpiOrg');
  const orgEvalTable = document.getElementById('orgEvalTable')?.querySelector('tbody');

  // Evals full table
  const evalTable = document.getElementById('feedbackTable');
  const evalTbody = evalTable?.querySelector('tbody');
  const evalSearch = document.getElementById('evalSearch');

  const BASE_URL =
    location.hostname.includes('localhost') || location.hostname.startsWith('127.')
      ? 'http://localhost:4000'
      : 'https://digitaltag-api.onrender.com';

  let allRows = [];
  let currentOrg = null;
  let charts = [];

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      Object.values(panels).forEach(p => p.classList.remove('active'));
      panels[btn.dataset.tab]?.classList.add('active');
    });
  });

  loadBtn?.addEventListener('click', async () => {
    clearError();
    destroyCharts();
    currentOrg = null;

    try {
      const res = await fetch(`${BASE_URL}/admin/feedback`, {
        method: 'GET',
        headers: { 'x-admin-token': tokenInput.value }
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      allRows = Array.isArray(data) ? data : [];

      // OVERVIEW
      renderGlobalKPIs(allRows);
      renderOverviewCharts(allRows);

      // ORGS
      renderOrgList(allRows);
      hideOrgDetail();

      // EVALS
      renderEvalTable(allRows);
    } catch (err) {
      setError(err.message || 'Erreur réseau');
    }
  });

  /* PDF/CSV export */
  pdfBtn?.addEventListener('click', () => {
    const token = tokenInput.value;
    window.open(`${BASE_URL}/admin/pdf?token=${encodeURIComponent(token)}`, '_blank');
  });
  csvBtn?.addEventListener('click', () => {
    const token = tokenInput.value;
    window.open(`${BASE_URL}/admin/csv?token=${encodeURIComponent(token)}`, '_blank');
  });

  /* ===== Overview ===== */
  function renderGlobalKPIs(rows){
    kpiGlobal.innerHTML = '';
    const total   = rows.length;
    const avgNps  = avg(rows.map(r => num(r.nps)));
    const avgRel  = avg(rows.map(r => num(r.relevance_now)));
    const avgMat  = avg(rows.map(r => num(r.maturity_fit)));
    const avgEase = avg(rows.map(r => num(r.implementation_ease)));
    const avgDel  = avg(rows.map(r => num(r.deliverable_clarity)));

    addTag(kpiGlobal, `Total: ${total}`);
    addTag(kpiGlobal, `NPS moyen: ${fmt(avgNps,1)}`);
    addTag(kpiGlobal, `Pertinence: ${fmt(avgRel,1)}/5`);
    addTag(kpiGlobal, `Maturité: ${fmt(avgMat,1)}/5`);
    addTag(kpiGlobal, `Mise en œuvre: ${fmt(avgEase,1)}/5`);
    addTag(kpiGlobal, `Livrables: ${fmt(avgDel,1)}/5`);
  }

  function renderOverviewCharts(rows){
    destroyCharts();
    charts.push(pieOrBar('chartRelevance', 'Pertinence (1–5)', bucket(rows.map(r=>num(r.relevance_now)), [1,2,3,4,5])));
    charts.push(pieOrBar('chartMaturity',  'Adéquation maturité (1–5)', bucket(rows.map(r=>num(r.maturity_fit)), [1,2,3,4,5])));
    charts.push(pieOrBar('chartEase',      'Facilité mise en œuvre (1–5)', bucket(rows.map(r=>num(r.implementation_ease)), [1,2,3,4,5])));
    charts.push(bar('chartNPS',            'NPS (0–10)', bucket(rows.map(r=>num(r.nps)), Array.from({length:11},(_,i)=>i))));
    charts.push(pie('chartPriority',       'Priorité', cat(rows.map(r=>r.priority), ['Haute','Moyenne','Basse'])));
    charts.push(pie('chartSupport',        'Accompagnement', cat(rows.map(r=>r.support_needed), ['Aucun','Agent IA','Coaching','Les deux'])));
  }

  function renderOrgList(rows){
    orgTbody.innerHTML = '';
    const grouped = groupBy(rows, r => r.organisation || '(Sans organisation)');
    let items = Object.entries(grouped).map(([org, list]) => {
      const sector = list.find(r=>r.sector)?.sector || '';
      const lastTs = list.map(r => r.created_at ? new Date(r.created_at).getTime() : 0).reduce((a,b)=>Math.max(a,b),0);
      return { org, sector, count:list.length, last: lastTs ? new Date(lastTs).toLocaleString() : '' };
    }).sort((a,b)=>a.org.localeCompare(b.org,'fr'));

    // filter
    const q = (orgSearch.value || '').toLowerCase().trim();
    if (q) items = items.filter(it => it.org.toLowerCase().includes(q) || it.sector.toLowerCase().includes(q));

    items.forEach(it => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td data-label="Organisation">${esc(it.org)}</td>
        <td data-label="Secteur">${esc(it.sector)}</td>
        <td data-label="Nb évaluations"><span class="chip">${it.count}</span></td>
        <td data-label="Dernière">${it.last}</td>
        <td data-label="Action">
          <button class="btn btn-view" data-org="${esc(it.org)}" style="padding:.35rem .6rem;border-radius:8px;">👁 Voir</button>
        </td>
      `;
      orgTbody.appendChild(tr);
    });

    orgTbody.querySelectorAll('.btn-view').forEach(btn => {
      btn.addEventListener('click', () => {
        const org = btn.dataset.org;
        currentOrg = org;
        showOrgDetail(org);
      });
    });

    orgSearch.oninput = () => renderOrgList(allRows);
  }

  function showOrgDetail(org){
    const rows = allRows.filter(r => (r.organisation || '(Sans organisation)') === org);
    orgTitle.textContent = `${org} — ${rows.length} évaluation(s)`;
    kpiOrg.innerHTML = '';
    addTag(kpiOrg, `NPS moyen: ${fmt(avg(rows.map(r=>num(r.nps))),1)}`);
    addTag(kpiOrg, `Pertinence: ${fmt(avg(rows.map(r=>num(r.relevance_now))),1)}/5`);
    addTag(kpiOrg, `Maturité: ${fmt(avg(rows.map(r=>num(r.maturity_fit))),1)}/5`);

    // charts
    destroyChartsLocal(['orgRelevance','orgMaturity','orgNPS']); // au cas où
    charts.push(pieOrBar('orgRelevance', 'Pertinence (1–5)', bucket(rows.map(r=>num(r.relevance_now)), [1,2,3,4,5])));
    charts.push(pieOrBar('orgMaturity',  'Adéquation maturité (1–5)', bucket(rows.map(r=>num(r.maturity_fit)), [1,2,3,4,5])));
    charts.push(bar('orgNPS',            'NPS (0–10)', bucket(rows.map(r=>num(r.nps)), Array.from({length:11},(_,i)=>i))));

    // table
    orgEvalTable.innerHTML = '';
    rows.sort((a,b)=> new Date(b.created_at) - new Date(a.created_at))
      .forEach(r => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td data-label="Date">${r.created_at ? new Date(r.created_at).toLocaleString() : ''}</td>
          <td data-label="Phase">${esc(r.phase || '')}</td>
          <td data-label="Module">${esc(r.module || '')}</td>
          <td data-label="Pertinence">${esc(r.relevance_now ?? '')}</td>
          <td data-label="Maturité">${esc(r.maturity_fit ?? '')}</td>
          <td data-label="Mise en œuvre">${esc(r.implementation_ease ?? '')}</td>
          <td data-label="NPS">${esc(r.nps ?? '')}</td>
          <td data-label="Commentaire">${esc(r.comment ?? '')}</td>
        `;
        orgEvalTable.appendChild(tr);
      });

    orgDetail.classList.remove('hidden');
    orgTable.classList.add('hidden');
    orgBack.onclick = () => hideOrgDetail();
  }

  function hideOrgDetail(){
    currentOrg = null;
    orgDetail.classList.add('hidden');
    orgTable.classList.remove('hidden');
  }

  /* ===== Evaluations ===== */
  let sortKey = 'created_at';
  let sortAsc = false;

  function renderEvalTable(rows){
    const q = (evalSearch.value || '').toLowerCase().trim();

    let list = rows.slice();
    if (q) {
      list = list.filter(r => {
        const hay = [
          r.organisation, r.sector, r.email, r.phase, r.module, r.comment,
          r.priority, r.support_needed, r.time_to_start
        ].map(x => (x||'').toString().toLowerCase()).join(' ');
        return hay.includes(q);
      });
    }

    // tri
    list.sort((a,b) => cmp(a,b,sortKey,sortAsc));

    evalTbody.innerHTML = '';
    list.forEach(r => {
      const compo = safeArray(r.complementarity).join(' · ');
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td data-label="Date">${r.created_at ? new Date(r.created_at).toLocaleString() : ''}</td>
        <td data-label="Organisation">${esc(r.organisation || '')}</td>
        <td data-label="Secteur">${esc(r.sector || '')}</td>
        <td data-label="Email">${esc(r.email || '')}</td>
        <td data-label="Phase">${esc(r.phase || '')}</td>
        <td data-label="Module">${esc(r.module || '')}</td>
        <td data-label="Pertinence">${esc(r.relevance_now ?? '')}</td>
        <td data-label="Maturité">${esc(r.maturity_fit ?? '')}</td>
        <td data-label="Mise en œuvre">${esc(r.implementation_ease ?? '')}</td>
        <td data-label="NPS">${esc(r.nps ?? '')}</td>
        <td data-label="Complémentarité">${esc(compo)}</td>
        <td data-label="Commentaire">${esc(r.comment ?? '')}</td>
      `;
      evalTbody.appendChild(tr);
    });
  }

  // tri par clic entête
  evalTable.querySelectorAll('thead th[data-sort]').forEach(th => {
    th.style.cursor = 'pointer';
    th.addEventListener('click', () => {
      const key = th.dataset.sort;
      if (sortKey === key) sortAsc = !sortAsc;
      else { sortKey = key; sortAsc = true; }
      renderEvalTable(allRows);
    });
  });
  evalSearch.oninput = () => renderEvalTable(allRows);

  /* =========================
     Chart helpers
  ========================= */
  function pieOrBar(id, title, map){ 
    const total = Object.values(map).reduce((a,b)=>a+b,0);
    const nonZero = Object.values(map).filter(v=>v>0).length;
    return (total <= 0 || nonZero <= 1) ? pie(id, title, map) : bar(id, title, map);
  }
  function pie(id, title, map){
    const { labels, data } = labelsData(map);
    const ctx = getCtx(id); if (!ctx) return null;
    return new Chart(ctx, {
      type:'pie',
      data:{ labels, datasets:[{ data, backgroundColor:palette() }]},
      options:{ plugins:{ legend:{ position:'bottom' }, title:{ display:true, text:title }}}
    });
  }
  function bar(id, title, map){
    const { labels, data } = labelsData(map);
    const ctx = getCtx(id); if (!ctx) return null;
    return new Chart(ctx, {
      type:'bar',
      data:{ labels, datasets:[{ label:title, data }] },
      options:{
        plugins:{ legend:{ display:false }, title:{ display:true, text:title }},
        scales:{ y:{ beginAtZero:true, ticks:{ precision:0 } } }
      }
    });
  }
  function labelsData(map){
    const labels = Object.keys(map);
    const data   = Object.values(map);
    return { labels, data };
  }
  function getCtx(id){
    const c = document.getElementById(id);
    return c ? c.getContext('2d') : null;
  }
  function palette(){
    return ['#0077d2','#60a5fa','#93c5fd','#38bdf8','#34d399','#fbbf24','#f97316','#ef4444','#a78bfa','#f472b6','#22d3ee'];
  }
  function destroyCharts(){
    charts.forEach(ch => { try { ch?.destroy?.(); } catch {} });
    charts = [];
  }
  function destroyChartsLocal(ids){
    ids.forEach(id => {
    });
  }

  /* =========================
     Utils
  ========================= */
  function setError(msg){ errorEl.textContent = msg; }
  function clearError(){ errorEl.textContent = ''; }

  function addTag(container, text){
    const el = document.createElement('span');
    el.className = 'tag';
    el.textContent = text;
    container.appendChild(el);
  }

  function avg(arr){
    const v = arr.filter(n => Number.isFinite(n));
    return v.length ? v.reduce((a,b)=>a+b,0)/v.length : 0;
    }
  function fmt(n, d=0){ return Number.isFinite(n) ? n.toFixed(d) : '0'; }
  function num(v){ const n = Number(v); return Number.isFinite(n) ? n : null; }
  function esc(v){ return (v ?? '').toString().replace(/[<>&"]/g, s => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[s])); }
  function safeArray(v){
    if (!v) return [];
    if (Array.isArray(v)) return v;
    try { const t = JSON.parse(v); return Array.isArray(t) ? t : []; } catch { return []; }
  }

  function groupBy(arr, keyFn){
    const map = {};
    arr.forEach(it => {
      const k = keyFn(it);
      (map[k] ||= []).push(it);
    });
    return map;
  }

  function bucket(nums, labels){
    const map = {}; labels.forEach(l => map[l]=0);
    nums.forEach(n => { if (Number.isFinite(n) && map[n] !== undefined) map[n]++; });
    return map;
  }
  function cat(arr, labels){
    const map = {}; labels.forEach(l => map[l]=0);
    arr.forEach(v => { if (v && map[v] !== undefined) map[v]++; });
    return map;
  }

  function cmp(a,b,key,asc=true){
    const va = (a[key] ?? '').toString();
    const vb = (b[key] ?? '').toString();
    // date
    if (key === 'created_at') {
      const ta = a.created_at ? new Date(a.created_at).getTime() : 0;
      const tb = b.created_at ? new Date(b.created_at).getTime() : 0;
      return asc ? ta - tb : tb - ta;
    }
    // num
    if (['relevance_now','maturity_fit','implementation_ease','nps'].includes(key)) {
      const na = Number(va), nb = Number(vb);
      if (Number.isFinite(na) && Number.isFinite(nb)) return asc ? na - nb : nb - na;
    }
    // texte
    const r = va.localeCompare(vb,'fr');
    return asc ? r : -r;
  }
});
