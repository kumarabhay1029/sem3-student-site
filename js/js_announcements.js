// js/announcements.js
// Automates the announcements scroller with group activity and contributor highlights

// Helper: fetch JSON data
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

// Build announcement messages from JSON data
async function buildAnnouncements() {
  const members = await fetchJSON('data/members.json');
  const notes = await fetchJSON('data/notes.json');
  const badges = await fetchJSON('data/badges.json');
  let messages = [];

  // Welcome new members (last 3 by join date)
  members.slice(-3).forEach(m =>
    messages.push(`👋 Welcome <b>${m.name}</b> to the group!`)
  );

  // New notes (last 2, only approved)
  notes.filter(n => n.approved)
    .slice(-2)
    .forEach(n =>
      messages.push(`📝 New notes: <b>${n.topic}</b> by ${n.uploader}`)
    );

  // Top contributor (most badge awards)
  // Teaching example: Count how many times each member appears in all badges' awardedTo arrays
  const badgeCounts = {};
  badges.forEach(badge => {
    (badge.awardedTo || []).forEach(user => {
      badgeCounts[user] = (badgeCounts[user] || 0) + 1;
    });
  });
  let topContributor = null, topCount = 0;
  for (const user in badgeCounts) {
    if (badgeCounts[user] > topCount) {
      topContributor = user;
      topCount = badgeCounts[user];
    }
  }
  if (topContributor) {
    messages.push(`🏆 Most active contributor: <b>${topContributor}</b>`);
  }

  // Fallback/default message
  if (!messages.length) {
    messages.push("🚀 Welcome to IGNOU BCA Semester 3 Group! | Stay active, keep learning!");
  }
  return messages;
}

// Animate the scroller with messages
async function updateAnnouncementScroller() {
  const el = document.getElementById('announcements');
  if (!el) return;
  const msgs = await buildAnnouncements();
  el.innerHTML = msgs.map(m => `<span class="announcement-msg">${m}</span>`).join(' <span style="color:#00eaff;">|</span> ');
}
updateAnnouncementScroller();

// Optional: refresh every 2 minutes for live updates
setInterval(updateAnnouncementScroller, 2 * 60 * 1000);
