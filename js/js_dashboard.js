// js/dashboard.js
// Updates dashboard widgets: Members, Notes, Badges, Active Now

// Helper: fetch JSON from data folder
async function fetchJSON(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Fetch failed');
    return await res.json();
  } catch (e) {
    return [];
  }
}

// Main: update widgets
async function updateDashboardWidgets() {
  // Fetch all data
  const [members, notes, badges] = await Promise.all([
    fetchJSON('data/members.json'),
    fetchJSON('data/notes.json'),
    fetchJSON('data/badges.json')
  ]);

  // Update Members count
  const membersCount = Array.isArray(members) ? members.length : 0;
  document.getElementById('widget-members').textContent = membersCount;

  // Update Notes count (only approved if you track that)
  const notesCount = Array.isArray(notes)
    ? notes.filter(n => n.approved !== false).length
    : 0;
  document.getElementById('widget-notes').textContent = notesCount;

  // Update Badges count (unique badge types)
  let badgeTypes = new Set();
  if (Array.isArray(badges)) {
    badges.forEach(entry => {
      (entry.badges || []).forEach(b => badgeTypes.add(b));
    });
  }
  document.getElementById('widget-badges').textContent = badgeTypes.size;

  // Active Now: for demo, show a random number between 4 and 12
  const activeNow = Math.floor(4 + Math.random() * 8);
  document.getElementById('widget-active').textContent = activeNow;
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', updateDashboardWidgets);