// widgets.js
// Automates dashboard stats: Members, Notes, Badges, Active Now (teaching-style, syllabus-based)

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

// 3. Update Badges count from badges.json (unique badge types, syllabus-style)
async function updateBadgesWidget() {
  const data = await fetchJSON('data/badges.json');
  // Each badge is a type; count unique badge names
  const badgeSet = new Set();
  data.forEach(badge => badgeSet.add(badge.name));
  document.getElementById('widget-badges').textContent = badgeSet.size || '--';
}

// 4. Simulate "Active Now" (random for demo, can be replaced with real logic)
let activeNowSim = 3 + Math.floor(Math.random() * 6);
document.getElementById('widget-active').textContent = activeNowSim;

// 5. Run all on page load
updateMembersWidget();
updateNotesWidget();
updateBadgesWidget();

// (Teaching tip) Use setInterval for live updates if you want "real-time" dashboard
setInterval(() => {
  // Optionally refresh widgets every 60s for new data
  updateMembersWidget();
  updateNotesWidget();
  updateBadgesWidget();
  // Simulate random active count
  document.getElementById('widget-active').textContent = 3 + Math.floor(Math.random() * 6);
}, 60000);
