async function toggleReview(programId, year, checked, checkboxEl) {
  try {
    checkboxEl.disabled = true;
    const url = checked ? `/programs/${programId}/review-years` : `/programs/${programId}/review-years/${year}`;
    const options = checked ? {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ year })
    } : { method: 'DELETE' };

    const resp = await fetch(url, options);
    if (!resp.ok) {
      console.error('Failed to toggle review year, server returned', resp.status);
    }

    const cell = checkboxEl.closest('.review-cell');
    if (checked) {
      cell.classList.add('due');
    } else {
      cell.classList.remove('due');
    }
  } catch (err) {
    console.error('Failed to toggle review year', err);
    checkboxEl.checked = !checked;
  } finally {
    checkboxEl.disabled = false;
  }
}

function attachToggles() {
  document.querySelectorAll('.review-toggle').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const checkbox = e.currentTarget;
      const programId = checkbox.dataset.programId;
      const year = parseInt(checkbox.dataset.year, 10);
      const checked = checkbox.checked;
      toggleReview(programId, year, checked, checkbox);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  attachToggles();
});