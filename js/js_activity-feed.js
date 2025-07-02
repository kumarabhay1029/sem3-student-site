// js/activity-feed.js
// Loads and displays recent group activities in the Activity Feed section

// Helper: Fetch JSON data
async function fetchJSON(url) {
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error('Fetch failed');
    return await r.json();
  } catch (e) {
    // fallback: return an empty array if fetch fails
    return [];
  }
}

// Helper: Format time as "x min ago" or date
function formatTime(iso) {
  if (!iso) return '';
  const now = new Date();
  const date = new Date(iso);
  const diff = (now - date) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return Math.floor(diff / 60) + ' min ago';
  if (diff < 86400) return Math.floor(diff / 3600) + ' hr ago';
  return date.toLocaleDateString();
}

// Main: Render activity feed
async function renderActivityFeed() {
  const ul = document.getElementById('activity-list');
  if (!ul) return;
  const activities = await fetchJSON('data/activity.json');
  if (!activities.length) {
    ul.innerHTML = '<li>No recent activities.</li>';
    return;
  }
  // Sort by most recent
  activities.sort((a, b) => (b.timestamp || '').localeCompare(a.timestamp || ''));
  // Build list
  ul.innerHTML = activities.map(act => {
    const icon = act.type === 'upload' ? '📥'
      : act.type === 'badge' ? '🏅'
      : act.type === 'announcement' ? '📢'
      : act.type === 'join' ? '👋'
      : '📰';
    // Teaching-based: Always use the field name exactly as in your data (here: description)
    return `<li>
      ${icon} ${act.description}
      <span style="font-size:0.92em;color:#888;margin-left:9px;">${formatTime(act.timestamp)}</span>
    </li>`;
  }).join('');
}

// Auto-refresh every 2 minutes for live updates
setInterval(renderActivityFeed, 2 * 60 * 1000);

// Initial load
renderActivityFeed();
