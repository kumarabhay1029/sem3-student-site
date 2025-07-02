// js/feedback.js
// Handles group feedback: saves, displays, and celebrates

const feedbackForm = document.getElementById('feedback-form');
const feedbackInput = document.getElementById('feedback-input');
const feedbackList = document.getElementById('feedback-list');

// Retrieve feedbacks from localStorage
function loadFeedbacks() {
  const saved = JSON.parse(localStorage.getItem('group-feedbacks') || '[]');
  feedbackList.innerHTML = '';
  saved.forEach(msg => {
    const li = document.createElement('li');
    li.textContent = msg;
    feedbackList.appendChild(li);
  });
}

// Save feedback to localStorage and update UI
function addFeedback(msg) {
  let saved = JSON.parse(localStorage.getItem('group-feedbacks') || '[]');
  saved.unshift(msg);
  localStorage.setItem('group-feedbacks', JSON.stringify(saved));
  loadFeedbacks();
}

// On submit feedback
feedbackForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const msg = feedbackInput.value.trim();
  if (msg.length > 0) {
    addFeedback(msg);
    feedbackInput.value = '';
    // Celebrate with confetti!
    if (typeof confetti === 'function') confetti({ particleCount: 60, spread: 70 });
  }
});

// Initialize on page load
loadFeedbacks();