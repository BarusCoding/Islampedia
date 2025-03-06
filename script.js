// Fungsi untuk mendapatkan jadwal shalat dari API (contoh menggunakan jadwalsholat.org)
async function getJadwalShalat(latitude, longitude) {
    const tanggal = new Date().toISOString().split('T')[0];
    const url = `https://api.myquran.com/v1/sholat/jadwal/${latitude}/${longitude}/${tanggal.split('-')[0]}/${tanggal.split('-')[1]}/${tanggal.split('-')[2]}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === "OK") {
            const jadwal = data.data.jadwal;
            document.getElementById('subuh').textContent = jadwal.Subuh;
            document.getElementById('dzuhur').textContent = jadwal.Dzuhur;
            document.getElementById('ashar').textContent = jadwal.Ashar;
            document.getElementById('maghrib').textContent = jadwal.Maghrib;
            document.getElementById('isya').textContent = jadwal.Isya;
            document.getElementById('tanggal').textContent = data.data.tanggal;
        } else {
            console.error('Gagal mendapatkan jadwal shalat:', data.message);
        }
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
    }
}

// Fungsi untuk mendapatkan arah kiblat
function getArahKiblat(latitude, longitude) {
    const kiblat = QiblaDirection.degree(latitude, longitude);
    document.getElementById('kiblat').textContent = `${kiblat.toFixed(2)}°`;
}

// Fungsi untuk mendapatkan lokasi pengguna
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                document.getElementById('lokasi').textContent = `Latitude: ${latitude.toFixed(2)}, Longitude: ${longitude.toFixed(2)}`;
                getJadwalShalat(latitude, longitude);
                getArahKiblat(latitude, longitude);
            },
            (error) => {
                console.error('Gagal mendapatkan lokasi:', error.message);
                document.getElementById('lokasi').textContent = 'Gagal mendapatkan lokasi.';
            }
        );
    } else {
        console.error('Geolocation tidak didukung oleh browser ini.');
        document.getElementById('lokasi').textContent = 'Geolocation tidak didukung.';
    }
}

// Panggil fungsi getLocation saat halaman dimuat
getLocation();
