// js/leaderboard.js
// Automates Contributor Leaderboard for the group (teaching-based, extendable)

// Helper: fetch JSON
async function fetchJSON(url) {
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error('Fetch failed');
    return await r.json();
  } catch (e) {
    return [];
  }
}

// Count contributions for each user by combining notes and badges
async function buildLeaderboard() {
  const notes = await fetchJSON('data/notes.json');
  const badges = await fetchJSON('data/badges.json');
  // Count notes per contributor
  const noteCounts = {};
  notes.forEach(n => {
    if (n.contributor) {
      noteCounts[n.contributor] = (noteCounts[n.contributor] || 0) + 1;
    }
  });
  // Build leaderboard data
  const leaderboard = badges.map(user => ({
    name: user.user,
    badges: user.badges || [],
    contributions: noteCounts[user.user] || 0
  }));
  // Sort by most contributions
  leaderboard.sort((a, b) => b.contributions - a.contributions);

  return leaderboard;
}

// Render leaderboard table
async function renderLeaderboard() {
  const tbody = document.querySelector('#leaderboard-table tbody');
  if (!tbody) return;
  const data = await buildLeaderboard();
  if (!data.length) {
    tbody.innerHTML = '<tr><td colspan="3">No contributors yet.</td></tr>';
    return;
  }
  // Highlight top contributor
  const rows = data.map((row, i) => `
    <tr${i === 0 ? ' style="background:#e0f7fa;font-weight:bold;"' : ''}>
      <td>${row.name}</td>
      <td>
        ${row.badges.map(b =>
          `<span style="background:#00eaff;color:#fff;padding:3px 8px;border-radius:6px;font-size:0.97em;margin-right:2px;">${b}</span>`
        ).join('')}
      </td>
      <td>${row.contributions}</td>
    </tr>
  `);
  tbody.innerHTML = rows.join('');
}
renderLeaderboard();

// Optionally, refresh every 2 minutes
setInterval(renderLeaderboard, 2 * 60 * 1000);