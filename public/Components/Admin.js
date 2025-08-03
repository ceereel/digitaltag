document.addEventListener('DOMContentLoaded', () => {
  const tokenInput = document.getElementById("tokenInput");
  const error = document.getElementById("error");
  const loadBtn = document.getElementById("loadBtn");
  const pdfBtn = document.getElementById("pdfBtn");
  const csvBtn = document.getElementById("csvBtn");
  const tbody = document.querySelector("#feedbackTable tbody");

  const BASE_URL = location.hostname.includes('localhost') || location.hostname.includes('127.')
    ? 'http://localhost:4000'
    : 'https://digitaltag-api.onrender.com';

  loadBtn.addEventListener('click', async () => {
    error.textContent = "";
    tbody.innerHTML = "";

    try {
      const res = await fetch(`${BASE_URL}/admin/feedback`, {
        method: "GET",
        headers: { "x-admin-token": tokenInput.value }
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();

      const clarityCounts = { Oui: 0, Non: 0, Moyennement: 0 };
      const reuseCounts = { Oui: 0, Non: 0, 'Peut-être': 0 };
      const navigationCounts = { Oui: 0, Non: 0, Partiellement: 0 };

      data.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td data-label="Phase">${row.phase}</td>
          <td data-label="Module">${row.module}</td>
          <td data-label="Organisation">${row.organisation}</td>
          <td data-label="Secteur">${row.sector}</td>
          <td data-label="Email">${row.email}</td>
          <td data-label="Clarté">${row.clarity}</td>
          <td data-label="Utilité">${row.usefulness}</td>
          <td data-label="Esthétique">${row.visual_appeal}</td>
          <td data-label="Commentaire">${row.comment}</td>
          <td data-label="Date">${new Date(row.created_at).toLocaleString()}</td>
        `;
        tbody.appendChild(tr);

        if (clarityCounts[row.clarity] !== undefined) clarityCounts[row.clarity]++;
        if (reuseCounts[row.reuse] !== undefined) reuseCounts[row.reuse]++;
        if (navigationCounts[row.navigation] !== undefined) navigationCounts[row.navigation]++;
      });

      createPieChart('clarityChart', 'Clarté de la séquence', clarityCounts);
      createPieChart('reuseChart', 'Souhait de réutilisation', reuseCounts);
      createPieChart('navigationChart', 'Aide à la navigation', navigationCounts);

    } catch (err) {
      error.textContent = err.message;
    }
  });

  pdfBtn.addEventListener("click", () => {
    const token = tokenInput.value;
    window.open(`${BASE_URL}/admin/pdf?token=${encodeURIComponent(token)}`, '_blank');
  });

  csvBtn.addEventListener("click", () => {
    const token = tokenInput.value;
    window.open(`${BASE_URL}/admin/csv?token=${encodeURIComponent(token)}`, '_blank');
  });

  function createPieChart(canvasId, title, dataMap) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(dataMap),
        datasets: [{
          label: title,
          data: Object.values(dataMap),
          backgroundColor: ['#0077d2', '#60a5fa', '#93c5fd']
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom'
          },
          title: {
            display: true,
            text: title,
            font: {
              size: 16,
              weight: 'bold'
            },
            padding: { top: 10, bottom: 20 }
          }
        }
      }
    });
  }
});
