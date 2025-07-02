// js/progress.js
// Syllabus Progress Tracker: persistent, interactive, and fun!

// Get all progress checkboxes
const progressCheckboxes = document.querySelectorAll('#progress-tracker input[type=checkbox]');
const progressStatus = document.getElementById('progress-status');

// Load progress from local storage
function loadProgress() {
  const saved = JSON.parse(localStorage.getItem('syllabus-progress') || '[]');
  progressCheckboxes.forEach((box, idx) => {
    box.checked = !!saved[idx];
  });
}

// Save progress to local storage
function saveProgress() {
  const states = Array.from(progressCheckboxes).map(box => box.checked);
  localStorage.setItem('syllabus-progress', JSON.stringify(states));
}

// Update UI status and celebrate if all done
function updateProgressStatus() {
  const done = Array.from(progressCheckboxes).filter(c => c.checked).length;
  progressStatus.textContent = `Completed: ${done} / ${progressCheckboxes.length}`;
  if (done === progressCheckboxes.length && done > 0) {
    confetti({ particleCount: 120, spread: 90 });
  }
  saveProgress();
}

// Attach events
progressCheckboxes.forEach(box => {
  box.addEventListener('change', updateProgressStatus);
});

// Initialize on page load
loadProgress();
updateProgressStatus();