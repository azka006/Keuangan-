let dataPembayaran = [];

// Load data dari localStorage saat pertama kali dijalankan
function loadData() {
    let data = localStorage.getItem("dataPembayaran");
    if (data) {
        dataPembayaran = JSON.parse(data);
    }
}

function simpanData() {
    localStorage.setItem("dataPembayaran", JSON.stringify(dataPembayaran));
}

function tambahData() {
    let nama = document.getElementById("nama").value.trim();
    let nominal = document.getElementById("nominal").value.trim();
    let tanggal = document.getElementById("tanggal").value.trim();

    if (nama && nominal && tanggal) {
        dataPembayaran.push({ nama, nominal: parseInt(nominal), tanggal });
        simpanData();
        alert("Data berhasil ditambahkan!");
        document.getElementById("nama").value = "";
        document.getElementById("nominal").value = "";
        document.getElementById("tanggal").value = "";
    } else {
        alert("Harap isi semua kolom!");
    }
}

function hapusSemuaData() {
    localStorage.removeItem("dataPembayaran");
    dataPembayaran = [];
    document.getElementById("dataTable").style.display = "none";
    alert("Semua data telah dihapus!");
}

function cariTotal() {
    let cariNama = document.getElementById("cariNama").value.trim().toLowerCase();
    let hasil = dataPembayaran.filter(item => item.nama.toLowerCase().includes(cariNama));

    if (hasil.length > 0) {
        let tbody = document.getElementById("dataBody");
        tbody.innerHTML = "";

        hasil.forEach(item => {
            let row = `<tr>
                <td>${item.nama}</td>
                <td>${item.nominal.toLocaleString()}</td>
                <td>${item.tanggal}</td>
            </tr>`;
            tbody.innerHTML += row;
        });

        document.getElementById("dataTable").style.display = "table";
    } else {
        alert("Tidak ada data yang ditemukan!");
        document.getElementById("dataTable").style.display = "none";
    }
}

// Load data saat pertama kali aplikasi dibuka
loadData();