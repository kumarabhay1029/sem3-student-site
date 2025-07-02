const aiToggle = document.getElementById('aiModeToggle');
let isAI = false;

aiToggle.addEventListener('click', () => {
  document.body.classList.toggle('ai-mode');
  isAI = !isAI;

  if (isAI) {
    showAIGreeting();
  } else {
    removeAIGreeting();
  }
});

function showAIGreeting() {
  const greeting = document.createElement('div');
  greeting.id = 'ai-greeting';
  greeting.innerText = "🤖 Welcome to IGNOU AI Mode\nOptimizing dashboard...";
  document.querySelector('header').appendChild(greeting);

  // Optional: Use speech synthesis
  const msg = new SpeechSynthesisUtterance("Welcome to IGNOU AI Mode, Abhay.");
  window.speechSynthesis.speak(msg);
}

function removeAIGreeting() {
  const el = document.getElementById('ai-greeting');
  if (el) el.remove();
}
