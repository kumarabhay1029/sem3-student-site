// js/progress.js
// Teaching-based Syllabus Progress Tracker: persistent, clear, and motivating!

// Select all checkboxes in the syllabus list
const syllabusCheckboxes = document.querySelectorAll('#progress-tracker input[type=checkbox]');
const progressStatus = document.getElementById('progress-status');

// Helper: Get topic names from checkbox labels (for listing completed topics)
function getTopicName(checkbox) {
  // Assumes: <label><input ...> TOPIC_NAME</label>
  return checkbox.parentElement.textContent.trim();
}

// Load progress from localStorage
function loadProgress() {
  const saved = JSON.parse(localStorage.getItem('syllabus-progress') || '[]');
  syllabusCheckboxes.forEach((box, idx) => {
    box.checked = !!saved[idx];
  });
}

// Save progress to localStorage
function saveProgress() {
  const states = Array.from(syllabusCheckboxes).map(box => box.checked);
  localStorage.setItem('syllabus-progress', JSON.stringify(states));
}

// Update progress UI and celebrate if all topics are done
function updateProgressStatus() {
  const doneBoxes = Array.from(syllabusCheckboxes).filter(c => c.checked);
  const doneCount = doneBoxes.length;
  const total = syllabusCheckboxes.length;
  // Show count and completed list
  let msg = `Completed: ${doneCount} / ${total}`;
  if (doneCount > 0) {
    msg += `<br><span style="font-size:0.96em;color:#2196f3;">Done topics: ${doneBoxes.map(getTopicName).join(", ")}</span>`;
  }
  progressStatus.innerHTML = msg;
  // Celebrate on full completion
  if (doneCount === total && total > 0) {
    confetti({ particleCount: 120, spread: 90 });
  }
  saveProgress();
}

// Allow student to reset all progress for repeated practice
function resetProgress() {
  syllabusCheckboxes.forEach(box => (box.checked = false));
  saveProgress();
  updateProgressStatus();
}

// Attach checkbox and reset events
syllabusCheckboxes.forEach(box => {
  box.addEventListener('change', updateProgressStatus);
});

// Add a reset button for learning cycles (if not already present)
if (!document.getElementById('progress-reset-btn')) {
  const resetBtn = document.createElement('button');
  resetBtn.textContent = 'Reset Progress';
  resetBtn.id = 'progress-reset-btn';
  resetBtn.style.marginTop = '12px';
  resetBtn.style.marginLeft = '6px';
  resetBtn.onclick = resetProgress;
  progressStatus.parentElement.appendChild(resetBtn);
}

// Initialize on page load
loadProgress();
updateProgressStatus();
