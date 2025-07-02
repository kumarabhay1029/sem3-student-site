// widgets.js
// Automates dashboard stats: Members, Notes, Badges, Active Now

// Helper: Fetch JSON (teaching-based: simple, extensible)
async function fetchJSON(url) {
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error('Fetch failed');
    return await r.json();
  } catch (e) {
    console.warn(`Could not fetch ${url}:`, e);
    return [];
  }
}

// 1. Update Members count from members.json
async function updateMembersWidget() {
  const data = await fetchJSON('data/members.json');
  document.getElementById('widget-members').textContent = data.length || '--';
}

// 2. Update Notes count from notes.json (approved only)
async function updateNotesWidget() {
  const data = await fetchJSON('data/notes.json');
  const approvedNotes = data.filter(n => n.approved === true);
  document.getElementById('widget-notes').textContent = approvedNotes.length || '--';
}

// 3. Update Badges count from badges.json (unique badge types)
async function updateBadgesWidget() {
  const data = await fetchJSON('data/badges.json');
  const badgeSet = new Set();
  data.forEach(user => (user.badges || []).forEach(b => badgeSet.add(b)));
  document.getElementById('widget-badges').textContent = badgeSet.size || '--';
}

// 4. Simulate "Active Now" (random for demo, replace with real logic as needed)
let activeNowSim = 3 + Math.floor(Math.random() * 6);
document.getElementById('widget-active').textContent = activeNowSim;

// 5. Run all on page load
updateMembersWidget();
updateNotesWidget();
updateBadgesWidget();

// Teaching tip: Use setInterval or WebSocket for live updates if you want "real-time"
setInterval(() => {
  // Optionally refresh widgets every 60s for new data
  updateMembersWidget();
  updateNotesWidget();
  updateBadgesWidget();
  // Simulate random active count
  document.getElementById('widget-active').textContent = 3 + Math.floor(Math.random() * 6);
}, 60000);