let dataSekolah = [
  { tipe: "guru", nama: "Pak Budi" },
  { tipe: "guru", nama: "Bu Siti" },
  { tipe: "mapel", nama: "Matematika" },
  { tipe: "mapel", nama: "Fisika" },
  { tipe: "ekskul", nama: "Basket" },
  { tipe: "ekskul", nama: "Paskibra" }
];

function searchData() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const results = document.getElementById("results");
  results.innerHTML = "";

  const filtered = dataSekolah.filter(item =>
    item.nama.toLowerCase().includes(keyword) ||
    item.tipe.toLowerCase().includes(keyword)
  );

  if (filtered.length === 0) {
    results.innerHTML = "Data tidak ditemukan.";
    return;
  }

  filtered.forEach(item => {
    const div = document.createElement("div");
    div.className = "result-item " + item.tipe;
    div.innerText = item.nama + " (" + item.tipe + ")";
    results.appendChild(div);
  });
}

function showAllData() {
  const results = document.getElementById("results");
  results.innerHTML = "";

  dataSekolah.forEach(item => {
    const div = document.createElement("div");
    div.className = "result-item " + item.tipe;
    div.innerText = item.nama + " (" + item.tipe + ")";
    results.appendChild(div);
  });
}

function addData() {
  const tipe = document.getElementById("tipeInput").value.toLowerCase();
  const nama = document.getElementById("namaInput").value;

  if (tipe === "" || nama === "") {
    alert("Isi semua data!");
    return;
  }

  if (tipe !== "guru" && tipe !== "mapel" && tipe !== "ekskul") {
    alert("Tipe harus: guru / mapel / ekskul");
    return;
  }

  dataSekolah.push({ tipe: tipe, nama: nama });

  document.getElementById("tipeInput").value = "";
  document.getElementById("namaInput").value = "";

  alert("Data berhasil ditambahkan!");
  showAllData();
}

/* DARK MODE PALING AMAN */
function toggleDarkMode() {
  const body = document.body;
  const theme = body.getAttribute("data-theme");

  if (theme === "light") {
    body.setAttribute("data-theme", "dark");
  } else {
    body.setAttribute("data-theme", "light");
  }
}
