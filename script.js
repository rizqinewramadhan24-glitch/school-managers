// Data sekolah dengan contoh data awal
let dataSekolah = [
  { tipe: "guru", nama: "Pak Budi" },
  { tipe: "guru", nama: "Bu Siti" },
  { tipe: "mapel", nama: "Matematika" },
  { tipe: "mapel", nama: "Fisika" },
  { tipe: "ekskul", nama: "Basket" },
  { tipe: "ekskul", nama: "Paskibra" }
];

// Load data dari localStorage jika ada
function loadDataFromStorage() {
  const savedData = localStorage.getItem('schoolData');
  if (savedData) {
    dataSekolah = JSON.parse(savedData);
  }
}

// Save data ke localStorage
function saveDataToStorage() {
  localStorage.setItem('schoolData', JSON.stringify(dataSekolah));
}

// Inisialisasi data dari localStorage
loadDataFromStorage();

// Dark Mode Toggle
function toggleDarkMode() {
  const body = document.body;
  const theme = body.getAttribute("data-theme");
  const newTheme = theme === "light" ? "dark" : "light";
  body.setAttribute("data-theme", newTheme);
  
  // Update toggle button text and icon
  const toggleBtn = document.querySelector('.theme-toggle');
  const icon = toggleBtn.querySelector('i');
  const text = toggleBtn.querySelector('span');
  
  if (newTheme === 'dark') {
    icon.className = 'fas fa-sun';
    text.textContent = 'Light Mode';
  } else {
    icon.className = 'fas fa-moon';
    text.textContent = 'Dark Mode';
  }
  
  showNotification(`Mode ${newTheme === 'dark' ? 'Gelap' : 'Terang'} diaktifkan`, 'success');
}

// Notification System
function showNotification(message, type = 'success') {
  let notification = document.getElementById('notification');
  
  // Create notification element if it doesn't exist
  if (!notification) {
    notification = document.createElement('div');
    notification.id = 'notification';
    document.body.appendChild(notification);
  }
  
  notification.textContent = message;
  notification.className = `notification ${type}`;
  notification.classList.add('show');
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// Update Stats
function updateStats() {
  const mapelCount = dataSekolah.filter(d => d.tipe === 'mapel').length;
  const guruCount = dataSekolah.filter(d => d.tipe === 'guru').length;
  const ekskulCount = dataSekolah.filter(d => d.tipe === 'ekskul').length;
  const totalCount = dataSekolah.length;
  
  document.getElementById('mapelCount').textContent = mapelCount;
  document.getElementById('guruCount').textContent = guruCount;
  document.getElementById('ekskulCount').textContent = ekskulCount;
  document.getElementById('totalCount').textContent = totalCount;
}

// Show All Data
function showAllData() {
  const results = document.getElementById('results');
  
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
    <div class="result-item ${d.tipe}">
      <div class="result-info">
        <div class="result-icon ${d.tipe}">
          ${d.tipe === 'mapel' ? '<i class="fas fa-book-open"></i>' : 
            d.tipe === 'guru' ? '<i class="fas fa-chalkboard-teacher"></i>' : 
            '<i class="fas fa-futbol"></i>'}
        </div>
        <div class="result-text">
          <h4>${d.nama}</h4>
          <p>${d.tipe === 'mapel' ? 'Mata Pelajaran' : 
               d.tipe === 'guru' ? 'Guru' : 
               'Ekstrakurikuler'}</p>
        </div>
      </div>
      <button class="btn btn-danger" onclick="deleteData(${index})">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `).join('');
  
  updateStats();
}

// Search Data
function searchData() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const results = document.getElementById('results');
  
  if (!input.trim()) {
    showAllData();
    return;
  }
  
  const filtered = dataSekolah.filter(d =>
    d.nama.toLowerCase().includes(input) || 
    d.tipe.toLowerCase().includes(input) ||
    (d.tipe === 'mapel' && 'mata pelajaran'.includes(input)) ||
    (d.tipe === 'guru' && 'guru'.includes(input)) ||
    (d.tipe === 'ekskul' && 'ekstrakurikuler'.includes(input))
  );
  
  if (filtered.length === 0) {
    results.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-search"></i>
        <h3>Data tidak ditemukan</h3>
        <p>Tidak ada data yang sesuai dengan pencarian "${input}"</p>
      </div>
    `;
    return;
  }
  
  results.innerHTML = filtered.map(d => `
    <div class="result-item ${d.tipe}">
      <div class="result-info">
        <div class="result-icon ${d.tipe}">
          ${d.tipe === 'mapel' ? '<i class="fas fa-book-open"></i>' : 
            d.tipe === 'guru' ? '<i class="fas fa-chalkboard-teacher"></i>' : 
            '<i class="fas fa-futbol"></i>'}
        </div>
        <div class="result-text">
          <h4>${d.nama}</h4>
          <p>${d.tipe === 'mapel' ? 'Mata Pelajaran' : 
               d.tipe === 'guru' ? 'Guru' : 
               'Ekstrakurikuler'}</p>
        </div>
      </div>
      <button class="btn btn-danger" onclick="deleteData(${dataSekolah.indexOf(d)})">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `).join('');
}

// Add Data
function addData() {
  const tipe = document.getElementById('tipeInput').value.trim();
  const nama = document.getElementById('namaInput').value.trim();
  
  if (!tipe || !nama) {
    showNotification('Silakan isi semua kolom dengan benar!', 'error');
    return;
  }
  
  if (tipe !== 'mapel' && tipe !== 'guru' && tipe !== 'ekskul') {
    showNotification('Tipe harus: mapel / guru / ekskul', 'error');
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
  
  dataSekolah.push({tipe, nama});
  saveDataToStorage();
  
  // Reset form
  document.getElementById('tipeInput').value = '';
  document.getElementById('namaInput').value = '';
  
  // Show all data
  showAllData();
  
  // Show notification
  const tipeText = tipe === 'mapel' ? 'Mata Pelajaran' : 
                  tipe === 'guru' ? 'Guru' : 
                  'Ekstrakurikuler';
  showNotification(`Data ${tipeText} "${nama}" berhasil ditambahkan!`, 'success');
}

// Delete Data
function deleteData(index) {
  if (confirm('Yakin ingin menghapus data ini?')) {
    const deletedItem = dataSekolah[index];
    dataSekolah.splice(index, 1);
    saveDataToStorage();
    showAllData();
    
    const tipeText = deletedItem.tipe === 'mapel' ? 'Mata Pelajaran' : 
                    deletedItem.tipe === 'guru' ? 'Guru' : 
                    'Ekstrakurikuler';
    showNotification(`Data ${tipeText} "${deletedItem.nama}" berhasil dihapus!`, 'success');
  }
}

// Clear All Data
function clearAllData() {
  if (dataSekolah.length === 0) {
    showNotification('Tidak ada data untuk dihapus!', 'warning');
    return;
  }
  
  if (confirm('Apakah Anda yakin ingin menghapus SEMUA data? Tindakan ini tidak dapat dibatalkan!')) {
    dataSekolah = [];
    saveDataToStorage();
    showAllData();
    showNotification('Semua data berhasil dihapus!', 'success');
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Set initial theme based on localStorage or default
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.setAttribute('data-theme', savedTheme);
  
  // Initialize toggle button
  const toggleBtn = document.querySelector('.theme-toggle');
  if (toggleBtn) {
    const icon = toggleBtn.querySelector('i');
    const text = toggleBtn.querySelector('span');
    
    if (savedTheme === 'dark') {
      icon.className = 'fas fa-sun';
      text.textContent = 'Light Mode';
    } else {
      icon.className = 'fas fa-moon';
      text.textContent = 'Dark Mode';
    }
  }
  
  // Show all data
  showAllData();
  
  // Add Enter key functionality for adding data
  const namaInput = document.getElementById('namaInput');
  if (namaInput) {
    namaInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        addData();
      }
    });
  }
  
  // Add Enter key functionality for search
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        searchData();
      }
    });
  }
});

// Save theme preference
function saveThemePreference(theme) {
  localStorage.setItem('theme', theme);
}

// Update toggleDarkMode to save preference
const originalToggleDarkMode = toggleDarkMode;
toggleDarkMode = function() {
  const body = document.body;
  const theme = body.getAttribute("data-theme");
  const newTheme = theme === "light" ? "dark" : "light";
  
  originalToggleDarkMode();
  saveThemePreference(newTheme);
};