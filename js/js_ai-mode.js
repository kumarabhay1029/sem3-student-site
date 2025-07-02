// AI Techy Mode Script for IGNOU BCA Sem 3 Group
// Teaching-based structure: clear separation of UI, voice, and navigation logic

// 1. Selectors
const aiBtn = document.getElementById('aiModeToggle');
const body = document.body;
const nav = document.getElementById('main-nav');
const aiNavCards = document.getElementById('ai-nav-cards');
const joinFormEmbed = document.getElementById('join-form-embed');
let aiModeActive = false;

// 2. Section definitions (for quick cards in AI mode)
const sections = [
  { id: "about", label: "About" },
  { id: "plan", label: "Study Plan" },
  { id: "join-form", label: "Join" },
  { id: "notes-list", label: "Notes" },
  { id: "contributor", label: "Contributors" },
  { id: "policies", label: "Rules" },
  { id: "skills", label: "Skills" },
  { id: "feedback", label: "Feedback" },
  { id: "progress-tracker", label: "Progress" },
  { id: "activity-feed", label: "Activity" }
];

// 3. Voice greeting logic
function aiVoiceGreeting(text) {
  if ('speechSynthesis' in window) {
    const msg = new SpeechSynthesisUtterance(text);
    msg.pitch = 1.08;
    msg.rate = 1.04;
    msg.lang = "en-US";
    msg.volume = 1;
    msg.voice = window.speechSynthesis.getVoices().find(v => v.lang.startsWith('en')) || null;
    window.speechSynthesis.cancel(); // Stop any current speech
    window.speechSynthesis.speak(msg);
  }
}

// 4. Toggle AI Mode
function enableAIMode() {
  aiModeActive = true;
  body.classList.add('ai-mode');
  // Hide standard nav, show AI cards
  nav.style.display = 'none';
  aiNavCards.style.display = 'flex';
  renderAICards();
  // Techy background and font changes
  body.style.background = 'radial-gradient(ellipse at top, #0ff 30%, #202040 100%)';
  body.style.fontFamily = "'Orbitron', 'Roboto Mono', 'Arial', monospace";
  // Voice greeting
  aiVoiceGreeting("Welcome to AI Techy Mode. How can I assist you?");
  // Animate glowing button
  aiBtn.classList.add('active');
  // Convert join form to pop-out
  if (joinFormEmbed) joinFormEmbed.innerHTML =
    `<button class="ai-join-btn" onclick="window.open('https://docs.google.com/forms/d/e/1FAIpQLSeEbGZlALuNxoOdUq6VpRK2pS5mi2znI-DbgNgiQ20aUumH_Q/viewform', '_blank')">Open Join Form in New Tab</button>`;
}

function disableAIMode() {
  aiModeActive = false;
  body.classList.remove('ai-mode');
  nav.style.display = '';
  aiNavCards.style.display = 'none';
  body.style.background = '';
  body.style.fontFamily = '';
  aiBtn.classList.remove('active');
  // Restore join form embed
  if (joinFormEmbed) joinFormEmbed.innerHTML =
    `<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeEbGZlALuNxoOdUq6VpRK2pS5mi2znI-DbgNgiQ20aUumH_Q/viewform?embedded=true" width="100%" height="600" frameborder="0" title="Group Join Form">Loading…</iframe>`;
}

// 5. Render animated AI mode cards
function renderAICards() {
  aiNavCards.innerHTML = '';
  aiNavCards.style.gap = '18px';
  aiNavCards.style.flexWrap = 'wrap';
  aiNavCards.style.justifyContent = 'center';
  aiNavCards.style.margin = '24px 0 14px 0';

  sections.forEach(sec => {
    const card = document.createElement('button');
    card.className = 'ai-card';
    card.innerHTML = `<span>${sec.label}</span>`;
    card.onclick = () => {
      document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth' });
      aiVoiceGreeting(`Opening ${sec.label} section.`);
    };
    aiNavCards.appendChild(card);
  });
}

// 6. Glowing fire effect (CSS-in-JS for demonstration)
(function injectFireGlowStyle() {
  const style = document.createElement('style');
  style.innerHTML = `
  .ai-glow-btn {
    position: absolute; top: 18px; right: 64px;
    padding: 0 16px 0 8px;
    background: #101d2f;
    color: #0ff;
    border: none;
    border-radius: 29px;
    font-size: 1.14rem;
    font-family: 'Orbitron', 'Roboto Mono', Arial, sans-serif;
    box-shadow: 0 0 13px #00eaff88, 0 0 36px #00eaff33;
    cursor: pointer;
    transition: background 0.2s, color 0.2s, box-shadow 0.2s;
    z-index: 400;
    display: flex; align-items: center;
    gap: 6px;
  }
  .ai-glow-btn.active, .ai-glow-btn:hover {
    background: #0ff;
    color: #101d2f;
    box-shadow: 0 0 22px 5px #00eaffbb, 0 0 60px #00eaff55;
  }
  .ai-fire {
    display: inline-block;
    width: 22px; height: 22px;
    margin-right: 7px;
    background: radial-gradient(circle at 60% 30%, #fff 0%, #ffe600 30%, #ff9800 70%, #f44336 100%);
    border-radius: 50%;
    box-shadow: 0 0 12px #ffe60088, 0 0 40px #f4433699;
    animation: fireGlow 1.2s infinite alternate;
  }
  @keyframes fireGlow {
    from { box-shadow: 0 0 10px #ffe60099, 0 0 20px #f4433666; }
    to { box-shadow: 0 0 24px #ffe600cc, 0 0 70px #f44336cc; }
  }
  .ai-card {
    background: linear-gradient(135deg, #00eaff 60%, #202040 100%);
    color: #fff;
    border: none;
    border-radius: 13px;
    box-shadow: 0 2px 12px #00eaff55;
    font-size: 1.09rem;
    font-family: 'Orbitron', 'Roboto Mono', Arial, sans-serif;
    margin: 2px 0;
    padding: 22px 30px;
    cursor: pointer;
    letter-spacing: 0.5px;
    transition: box-shadow 0.18s, transform 0.13s, background 0.18s;
    outline: none;
    animation: aiCardFloat 1.8s infinite alternate;
  }
  .ai-card:hover, .ai-card:focus {
    background: linear-gradient(135deg, #202040 20%, #00eaff 100%);
    color: #00eaff;
    box-shadow: 0 6px 30px #00eaff99;
    transform: scale(1.08) rotateZ(-2deg);
  }
  @keyframes aiCardFloat {
    from { transform: translateY(0);}
    to { transform: translateY(-8px);}
  }
  .ai-join-btn {
    background: #00eaff;
    color: #202040;
    border: none;
    border-radius: 8px;
    padding: 14px 30px;
    font-size: 1.12rem;
    font-family: 'Orbitron', 'Roboto Mono', Arial, sans-serif;
    margin: 14px auto;
    display: block;
    box-shadow: 0 2px 16px #00eaff66;
    cursor: pointer;
    transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  }
  .ai-join-btn:hover {
    background: #202040;
    color: #00eaff;
    box-shadow: 0 8px 32px #00eaff99;
  }
  body.ai-mode .glass-card, body.ai-mode .dashboard-widget {
    background: rgba(0,255,255,0.10)!important;
    border: 2px solid #00eaff;
    color: #fff;
    box-shadow: 0 8px 32px #00eaff33;
  }
  body.ai-mode h2, body.ai-mode .widget-title {
    color: #00eaff!important;
    text-shadow: 0 0 12px #00eaff99, 0 0 2px #fff;
  }
  body.ai-mode .techy-scroller {
    background: #101d2f;
    border-bottom: 2.5px solid #00eaff;
  }
  body.ai-mode .sticky-nav {
    display: none !important;
  }
  `;
  document.head.appendChild(style);
})();

// 7. Button event
if (aiBtn) {
  aiBtn.onclick = () => {
    if (!aiModeActive) {
      enableAIMode();
    } else {
      disableAIMode();
    }
  };
}

// 8. Accessibility: ESC key disables AI mode
window.addEventListener('keydown', function(e) {
  if (aiModeActive && e.key === "Escape") {
    disableAIMode();
  }
});