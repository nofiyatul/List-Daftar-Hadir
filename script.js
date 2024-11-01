// Fungsi untuk menambahkan data ke tabel
function addToTable(name, date, day) {
    const table = document.querySelector("#attendanceTable tbody");
    const row = document.createElement("tr");

    row.innerHTML = `
      <td contenteditable="true">${name}</td>
      <td>${date}</td>
      <td>${day}</td>
      <td><button onclick="deleteRow(this)">Hapus</button></td>
    `;

    table.appendChild(row);
    saveToLocalStorage();
  }

  // Menyimpan data ke Local Storage
  function saveToLocalStorage() {
    const tableData = [];
    document.querySelectorAll("#attendanceTable tbody tr").forEach(row => {
      const name = row.cells[0].textContent;
      const date = row.cells[1].textContent;
      const day = row.cells[2].textContent;
      tableData.push({ name, date, day });
    });
    localStorage.setItem("attendanceList", JSON.stringify(tableData));
  }

  // Memuat data dari Local Storage
  function loadFromLocalStorage() {
    const tableData = JSON.parse(localStorage.getItem("attendanceList")) || [];
    tableData.forEach(item => addToTable(item.name, item.date, item.day));
  }

  // Menghapus baris dari tabel
  function deleteRow(button) {
    button.parentElement.parentElement.remove();
    saveToLocalStorage();
  }

  // Event untuk menambah data baru ke tabel
  document.querySelector("#attendanceForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.querySelector("#name").value;
    const date = document.querySelector("#date").value;
    const day = document.querySelector("#day").value;

    addToTable(name, date, day);

    // Membersihkan form
    this.reset();
  });

  // Memuat data saat halaman dibuka
  loadFromLocalStorage();