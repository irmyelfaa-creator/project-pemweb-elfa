var album = [

    {
        nama: "THE-SIN: BLISS",
        grup: "ENHYPEN",
        harga: 350000,
        gambar: "enhypen.jpg",
        deskripsi: "Album K-Pop dari ENHYPEN dengan konsep yang menarik."
    },

    {
        nama: "GREENGREEN",
        grup: "CORTIS",
        harga: 300000,
        gambar: "cortis.jpg",
        deskripsi: "Album CORTIS dengan koleksi lagu pilihan."
    },

    {
        nama: "ARIRANG",
        grup: "BTS",
        harga: 300000,
        gambar: "bts.jpg",
        deskripsi: "Album BTS dengan konsep yang tenang dan unik."
    },

    {
        nama: "ARMAGEDDON",
        grup: "AESPA",
        harga: 375000,
        gambar: "aespa.jpg",
        deskripsi: "Album AESPA dengan konsep modern dan futuristik."
    },

    {
        nama: "GO BACK TO THE FUTURE",
        grup: "NCT DREAM",
        harga: 325000,
        gambar: "nct dream.jpg",
        deskripsi: "Album NCT DREAM dengan konsep menarik dan ceria."
    },

    {
        nama: "BOMB",
        grup: "ILLIT",
        harga: 340000,
        gambar: "illit.jpg",
        deskripsi: "Album ILLIT dengan konsep yang elegan dan menarik."
    }

];

var keranjang = [];

function formatHarga(harga) {

    return "Rp" + harga.toLocaleString("id-ID");
}

function tampilkanAlbum() {
    var daftar = document.getElementById("daftarAlbum");
    if (daftar == null) {
        return;
    }

    daftar.innerHTML = "";

    album.forEach(function(data, index) {

        daftar.innerHTML += `

            <article class="kartu">

                <img
                    src="${data.gambar}"
                    alt="Sampul album ${data.nama}"
                >

                <div class="isi-kartu">

                    <h3>
                        ${data.nama}
                    </h3>

                    <p class="grup">
                        ${data.grup}
                    </p>

                    <p class="harga">
                        ${formatHarga(data.harga)}
                    </p>

                    <div class="dua-tombol">

                        <button
                            class="tombol tombol-detail"
                            onclick="lihatDetail(${index})"
                        >
                            Lihat Detail
                        </button>

                        <button
                            class="tombol"
                            onclick="masukkanKeranjang(${index})"
                        >
                            Masukkan
                        </button>

                    </div>

                </div>

            </article>
        `;
    });
}

function tampilkanPilihan() {
    var daftar =
        document.getElementById("albumPilihan");

    if (daftar == null) {
        return;
    }

    daftar.innerHTML = "";

    for (var i = 0; i < 3; i++) {

        daftar.innerHTML += `

            <article class="kartu">

                <img
                    src="${album[i].gambar}"
                    alt="Sampul ${album[i].nama}"
                >

                <div class="isi-kartu">

                    <h3>
                        ${album[i].nama}
                    </h3>

                    <p class="grup">
                        ${album[i].grup}
                    </p>

                    <p class="harga">
                        ${formatHarga(album[i].harga)}
                    </p>

                </div>

            </article>

        `;

    }

}


function lihatDetail(index) {
    var data = album[index];
    Swal.fire({

        title: data.nama,

        html: `

            <img
                src="${data.gambar}"
                alt="${data.nama}"
                style="
                    width:180px;
                    height:220px;
                    object-fit:cover;
                    border-radius:12px;
                    margin-bottom:15px;
                "
            >

            <p>
                <strong>${data.grup}</strong>
            </p>

            <p>
                ${data.deskripsi}
            </p>

            <p>
                <strong>
                    ${formatHarga(data.harga)}
                </strong>
            </p>

        `,

        showCancelButton: true,
        confirmButtonText: "Masukkan ke Keranjang",
        cancelButtonText: "Tutup",
        confirmButtonColor: "#d84d91",
        cancelButtonColor: "#8a7b84"

    }).then(function(hasil) {

        if (hasil.isConfirmed) {

            masukkanKeranjang(index);

        }

    });

}

function masukkanKeranjang(index) {

    var albumDipilih = album[index];

    var sudahAda = false;

    keranjang.forEach(function(data) {

        if (data.nama == albumDipilih.nama) {

            data.jumlah++;

            sudahAda = true;

        }

    });

    if (sudahAda == false) {
        keranjang.push({
            nama: albumDipilih.nama,
            grup: albumDipilih.grup,
            harga: albumDipilih.harga,
            gambar: albumDipilih.gambar,
            jumlah: 1
        });

    }

    tampilkanKeranjang();
    Swal.fire({

        icon: "success",
        title: "Berhasil! 💖",
        text: albumDipilih.nama +
              " berhasil dimasukkan ke keranjang.",

        confirmButtonText: "Oke",
        confirmButtonColor: "#d84d91",
        timer: 1800,
        timerProgressBar: true
    });
}

function tampilkanKeranjang() {
    var isi =
        document.getElementById("isiKeranjang");

    if (isi == null) {
        return;
    }

    isi.innerHTML = "";
    if (keranjang.length == 0) {

        isi.innerHTML = `

            <div class="keranjang-kosong">

                <div>🛒</div>

                <p>
                    Keranjang masih kosong.
                </p>

                <span>
                    Silakan pilih album terlebih dahulu.
                </span>

            </div>

        `;
    }

    else {
        keranjang.forEach(function(data, index) {
            isi.innerHTML += `
                <div class="item-keranjang">

                    <img
                        src="${data.gambar}"
                        alt="${data.nama}"
                    >

                    <div class="info-keranjang">

                        <h4>
                            ${data.nama}
                        </h4>

                        <p>
                            ${data.grup}
                        </p>

                        <p>
                            ${formatHarga(data.harga)}
                        </p>

                    </div>

                    <div class="kontrol-jumlah">

                        <button
                            onclick="kurangiJumlah(${index})"
                        >
                            -
                        </button>

                        <span class="jumlah">
                            ${data.jumlah}
                        </span>

                        <button
                            onclick="tambahJumlah(${index})"
                        >
                            +
                        </button>

                    </div>

                    <button
                        class="hapus"
                        onclick="hapusKeranjang(${index})"
                    >
                        Hapus
                    </button>

                </div>

            `;

        });
    }
    hitungTotal();
}

function tambahJumlah(index) {
    keranjang[index].jumlah++;
    tampilkanKeranjang();
}

function kurangiJumlah(index) {
    if (keranjang[index].jumlah > 1) {
        keranjang[index].jumlah--;
    } 
    
    else {
        hapusKeranjang(index);
        return;
    }

    tampilkanKeranjang();
}

function hapusKeranjang(index) {
    var namaAlbum =
        keranjang[index].nama;

    Swal.fire({

        title: "Hapus album?",

        text:
            namaAlbum +
            " akan dihapus dari keranjang.",

        icon: "warning",

        showCancelButton: true,
        confirmButtonText: "Ya, hapus",
        cancelButtonText: "Batal",
        confirmButtonColor: "#d84d91",
        cancelButtonColor: "#8a7b84"

    }).then(function(hasil) {
        if (hasil.isConfirmed) {

            keranjang.splice(index, 1);

            tampilkanKeranjang();

            Swal.fire({

                icon: "success",

                title: "Album dihapus",

                text:
                    namaAlbum +
                    " sudah dihapus dari keranjang.",

                confirmButtonColor: "#d84d91",

                timer: 1500,

                showConfirmButton: false

            });
        }
    });
}

function hitungTotal() {
    var total = 0;
    keranjang.forEach(function(data) {

        total += data.harga * data.jumlah;

    });

    var totalHarga =
        document.getElementById("totalHarga");

    if (totalHarga != null) {

        totalHarga.innerHTML =
            formatHarga(total);

    }
}

var formPembelian =
    document.getElementById("formPembelian");

if (formPembelian != null) {

    formPembelian.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            var nama =
                document.getElementById(
                    "namaPembeli"
                ).value;

            var metode =
                document.getElementById(
                    "metodePembayaran"
                ).value;

            if (keranjang.length == 0) {

                Swal.fire({

                    icon: "warning",

                    title: "Keranjang masih kosong",

                    text:
                        "Silakan pilih album terlebih dahulu.",

                    confirmButtonColor: "#d84d91"

                });

                return;

            }

            if (nama == "") {

                Swal.fire({

                    icon: "warning",
                    title: "Nama belum diisi",
                    text:
                        "Silakan masukkan nama pembeli.",
                    confirmButtonColor: "#d84d91"
                });

                return;
            }

            if (metode == "") {

                Swal.fire({

                    icon: "warning",

                    title:
                        "Metode pembayaran belum dipilih",

                    text:
                        "Silakan pilih metode pembayaran.",

                    confirmButtonColor: "#d84d91"
                });

                return;
            }

            var total =
                document.getElementById(
                    "totalHarga"
                ).innerHTML;


            Swal.fire({

                icon: "success",
                title: "Pesanan Berhasil! 💗",
                html: `

                    <p>
                        Terima kasih,
                        <strong>${nama}</strong>.
                    </p>

                    <p>
                        Total pesanan:
                        <strong>${total}</strong>
                    </p>

                    <p>
                        Pembayaran:
                        <strong>${metode}</strong>
                    </p>

                    <p>
                        Pesanan kamu sedang diproses.
                    </p>

                `,

                confirmButtonText:
                    "Selesai",

                confirmButtonColor:
                    "#d84d91"

            });

            keranjang = [];
            tampilkanKeranjang();
            formPembelian.reset();

        }
    );
}

var formKontak =
    document.getElementById("formKontak");

if (formKontak != null) {

    formKontak.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            var nama =
                document.getElementById(
                    "namaKontak"
                ).value;

            Swal.fire({

                icon: "success",

                title: "Pesan Berhasil Dikirim! 💌",

                text:
                    "Terima kasih " +
                    nama +
                    ". Pesan kamu sudah diterima.",

                confirmButtonText:
                    "Oke",

                confirmButtonColor:
                    "#d84d91"
            });

            formKontak.reset();
        }
    );
}
tampilkanAlbum();
tampilkanPilihan();
tampilkanKeranjang();