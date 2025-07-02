const aiToggle = document.getElementById('aiModeToggle');
let isAI = false;

aiToggle.addEventListener('click', () => {
  document.body.classList.toggle('ai-mode');
  isAI = !isAI;

  if (isAI) {
    showAIGreeting();
    document.getElementById('ai-nav-cards').style.display = "block";
    speak("Welcome to IGNOU AI Mode, Abhay. All systems online.");
    startVoiceCommand(); // start voice command
  } else {
    removeAIGreeting();
    document.getElementById('ai-nav-cards').style.display = "none";
  }
});

// Typewriter Greeting
function showAIGreeting() {
  const msg = "🤖 Welcome to IGNOU AI Mode...\nLoading student dashboard...";
  let i = 0;
  const target = document.getElementById('ai-greeting');
  target.innerText = '';
  const typer = setInterval(() => {
    if (i < msg.length) {
      target.innerText += msg.charAt(i);
      i++;
    } else {
      clearInterval(typer);
    }
  }, 50);
}

function removeAIGreeting() {
  document.getElementById('ai-greeting').innerText = '';
}

// Speech greeting
function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(msg);
}

// Scroll shortcut
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// Voice Commands
function startVoiceCommand() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Voice commands not supported in this browser.");
    return;
  }

  const recog = new webkitSpeechRecognition();
  recog.lang = 'en-US';
  recog.continuous = false;
  recog.interimResults = false;

  recog.onresult = function (event) {
    const text = event.results[0][0].transcript.toLowerCase();
    if (text.includes('notes')) scrollToSection('notes');
    else if (text.includes('progress')) scrollToSection('progress');
    else if (text.includes('plan')) scrollToSection('plan');
    else speak("Sorry, I didn't catch that.");
  };

  recog.onerror = () => speak("Voice command error.");
  recog.start();
}
