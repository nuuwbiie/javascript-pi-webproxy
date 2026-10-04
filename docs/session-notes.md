# Rangkuman Sesi & Catatan Solusi Pengembangan PROXY OS

Dokumen ini merangkum seluruh tahapan diskusi, konfigurasi sistem, solusi kode, serta pencatatan pembaruan data anggota kelompok untuk proyek **PROXY OS — Connect & Deploy (Pekan Ilkomerz 62)**.

---

## 1. Konfigurasi Lingkungan & Eksekusi Lokal

### Masalah Awal & Solusi
1. **Perintah `npm run local` Tidak Dikenal**:
   - `package.json` awalnya hanya menyediakan script `"dev": "vite"`.
   - **Solusi**: Menambahkan script alias `"local": "vite"` ke dalam `package.json` agar `npm run local` dapat langsung menjalankan dev server Vite.

2. **Ketiadaan Node.js & npm pada Environment Awal**:
   - Node.js belum terpasang di sistem pengguna.
   - **Solusi**: Memasang Node.js LTS (v24.19.0) menggunakan Windows Package Manager (`winget install OpenJS.NodeJS.LTS`).
   - Menyelesaikan kendala eksekusi script PowerShell (`PSSecurityException`) dengan memanggil binary langsung via `npm.cmd` dan memastikan `PATH` sistem memuat `C:\Program Files\nodejs`.

3. **Preview Lokal Instan**:
   - Karena folder `dist/` sudah berisi build statis production, dijalankan server HTTP lokal berbasis Python (`python -m http.server 8080`) untuk melayani file secara instan di `http://localhost:8080`.

---

## 2. Modifikasi Kode & Peningkatan Arsitektur

### A. Komponen Portrait & Avatar (`src/components/Portrait.tsx`)
- **Sebelumnya**: Komponen `InitialPortrait` hanya menampilkan inisial teks dengan label statis `"FOTO BELUM DIISI"`.
- **Solusi**: 
  - Menambahkan percabangan logika: Jika `member.photo` tersedia, render elemen `<img>` yang proporsional (`object-fit: cover`).
  - Jika `member.photo` bernilai `undefined`, tampilkan fallback inisial dengan styling gradien modern.

### B. Struktur Data Anggota (`src/data/members.ts`)
- **Sebelumnya**: Seluruh data anggota dibentuk melalui tuple array generik yang menghasilkan placeholder statis.
- **Solusi**:
  - Mengubah struktur data menjadi daftar objek `Member` eksplisit dan ter-type check dengan ketat.
  - Mengintegrasikan data nyata (nama lengkap, nama panggilan, tanggal lahir, asal kota, biografi profesional, minat/keahlian teknis, dan tautan sosial media terverifikasi).
  - Menyediakan flag `isPlaceholder: false` bagi anggota yang datanya telah lengkap agar badge "CONTOH" otomatis hilang.
  - Mengurutkan daftar anggota secara otomatis berdasarkan `id` numerik.

### C. Menu Mulai & Navigasi Cepat (`src/components/StartMenu.tsx`)
- Memperbarui daftar pinned apps dan menu rekomendasi untuk menyertakan nama anggota aktif (`Alarick`, `Pasha`, `Rafi`, `Athena`, `Rafha`, `Anggito`, `Naura`, `Ibnu`, dan `Irsya`).
- Mengarahkan tautan dokumen CV rekomendasi ke berkas PDF anggota yang bersangkutan.

### D. Pengolahan Aset Media & Dokumen ATS
- Membuat direktori publik `public/members/` untuk foto profil dan `public/cvs/` untuk dokumen CV ATS PDF.
- **Ekstraksi & Konversi**:
  - Memanfaatkan pustaka Python (`Pillow`) untuk melakukan cropping pasfoto langsung dari lembar CV yang berformat gambar (contoh: Naura Dwi Khalisya).
  - Memanfaatkan `pypdf` untuk mengekstrak foto beresolusi tinggi langsung dari stream halaman PDF (contoh: Muhammad Irsya Zaelani).
  - Menyinkronkan seluruh aset ke direktori `dist/` dan melakukan automated build (`npm run build`) setiap kali terjadi penambahan data.

---

## 3. Log Pembaruan Data Anggota

| ID | Nama Anggota | Panggilan | Asal Kota | Tanggal Lahir | Status Foto | Status CV ATS |
|---|---|---|---|---|---|---|
| **01** | Apta Adi Nur Fiansah (PJK) | Apta | Jakarta Barat | 5 Juni 2005 | *Pending* (Inisial aktif) | *Pending* (Fallback aktif) |
| **02** | Muhammad Alarick Irham | Alarick | Jakarta Timur | 22 Juni 2007 | Lengkap (`alarick.jpg`) | Lengkap (`alarick.pdf`) |
| **03** | Pasha Haris Akhir | Pasha | Jakarta Selatan | 11 Agustus 2007 | Lengkap (`pasha.jpg`) | Lengkap (`pasha.pdf`) |
| **04** | Muhammad Rafi Al Arifi | Rafi | Bogor | 22 Desember 2006 | Lengkap (`rafi.jpg`) | Lengkap (`rafi.pdf`) |
| **05** | *Menunggu Biodata* | - | - | - | Lengkap (`anggota05.jpg`) | ⏳ *Pending* |
| **06** | Athena Lovelyta Jasmine | Athena | Kota Bogor | 11 Desember 2006 | Lengkap (`athena.jpg`) | Lengkap (`athena.pdf`) |
| **07** | Auffa Rafha Pradana | Rafha | Jakarta Selatan | 16 September 2006 | Lengkap (`auffa.jpg`) | Lengkap (`auffa.pdf`) |
| **08** | Anggito Abimanyu | Anggito | Kota Bekasi | 11 April 2007 | Lengkap (`anggito.jpg`) | Lengkap (`anggito.pdf`) |
| **09** | Naura Dwi Khalisya | Naura | Serang | 5 Desember 2006 | Lengkap (`naura.jpg`) | Lengkap (`naura.pdf`) |
| **10** | Aziz Putra Sadhevi | Aziz | Kota Bengkulu | 1 September 2006 | Lengkap (`aziz.jpg`) | Lengkap (`aziz.pdf`) |
| **11** | Ibnu Rizqi Indra Daniswara | Ibnu | Depok | 23 April 2007 | Lengkap (`ibnu.jpg`) | Lengkap (`ibnu.pdf`) |
| **12** | Muhammad Irsya Zaelani | Irsya | Tangerang | 20 Maret 2007 | Lengkap (`irsya.jpg` - Resmi) | Lengkap (`irsya.pdf`) |

---

## 4. Item yang Masih Tertunda (Pending Tasks)

1. **Pengisian Data Anggota yang Belum Masuk**:
   - Anggota 05 (Tinggal 1 anggota lagi menuju 12 anggota penuh)
2. **Kelengkapan Berkas Susulan**:
   - **Anggota 01 (Apta Adi Nur Fiansah)**: Foto profil & berkas PDF CV ATS.
3. **Penyelarasan Akhir**:
   - Menghapus entri `rawMembers` sepenuhnya setelah seluruh 12 anggota terisi.
   - Verifikasi akhir tautan sosial media dan tampilan cetak CV PDF di production.

---

## 5. Implementasi Redesain Tampilan Mobile (SVG Concept Revamp)

Berdasarkan rancangan SVG interaktif (`mobile_design.svg`, resolusi standar `360 x 780` px), tampilan ponsel PROXY OS telah dirombak total dari model daftar vertikal klasik menjadi **Windows 11 Mobile Launcher** yang modern, elegan, dan fungsional:

### Elemen Antarmuka Baru
1. **Status Bar (Bagian Atas)**:
   - Jam digital dengan warna aksen Fluent (`#D4EDFF`).
   - Tombol toggle mode responsif (`Mode Desktop`) yang memungkinkan pengguna beralih kapan saja ke antarmuka Desktop Windows 11.
   - Ikon vektor presisi: Sinyal seluler 5-bar, Wi-Fi tray, dan kapsul baterai.

2. **Widget Jam & Cuaca (Area Atas / Upper Center)**:
   - Tampilan jam digital besar (`HH:mm`) dengan efek drop-shadow mendalam.
   - Pemisah titik (`•`) dan widget cuaca (`27°` dengan ikon cuaca cerah berawan).
   - Subtitle tanggal dinamis ("Tuesday, 18 September" / format kalender aktif).

3. **Grid Aplikasi Utama (Baris 4 Ikon Atas)**:
   - **Phone**: Membuka modal kontak tim dengan daftar 12 anggota, pasfoto/inisial, peran, tautan langsung ke Instagram (`@username`), dan CV ATS viewer.
   - **To Do**: Membuka aplikasi Notepad/Catatan Sambutan tim.
   - **OneDrive**: Membuka File Explorer untuk eksplorasi berkas digital tim.
   - **Microsoft Folder**: Wadah frosted glass dengan 4 mini icon (Word, Excel, PowerPoint, OneNote) yang membuka popover suite aplikasi.

4. **Widget Pencarian Akrilik (Search Bar)**:
   - Pill container frosted glass gelap (`rgba(32, 32, 32, 0.72)`) dengan `backdrop-filter: blur(30px)`.
   - Ikon Bing Search di kiri, input pencarian live, tombol clear (`X`), serta ikon Lens/Kamera dan Mikrofon di kanan.
   - **Pencarian Real-Time**: Mengetik kata kunci langsung menampilkan dropdown hasil pencarian untuk seluruh 12 anggota (berdasarkan nama, panggilan, kota asal, keahlian) dan aplikasi OS.
   - Garis indikator gestur horizontal di bawah search bar.

5. **Bottom Dock (Baris 4 Aplikasi Favorit)**:
   - Ikon Edge (Membuka Links & Repo)
   - Ikon Photos (Membuka Galeri Kenangan)
   - Ikon File Explorer (Membuka direktori 12 Anggota Tim)
   - Ikon CV ATS (Membuka dokumen CV tim)

6. **Home Gesture Indicator**:
   - Batang gestur navigasi putih rounded di bagian bawah layar.

---

## 6. Perbaikan Bug & Penutupan Berkas `Welcome.txt` Melalui Tombol 'X' Merah

### Akar Masalah (Root Cause)
- Pada [src/components/Desktop.tsx](file:///C:/Users/Pasha/Downloads/javascript-pi-webproxy-main/javascript-pi-webproxy-main/src/components/Desktop.tsx), terdapat efek:
  ```tsx
  useEffect(() => {
    if (state.windows.length === 0) {
      openApp('welcome')
    }
  }, [openApp, state.windows.length])
  ```
- **Dampak Bug**: Setiap kali pengguna mengklik tombol 'X' merah untuk menutup jendela `Welcome.txt`, jumlah jendela aktif (`state.windows.length`) menjadi `0`. Efek tersebut langsung terpancing lagi dan membuka ulang `Welcome.txt` seketika. Akibatnya seolah-olah tombol 'X' tidak berfungsi atau berkas tidak dapat ditutup.

### Solusi yang Diterapkan
1. **Otomatis Terbuka Hanya Saat Pertama Kali Masuk Web**:
   - Mengganti pemantauan `state.windows.length` dengan modul flag `hasAutoOpenedWelcome = false`.
   - `Welcome.txt` otomatis terbuka hanya satu kali saat web pertama kali dimuat.
   - Ketika pengguna menutup jendela `Welcome.txt` (atau semua jendela ditutup), sistem tidak lagi membuka ulang secara paksa. Pengguna tetap dapat membukanya kembali sewaktu-waktu melalui shortcut Desktop, Start Menu, atau Taskbar.

2. **Fungsi Tutup File Terpusat pada Tombol 'X' Merah di Titlebar**:
   - Menghapus seluruh tombol custom "Tutup File" tambahan di dalam teks Notepad maupun di menu bar, sehingga antarmuka Notepad kembali murni, bersih, dan autentik sesuai Windows 11 asli (`File`, `Edit`, `View`).
   - Penutupan berkas dikontrol secara eksklusif oleh tombol caption **'X' merah** standar pada Window Frame ([src/components/WindowFrame.tsx](file:///C:/Users/Pasha/Downloads/javascript-pi-webproxy-main/javascript-pi-webproxy-main/src/components/WindowFrame.tsx)):
     - Menjalankan action `close(item.id)` dari `WindowContext`.
     - Memiliki styling hover merah khas Windows 11 (`.win11-caption-btn.win11-close:hover` dengan latar belakang `#e81123 !important` dan teks/ikon putih).
     - Menutup jendela seketika dan bersih tanpa adanya loop buka-kembali.---

## 7. Penyelarasan Taskbar Bawah Sesuai Desain Vektor SVG (Windows 11)

Berdasarkan berkas spesifikasi SVG (`width="1920" height="60" viewBox="0 0 1920 60"`), bilah bawah (Taskbar) telah disesuaikan secara presisi:

### Perubahan & Spesifikasi:
1. **Dimensi & Latar Belakang Acrylic**:
   - Tinggi taskbar ditetapkan menjadi `60px` dengan warna latar belakang akrilik `#CAD4E7` (`rgba(202, 212, 231, 0.94)` dan `backdrop-filter: blur(30px)`).
   - Penyesuaian batas jendela maksimal (`inset: 0 0 60px 0`), posisi Start Menu (`bottom: 68px`), Quick Settings (`bottom: 68px`), dan watermark desktop (`bottom: 72px`).

2. **Sisi Kiri (Weather Widget)**:
   - Menggunakan vektor Sun + Cloud langsung dari SVG.
   - Menampilkan teks cuaca presisi: Suhu `28°C` dan deskripsi `"Partly Sunny"` dengan teks gelap kontras `#000000`.

3. **Sisi Tengah (Center App Icons & Brand Gradients)**:
   - **Start Button**: Mengadopsi gradien linier resmi 3-stop Windows 11 (`#8AECF6` -> `#24B8E7` -> `#3774C4`).
   - **Search Button**: Diubah dari bentuk capsule pill teks menjadi tombol ikon kaca pembesar murni (`#1F1F1F`) sesuai SVG.
   - **Task View**: Menampilkan dua persegi bertumpuk (persegi belakang bergradien gelap dan persegi depan putih transparan `0.6`).
   - **Teams / Chat**: Gelembung percakapan ungu gradien dengan kamera video putih terpusat.
   - **File Explorer**: Folder bergradien kuning hangat dengan aksen base bawah biru `#036ABB`.
   - **Microsoft Edge**: Swirl ombak bergradien multi-stop radial dan linier.

4. **Sisi Kanan (System Tray & Live Clock)**:
   - Ikon Chevron (`^`) tombol *Show hidden icons*.
   - Cluster pengaturan cepat: Sinyal Wi-Fi 4-lengkung, ikon speaker volume dengan 2 gelombang suara, dan kapsul baterai horizontal.
   - Jam digital live dengan format `hh:mm A` (contoh: `11:00 AM`) dan tanggal live berformat `MM/DD/YYYY` (contoh: `10/05/2021`).

