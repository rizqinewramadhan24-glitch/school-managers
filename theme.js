// ============================================
// THEME FUNCTIONS - Separated for PWA
// ============================================

// Load theme on start
function loadThemeOnStart() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  const savedMotif = localStorage.getItem('motif') || 'default';
  
  document.body.setAttribute('data-theme', savedTheme);
  document.body.setAttribute('data-motif', savedMotif);
  
  // Update toggle button
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    const icon = themeToggle.querySelector('i');
    const text = themeToggle.querySelector('span');
    
    if (savedTheme === 'dark') {
      icon.className = 'fas fa-sun';
      text.textContent = 'Light Mode';
    } else {
      icon.className = 'fas fa-moon';
      text.textContent = 'Dark Mode';
    }
  }
  
  // Update current motif display
  const currentMotifEl = document.getElementById('currentMotif');
  if (currentMotifEl) {
    currentMotifEl.textContent = savedMotif.charAt(0).toUpperCase() + savedMotif.slice(1);
  }
}

// Initialize theme on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadThemeOnStart);
} else {
  loadThemeOnStart();
}