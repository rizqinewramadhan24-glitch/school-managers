// theme.js - Handle motif selection and dark mode

// Initialize theme from localStorage
function initTheme() {
  // Get saved theme and motif
  const savedTheme = localStorage.getItem('schoolTheme') || 'light';
  const savedMotif = localStorage.getItem('schoolMotif') || 'default';
  
  // Apply saved settings
  document.body.setAttribute('data-theme', savedTheme);
  document.body.setAttribute('data-motif', savedMotif);
  
  // Update toggle button text
  updateThemeButton(savedTheme);
  
  // Update current motif display
  updateCurrentMotif(savedMotif);
  
  // Update motif dropdown active state
  updateActiveMotifOption(savedMotif);
}

// Toggle dark/light mode
function toggleDarkMode() {
  const body = document.body;
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  // Apply new theme
  body.setAttribute('data-theme', newTheme);
  
  // Save to localStorage
  localStorage.setItem('schoolTheme', newTheme);
  
  // Update toggle button
  updateThemeButton(newTheme);
  
  // Show notification
  showNotification(`Mode ${newTheme === 'dark' ? 'Gelap' : 'Terang'} diaktifkan`, 'success');
}

// Update theme toggle button
function updateThemeButton(theme) {
  const toggleBtn = document.querySelector('.theme-toggle');
  if (!toggleBtn) return;
  
  const icon = toggleBtn.querySelector('i');
  const text = toggleBtn.querySelector('span');
  
  if (theme === 'dark') {
    icon.className = 'fas fa-sun';
    text.textContent = 'Light Mode';
  } else {
    icon.className = 'fas fa-moon';
    text.textContent = 'Dark Mode';
  }
}

// Toggle motif dropdown
function toggleMotifDropdown() {
  const dropdown = document.querySelector('.motif-dropdown');
  dropdown.classList.toggle('active');
}

// Change motif
function changeMotif(motif) {
  // Apply new motif
  document.body.setAttribute('data-motif', motif);
  
  // Save to localStorage
  localStorage.setItem('schoolMotif', motif);
  
  // Update current motif display
  updateCurrentMotif(motif);
  
  // Update active option in dropdown
  updateActiveMotifOption(motif);
  
  // Close dropdown
  const dropdown = document.querySelector('.motif-dropdown');
  dropdown.classList.remove('active');
  
  // Show notification
  showNotification(`Motif "${getMotifName(motif)}" diterapkan`, 'success');
}

// Get motif display name
function getMotifName(motif) {
  const names = {
    'default': 'Default',
    'gradient': 'Gradient',
    'education': 'Education',
    'pattern': 'Pattern',
    'glass': 'Glassmorphism',
    'nature': 'Nature'
  };
  return names[motif] || motif;
}

// Update current motif display
function updateCurrentMotif(motif) {
  const currentMotifElement = document.getElementById('currentMotif');
  if (currentMotifElement) {
    currentMotifElement.textContent = getMotifName(motif);
  }
}

// Update active motif option in dropdown
function updateActiveMotifOption(motif) {
  // Remove active class from all options
  document.querySelectorAll('.motif-option').forEach(option => {
    option.classList.remove('active');
  });
  
  // Add active class to current motif
  const activeOption = document.querySelector(`.motif-option[onclick*="${motif}"]`);
  if (activeOption) {
    activeOption.classList.add('active');
  }
}

// Show notification
function showNotification(message, type = 'success') {
  // Remove existing notification
  const oldNotification = document.getElementById('notification');
  if (oldNotification) {
    oldNotification.remove();
  }
  
  // Create new notification
  const notification = document.createElement('div');
  notification.id = 'notification';
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
    <span>${message}</span>
  `;
  
  // Add to DOM
  document.body.appendChild(notification);
  
  // Show with animation
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Close motif dropdown when clicking outside
document.addEventListener('click', function(event) {
  const dropdown = document.querySelector('.motif-dropdown');
  const toggle = document.querySelector('.motif-toggle');
  
  if (dropdown && !dropdown.contains(event.target) && dropdown.classList.contains('active')) {
    dropdown.classList.remove('active');
  }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  initTheme();
  
  // Add keyboard shortcut for theme toggle (Alt+T)
  document.addEventListener('keydown', function(e) {
    if (e.altKey && e.key === 't') {
      e.preventDefault();
      toggleDarkMode();
    }
    
    // Escape to close motif dropdown
    if (e.key === 'Escape') {
      const dropdown = document.querySelector('.motif-dropdown');
      if (dropdown) {
        dropdown.classList.remove('active');
      }
    }
  });
});