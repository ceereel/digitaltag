// public/components/admin.js
document.addEventListener('DOMContentLoaded', () => {
    const tokenInput = document.getElementById("tokenInput");
    const error = document.getElementById("error");
    const loadBtn = document.getElementById("loadBtn");
    const pdfBtn = document.getElementById("pdfBtn");
    const csvBtn = document.getElementById("csvBtn");
    const tbody = document.querySelector("#feedbackTable tbody");
  
    loadBtn.addEventListener('click', async () => {
      error.textContent = "";
      tbody.innerHTML = "";
  
      try {
        const res = await fetch("/admin/feedback", {
          method: "GET",
          headers: { "x-admin-token": tokenInput.value }
        });
  
        if (!res.ok) throw new Error(await res.text());
  
        const data = await res.json();
  
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
        });
      } catch (err) {
        error.textContent = err.message;
      }
    });
  
    pdfBtn.addEventListener("click", () => {
      const token = tokenInput.value;
      window.open(`/admin/pdf?token=${encodeURIComponent(token)}`, '_blank');
    });
  
    csvBtn.addEventListener("click", () => {
      const token = tokenInput.value;
      window.open(`/admin/csv?token=${encodeURIComponent(token)}`, '_blank');
    });
  });
  