// js/notes.js
// Loads and filters notes for the group

// Helper: fetch notes JSON
async function fetchNotes() {
  try {
    const r = await fetch('data/notes.json');
    if (!r.ok) throw new Error('Failed to fetch notes');
    return await r.json();
  } catch (e) {
    return [];
  }
}

// Helper: format date for display
function formatDate(iso) {
  if (!iso) return '';
  const date = new Date(iso);
  return date.toLocaleDateString();
}

// Render notes list
async function renderNotes(filter = "") {
  const ul = document.getElementById('notes-ul');
  if (!ul) return;
  let notes = await fetchNotes();
  notes = notes.filter(n => n.approved);

  // Filter by search
  if (filter) {
    const f = filter.toLowerCase();
    notes = notes.filter(n =>
      (n.courseCode && n.courseCode.toLowerCase().includes(f)) ||
      (n.topic && n.topic.toLowerCase().includes(f))
    );
  }

  if (!notes.length) {
    ul.innerHTML = '<li>No notes found.</li>';
    return;
  }

  // Sort by latest first
  notes.sort((a, b) => (b.timestamp || '').localeCompare(a.timestamp || ''));

  // Build list items
  ul.innerHTML = notes.map(note => {
    let isNew = false;
    if (note.timestamp) {
      const uploaded = new Date(note.timestamp);
      const now = new Date();
      const diffDays = (now - uploaded) / (1000 * 60 * 60 * 24);
      isNew = diffDays <= 7;
    }
    return `<li>
      <a href="${note.uploadLink}" target="_blank">
        ${note.courseCode ? `<b>${note.courseCode}</b> - ` : ""}${note.topic}
        ${note.contributor ? ` <span style="font-size:0.95em;color:#2196f3;">by ${note.contributor}</span>` : ""}
      </a>
      ${isNew ? '<span class="new-badge">New</span>' : ''}
      <span style="font-size:0.9em;color:#888;">${formatDate(note.timestamp)}</span>
    </li>`;
  }).join('');
}

// Input event for search
const searchInput = document.getElementById('notes-search');
if (searchInput) {
  searchInput.addEventListener('input', e => {
    renderNotes(e.target.value);
  });
}

// Initial render on page load
renderNotes();