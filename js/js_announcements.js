// js/announcements.js
// Automates the announcements scroller with group activity and contributor highlights

// Teaching-based: You can connect this to real data, Google Sheets, or a backend later.
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

// Demo: Build announcement messages from JSON data
async function buildAnnouncements() {
  const members = await fetchJSON('data/members.json');
  const notes = await fetchJSON('data/notes.json');
  const badges = await fetchJSON('data/badges.json');
  let messages = [];

  // Welcome new members (last 3)
  members.slice(-3).forEach(m =>
    messages.push(`👋 Welcome <b>${m.name}</b> to the group!`)
  );

  // New notes (last 2)
  notes.slice(-2).forEach(n =>
    messages.push(`📝 New notes: <b>${n.topic}</b> by ${n.contributor}`)
  );

  // Top contributor (most badges or most notes)
  let topContributor = null;
  let topCount = 0;
  badges.forEach(b => {
    if ((b.badges || []).length > topCount) {
      topContributor = b.user;
      topCount = b.badges.length;
    }
  });
  if (topContributor) {
    messages.push(`🏆 Most active contributor: <b>${topContributor}</b>`);
  }

  // Fallback/default
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