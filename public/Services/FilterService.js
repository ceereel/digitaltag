const GOAL_MAP = {
  "évaluer ma maturité digitale": [1],
  "me comparer à mes concurrents": [1, 2],
  "obtenir des recommandations ciblées": [1, 4],
  "structurer une transformation numérique": [1, 2, 3, 5],
  "organiser un atelier collaboratif": [3, 4, 5],
  "mettre à jour ma feuille de route": [1, 3, 4, 5]
};
S
export function suggestPhasesForGoals(goals) {
  const all = goals.flatMap(g => GOAL_MAP[g] || []);
  const unique = [...new Set(all)];
  return unique;
}
