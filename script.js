// ============================================
// SCHOOL MANAGER v3.0 - Main Script
// ============================================

// Data sekolah dengan contoh data awal
let dataSekolah = [
  { tipe: "guru", nama: "Pak Budi" },
  { tipe: "guru", nama: "Bu Siti" },
  { tipe: "mapel", nama: "Matematika" },
  { tipe: "mapel", nama: "Fisika" },
  { tipe: "ekskul", nama: "Basket" },
  { tipe: "ekskul", nama: "Paskibra" }
];

// ============== LOCAL STORAGE FUNCTIONS ==============
function loadDataFromStorage() {
  try {
    const savedData = localStorage.getItem('schoolData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (Array.isArray(parsed)) {
        dataSekolah = parsed;
      }
    }
  } catch (e) {
    console.error('Error loading data:', e);
  }
}

function saveDataToStorage() {
  try {
    localStorage.setItem('schoolData', JSON.stringify(dataSekolah));
  } catch (e) {
    console.error('Error saving data:', e);
  }
}

// ============== THEME FUNCTIONS ==============
function toggleDarkMode() {
  const body = document.body;
  const currentTheme = body.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Update toggle button
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    const icon = themeToggle.querySelector('i');
    const text = themeToggle.querySelector('span');
    
    if (newTheme === 'dark') {
      icon.className = 'fas fa-sun';
      text.textContent = 'Light Mode';
    } else {
      icon.className = 'fas fa-moon';
      text.textContent = 'Dark Mode';
    }
  }
  
  showNotification(`Mode ${newTheme === 'dark' ? 'gelap' : 'terang'} diaktifkan`, 'success');
}

function loadTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.setAttribute('data-theme', savedTheme);
  
  // Set toggle button state
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
}

// ============== MOTIF FUNCTIONS ==============
function toggleMotifDropdown() {
  const dropdown = document.querySelector('.motif-dropdown');
  if (dropdown) {
    dropdown.classList.toggle('active');
  }
}

function changeMotif(motif) {
  document.body.setAttribute('data-motif', motif);
  localStorage.setItem('motif', motif);
  
  // Update current motif display
  const currentMotifEl = document.getElementById('currentMotif');
  if (currentMotifEl) {
    currentMotifEl.textContent = motif.charAt(0).toUpperCase() + motif.slice(1);
  }
  
  // Close dropdown
  const dropdown = document.querySelector('.motif-dropdown');
  if (dropdown) {
    dropdown.classList.remove('active');
  }
  
  showNotification(`Motif "${motif}" diterapkan`, 'success');
}

function loadMotif() {
  const savedMotif = localStorage.getItem('motif') || 'default';
  document.body.setAttribute('data-motif', savedMotif);
  
  // Update current motif display
  const currentMotifEl = document.getElementById('currentMotif');
  if (currentMotifEl) {
    currentMotifEl.textContent = savedMotif.charAt(0).toUpperCase() + savedMotif.slice(1);
  }
}

// ============== NOTIFICATION SYSTEM ==============
function showNotification(message, type = 'success', duration = 3000) {
  // Remove existing notification
  const oldNotification = document.getElementById('notification');
  if (oldNotification) {
    oldNotification.remove();
  }
  
  // Create new notification
  const notification = document.createElement('div');
  notification.id = 'notification';
  notification.className = `notification ${type}`;
  
  // Add icon based on type
  let icon = 'fas fa-check-circle';
  if (type === 'error') icon = 'fas fa-exclamation-circle';
  if (type === 'warning') icon = 'fas fa-exclamation-triangle';
  if (type === 'info') icon = 'fas fa-info-circle';
  
  notification.innerHTML = `<i class="${icon}"></i> ${message}`;
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Auto hide after duration
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, duration);
  
  // Allow clicking to dismiss
  notification.addEventListener('click', () => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  });
}

// ============== STATS FUNCTIONS ==============
function updateStats() {
  try {
    const mapelCount = dataSekolah.filter(d => d.tipe === 'mapel').length;
    const guruCount = dataSekolah.filter(d => d.tipe === 'guru').length;
    const ekskulCount = dataSekolah.filter(d => d.tipe === 'ekskul').length;
    const totalCount = dataSekolah.length;
    
    const mapelEl = document.getElementById('mapelCount');
    const guruEl = document.getElementById('guruCount');
    const ekskulEl = document.getElementById('ekskulCount');
    const totalEl = document.getElementById('totalCount');
    
    if (mapelEl) mapelEl.textContent = mapelCount;
    if (guruEl) guruEl.textContent = guruCount;
    if (ekskulEl) ekskulEl.textContent = ekskulCount;
    if (totalEl) totalEl.textContent = totalCount;
  } catch (e) {
    console.error('Error updating stats:', e);
  }
}

// ============== DATA DISPLAY FUNCTIONS ==============
function showAllData() {
  const results = document.getElementById('results');
  if (!results) return;
  
  if (dataSekolah.length === 0) {
    results.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-database"></i>
        <h3>Belum ada data</h3>
        <p>Tambahkan data baru menggunakan form di samping</p>
      </div>
    `;
    updateStats();
    return;
  }
  
  results.innerHTML = dataSekolah.map((d, index) => `
    <div class="result-item ${d.tipe}" data-index="${index}">
      <div class="result-info">
        <div class="result-icon ${d.tipe}">
          ${d.tipe === 'mapel' ? '<i class="fas fa-book-open"></i>' : 
            d.tipe === 'guru' ? '<i class="fas fa-chalkboard-teacher"></i>' : 
            '<i class="fas fa-futbol"></i>'}
        </div>
        <div class="result-text">
          <h4>${escapeHtml(d.nama)}</h4>
          <p>${d.tipe === 'mapel' ? 'Mata Pelajaran' : 
               d.tipe === 'guru' ? 'Guru' : 
               'Ekstrakurikuler'}</p>
        </div>
      </div>
      <button class="btn btn-danger" onclick="deleteData(${index})" aria-label="Hapus data">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `).join('');
  
  updateStats();
}

function searchData() {
  const input = document.getElementById('searchInput');
  if (!input) return;
  
  const searchTerm = input.value.toLowerCase().trim();
  const results = document.getElementById('results');
  if (!results) return;
  
  if (!searchTerm) {
    showAllData();
    return;
  }
  
  const filtered = dataSekolah.filter(d => {
    const namaMatch = d.nama.toLowerCase().includes(searchTerm);
    const tipeText = d.tipe === 'mapel' ? 'mata pelajaran' : 
                    d.tipe === 'guru' ? 'guru' : 
                    'ekstrakurikuler';
    const tipeMatch = tipeText.includes(searchTerm);
    return namaMatch || tipeMatch;
  });
  
  if (filtered.length === 0) {
    results.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-search"></i>
        <h3>Data tidak ditemukan</h3>
        <p>Tidak ada data yang sesuai dengan pencarian "${escapeHtml(searchTerm)}"</p>
      </div>
    `;
    return;
  }
  
  results.innerHTML = filtered.map(d => {
    const index = dataSekolah.findIndex(item => 
      item.tipe === d.tipe && item.nama === d.nama
    );
    
    return `
      <div class="result-item ${d.tipe}" data-index="${index}">
        <div class="result-info">
          <div class="result-icon ${d.tipe}">
            ${d.tipe === 'mapel' ? '<i class="fas fa-book-open"></i>' : 
              d.tipe === 'guru' ? '<i class="fas fa-chalkboard-teacher"></i>' : 
              '<i class="fas fa-futbol"></i>'}
          </div>
          <div class="result-text">
            <h4>${escapeHtml(d.nama)}</h4>
            <p>${d.tipe === 'mapel' ? 'Mata Pelajaran' : 
                 d.tipe === 'guru' ? 'Guru' : 
                 'Ekstrakurikuler'}</p>
          </div>
        </div>
        <button class="btn btn-danger" onclick="deleteData(${index})" aria-label="Hapus data">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
  }).join('');
}

// ============== DATA OPERATIONS ==============
function addData() {
  const tipeSelect = document.getElementById('tipeInput');
  const namaInput = document.getElementById('namaInput');
  
  if (!tipeSelect || !namaInput) return;
  
  const tipe = tipeSelect.value.trim();
  const nama = namaInput.value.trim();
  
  if (!tipe || !nama) {
    showNotification('Silakan isi semua kolom dengan benar!', 'error');
    return;
  }
  
  if (!['mapel', 'guru', 'ekskul'].includes(tipe)) {
    showNotification('Tipe data harus: mapel, guru, atau ekskul', 'error');
    return;
  }
  
  // Check for duplicates
  const isDuplicate = dataSekolah.some(d => 
    d.tipe === tipe && d.nama.toLowerCase() === nama.toLowerCase()
  );
  
  if (isDuplicate) {
    showNotification(`Data ${nama} sudah ada dalam sistem!`, 'warning');
    return;
  }
  
  // Add data
  dataSekolah.push({ tipe, nama });
  saveDataToStorage();
  
  // Clear form
  tipeSelect.value = '';
  namaInput.value = '';
  namaInput.focus();
  
  // Update display
  showAllData();
  
  // Show success message
  const tipeText = tipe === 'mapel' ? 'Mata Pelajaran' : 
                  tipe === 'guru' ? 'Guru' : 
                  'Ekstrakurikuler';
  showNotification(`${tipeText} "${nama}" berhasil ditambahkan!`, 'success');
}

function deleteData(index) {
  if (index < 0 || index >= dataSekolah.length) {
    showNotification('Data tidak ditemukan!', 'error');
    return;
  }
  
  if (!confirm('Yakin ingin menghapus data ini?')) {
    return;
  }
  
  const deletedItem = dataSekolah[index];
  dataSekolah.splice(index, 1);
  saveDataToStorage();
  
  // Update display
  showAllData();
  
  // Show success message
  const tipeText = deletedItem.tipe === 'mapel' ? 'Mata Pelajaran' : 
                  deletedItem.tipe === 'guru' ? 'Guru' : 
                  'Ekstrakurikuler';
  showNotification(`${tipeText} "${deletedItem.nama}" berhasil dihapus!`, 'success');
}

function clearAllData() {
  if (dataSekolah.length === 0) {
    showNotification('Tidak ada data untuk dihapus!', 'warning');
    return;
  }
  
  if (!confirm('Apakah Anda yakin ingin menghapus SEMUA data?\nTindakan ini tidak dapat dibatalkan!')) {
    return;
  }
  
  dataSekolah = [];
  saveDataToStorage();
  showAllData();
  showNotification('Semua data berhasil dihapus!', 'success');
}

// ============== HELP FUNCTION ==============
function showHelp() {
  showNotification(`
    <div style="text-align: left;">
      <h4 style="margin-bottom: 10px;">🆘 Bantuan School Manager</h4>
      <p><strong>Fitur Utama:</strong></p>
      <ul style="margin: 8px 0 8px 20px;">
        <li>📊 Tambah data mata pelajaran, guru, dan ekskul</li>
        <li>🔍 Pencarian instan dengan kata kunci</li>
        <li>🌙 Dark/Light mode toggle</li>
        <li>🎨 6 pilihan tema motif</li>
        <li>💾 Data tersimpan otomatis di browser</li>
        <li>📱 Install sebagai aplikasi (PWA)</li>
      </ul>
      <p><strong>Navigasi:</strong></p>
      <ul style="margin: 8px 0 8px 20px;">
        <li>• Klik "Portfolio Page" untuk kembali ke halaman portfolio</li>
        <li>• Gunakan shortcut <kbd>Ctrl + S</kbd> untuk mencari</li>
        <li>• <kbd>Ctrl + H</kbd> untuk bantuan ini</li>
        <li>• <kbd>Ctrl + I</kbd> untuk install aplikasi</li>
      </ul>
    </div>
  `, 'info', 10000);
}

// ============== UTILITY FUNCTIONS ==============
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function closeAllDropdowns() {
  const dropdowns = document.querySelectorAll('.motif-dropdown.active');
  dropdowns.forEach(dropdown => {
    dropdown.classList.remove('active');
  });
}

// ============== INITIALIZATION ==============
function init() {
  // Load data
  loadDataFromStorage();
  
  // Load theme and motif
  loadTheme();
  loadMotif();
  
  // Show initial data
  showAllData();
  
  // Set up event listeners
  document.addEventListener('DOMContentLoaded', () => {
    // Enter key for adding data
    const namaInput = document.getElementById('namaInput');
    if (namaInput) {
      namaInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          addData();
        }
      });
    }
    
    // Enter key for search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          searchData();
        }
      });
      
      // Real-time search on input
      searchInput.addEventListener('input', () => {
        const value = searchInput.value.trim();
        if (value.length >= 2 || value.length === 0) {
          searchData();
        }
      });
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl + H for Help
      if (e.ctrlKey && e.key === 'h') {
        e.preventDefault();
        showHelp();
      }
      
      // Ctrl + S for Search focus
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
          searchInput.focus();
        }
      }
      
      // Ctrl + I for Install (handled in HTML)
      if (e.ctrlKey && e.key === 'i') {
        e.preventDefault();
        // Install button will handle this if visible
      }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.motif-dropdown')) {
        closeAllDropdowns();
      }
    });
    
    // Show welcome message
    setTimeout(() => {
      showNotification('🎉 Selamat datang di School Manager v3.0!', 'success');
    }, 1000);
  });
}

// ============== PWA INSTALLATION ==============
function installPWA() {
  // This function is handled by the PWA script in index.html
  // It will be triggered by the install button
  console.log('Install PWA function called');
}

// Initialize the application
init();