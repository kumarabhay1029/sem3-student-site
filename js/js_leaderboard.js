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

// Build leaderboard: contributors, their badges, and their note contributions
async function buildLeaderboard() {
  const notes = await fetchJSON('data/notes.json');
  const badges = await fetchJSON('data/badges.json');

  // 1. Get all unique users from notes (uploader) and from badges (awardedTo)
  const userSet = new Set();
  notes.forEach(n => {
    if (n.uploader) userSet.add(n.uploader);
  });
  badges.forEach(badge => {
    (badge.awardedTo || []).forEach(user => userSet.add(user));
  });

  // 2. For each user, count their approved notes and collect badges
  const leaderboard = Array.from(userSet).map(name => {
    // Count approved notes
    const noteCount = notes.filter(n => n.uploader === name && n.approved).length;
    // Collect badges they earned
    const userBadges = badges
      .filter(b => (b.awardedTo || []).includes(name))
      .map(b => b.name);

    return {
      name,
      badges: userBadges,
      contributions: noteCount
    };
  });

  // 3. Sort: most contributions first, then most badges
  leaderboard.sort((a, b) => 
    b.contributions !== a.contributions
      ? b.contributions - a.contributions
      : b.badges.length - a.badges.length
  );

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

// Optionally, refresh every 2 minutes for live updates
setInterval(renderLeaderboard, 2 * 60 * 1000);
