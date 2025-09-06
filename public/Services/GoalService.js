import { getAll } from './PhaseService.js';

/* ❶  Chaque règle = { id, keywords[], sequence[] }                */
/*    – sequence = tableau d’ID de phases proposées.               */
const GOAL_RULES = [
  { id: 'diag', keywords:['maturité','diagnostic','évaluer'],        sequence:[1]      },
  { id: 'bench',keywords:['compar','benchmark','pair','marché'],     sequence:[2]      },
  { id: 'road', keywords:['feuille','roadmap','plan','prioriser'],   sequence:[1,2,3]  },
  { id: 'reco', keywords:['recommand','conseil','quick','ai'],       sequence:[4]      },
  { id: 'pilot',keywords:['piloter','kpi','reporting','suivre'],     sequence:[3,5]    }
];

/* ---------- Helpers ---------- */
function ruleFromText(text){
  const clean = text.toLowerCase();
  return GOAL_RULES.find(r => r.keywords.some(k=>clean.includes(k)));
}


//Fonction pas utilisée, à voir si tu veux la garder pour une future implémentation
/* ► Renvoie le “parcours” pour 1 ou 2 objectifs                              
   goals = tableau de chaînes                                               */
export function buildSequence(goals){
  if(!goals || goals.length===0) return getAll().map(p=>p.id);

  /* on limite strictement à 2 objectifs */
  const picked = goals.slice(0,2).map(ruleFromText).filter(Boolean);

  if(picked.length===0) return getAll().map(p=>p.id);

  /* fusion sans doublons, dans l’ordre où les règles apparaissent */
  const seq = [];
  picked.forEach(r => {
    r.sequence.forEach(id=>{
      if(!seq.includes(id)) seq.push(id);
    });
  });
  return seq;
}
