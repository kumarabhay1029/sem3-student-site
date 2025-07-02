// Dark mode toggle with localStorage persistence

document.addEventListener("DOMContentLoaded", function() {
  const darkModeBtn = document.getElementById('darkModeToggle');
  const body = document.body;

  // Function to set dark mode
  function setDarkMode(enabled) {
    if (enabled) {
      body.classList.add('dark-mode');
      darkModeBtn.textContent = '☀️';
      localStorage.setItem('darkMode', 'on');
    } else {
      body.classList.remove('dark-mode');
      darkModeBtn.textContent = '🌙';
      localStorage.setItem('darkMode', 'off');
    }
  }

  // On load, check preference
  const darkPref = localStorage.getItem('darkMode');
  setDarkMode(darkPref === 'on');

  // Toggle on button click
  darkModeBtn.addEventListener('click', function() {
    setDarkMode(!body.classList.contains('dark-mode'));
  });
});