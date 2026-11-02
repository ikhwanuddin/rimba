/* RIMBA: English interface texts, keyed by the Indonesian text in the code (see i18n.ts). */
const EN: Record<string, string> = {
  // login, profile, errors
  "Nama pengguna atau kata sandi salah": "Wrong username or password",
  "Nama pengguna": "Username",
  "Kata sandi": "Password",
  Masuk: "Log in",
  "Belum punya akun? Hubungi pengelola proyek.":
    "No account yet? Contact the project manager.",
  Profil: "Profile",
  "Profil kamu": "Your profile",
  "Nama tampil di bagian atas halaman. Nama pengguna dipakai untuk masuk dan tidak bisa diubah di sini.":
    "Your name appears at the top of the page. The username is used to log in and cannot be changed here.",
  "Ganti kata sandi": "Change password",
  "Kata sandi baru": "New password",
  "Ulangi kata sandi baru": "Repeat new password",
  "Minimal 8 karakter": "At least 8 characters",
  "Kata sandi tidak sama": "Passwords do not match",
  "Kata sandi diganti.": "Password changed.",
  Simpan: "Save",
  Keluar: "Log out",
  "Ada yang tidak beres": "Something went wrong",
  "Coba lagi": "Try again",
  "Kembali ke Beranda": "Back to Home",
  "Halaman ini gagal dimuat. Coba lagi, atau kabari pengelola proyek dengan menyertakan pesan di bawah ini:":
    "This page failed to load. Try again, or tell the project manager and include the message below:",
  "Halaman tidak ditemukan": "Page not found",
  "Alamat ini tidak ada atau sudah dipindah.":
    "This address does not exist or has moved.",
  "Catatan:": "Note:",

  // top bar
  Beranda: "Home",
  Tentang: "About",
  Kelola: "Manage",
  "1. Rekaman audio": "1. Audio recordings",
  "File audio yang terdaftar di server. Bahan untuk membuat proyek.":
    "Audio files registered on the server. Material for making projects.",
  "2. Proyek anotasi": "2. Annotation projects",
  "Pekerjaan anotasi: klip yang ditanyakan, label, petunjuk, dan jawaban.":
    "Annotation work: the clips asked about, labels, instructions and answers.",
  "Ganti bahasa": "Change language",

  // about
  "RIMBA adalah platform anotasi bioakustik untuk rekaman suara hutan hujan Indonesia dan Asia Tenggara: mesin mendeteksi suara, manusia memastikan. Proyek pertamanya Way Canguk, Taman Nasional Bukit Barisan Selatan, Lampung, dengan rekaman dari perekam multikanal MAARU. Bagian dari proyek PhD di Dyson School of Design Engineering, Imperial College London, bersama Wildlife Conservation Society – Indonesia Program.":
    "RIMBA is a bioacoustic annotation platform for rainforest sound recordings from Indonesia and Southeast Asia: machines detect the sounds, people confirm them. Its first project is Way Canguk, Bukit Barisan Selatan National Park, Lampung, with recordings from MAARU multichannel recorders. Part of a PhD project at the Dyson School of Design Engineering, Imperial College London, with the Wildlife Conservation Society – Indonesia Program.",
  "Asal-usul": "Origins",
  "RIMBA dibangun di atas": "RIMBA is built on",
  "0.9.0 karya Santiago Martínez Balvanera dkk., alat anotasi audio sumber terbuka berlisensi GPL-3.0. RIMBA memakai lisensi yang sama;":
    "0.9.0 by Santiago Martínez Balvanera et al., an open-source audio annotation tool licensed under GPL-3.0. RIMBA uses the same licence;",
  "kode sumbernya terbuka": "its source code is open",
  ". Yang berbeda dari Whombat:": ". What differs from Whombat:",
  "Satu pertanyaan per klip": "One question per clip",
  "Halaman anotasi hanya menanyakan apakah suara di dalam kotak adalah spesies yang tertulis. Jawabannya Ya, Tidak, atau Tidak yakin (tombol 1, 2, 3); label kotak bisa diganti bila perlu.":
    "The annotation page only asks whether the sound in the box is the species written on it. The answer is Yes, No or Not sure (keys 1, 2, 3); the box label can be changed when needed.",
  "Antrean klip bersama": "Shared clip queue",
  "Setiap anotator mendapat klip berikutnya yang belum dijawab dan tidak sedang dibuka orang lain, jadi satu klip dijawab satu orang. Klip yang dibuka tetapi tidak dijawab dalam 30 menit kembali ke antrean.":
    "Each annotator gets the next clip that is unanswered and not open by someone else, so each clip is answered by one person. A clip opened but not answered within 30 minutes goes back to the queue.",
  "Daftar diskusi": "Discussion list",
  "Jumlah jawaban Tidak yakin tampil di beranda sebagai bahan diskusi bersama tim.":
    "The number of Not sure answers shows on the home page, for discussion with the team.",
  "Progres tim, jawabanmu, jawaban per hari, dan perkiraan kapan semua klip selesai.":
    "Team progress, your answers, answers per day, and an estimate of when all clips will be done.",
  Tampilan: "Interface",
  "Bahasa Indonesia dan Inggris, warna label yang mudah dibaca, dan menu admin yang disembunyikan dari anotator.":
    "Indonesian and English, easy-to-read label colours, and admin menus hidden from annotators.",
  "Jawaban disimpan di server proyek dan dicadangkan setiap hari. Situs hanya bisa dibuka oleh email yang terdaftar.":
    "Answers are stored on the project server and backed up every day. Only registered email addresses can open the site.",

  // home dashboard
  "Halo,": "Hello,",
  "Memuat proyek…": "Loading projects…",
  "Belum ada proyek anotasi.": "No annotation projects yet.",
  "Buka proyek →": "Open project →",
  "Lanjutkan anotasi →": "Continue annotating →",
  "Mulai anotasi →": "Start annotating →",
  "progres tim": "team progress",
  "Jawaban tim": "Team answers",
  Jawabanmu: "Your answers",
  "dari {n} klip": "of {n} clips",
  "dari {n} jawaban tim": "of {n} team answers",
  "Hari ini": "Today",
  "seluruh tim": "whole team",
  "tim: {n}": "team: {n}",
  "Sisa klip": "Clips left",
  "Perlu didiskusikan": "To discuss",
  "jawaban tidak yakin": "not sure answers",
  "jawabanmu tidak yakin": "your not sure answers",
  "Komposisi jawaban": "Answer mix",
  "Per anotator": "Per annotator",
  "Belum ada jawaban.": "No answers yet.",
  "semua klip sudah terjawab": "all clips answered",
  "belum ada jawaban 7 hari terakhir": "no answers in the last 7 days",
  "± {n} hari lagi pada laju 7 hari terakhir":
    "± {n} more days at the last 7 days' pace",
  "Klip terjawab per hari (14 hari, WIB)":
    "Clips answered per day (14 days, WIB)",
  "{day}: {n} klip (kamu {mine})": "{day}: {n} clips (you {mine})",
  klip: "clips",
  kamu: "you",
  jawabanmu: "yours",
  tim: "team",
  ya: "yes",
  tidak: "no",
  "tidak yakin": "not sure",
  Ya: "Yes",
  Tidak: "No",
  "Tidak yakin": "Not sure",

  // annotator page
  "Apakah suara di dalam kotak adalah": "Is the sound in the box a",
  "Spasi = putar/jeda.": "Space = play/pause.",
  'Jawaban tersimpan: "{a}".': 'Answer saved: "{a}".',
  "Kamu sudah menjawab {mine} · sisa proyek {left} dari {total}":
    "You have answered {mine} · project left {left} of {total}",
  "← Sebelumnya": "← Previous",
  "Berikutnya →": "Next →",
  "Tutup petunjuk": "Close instructions",
  Petunjuk: "Instructions",
  "Memuat klip…": "Loading clip…",
  "Tidak ada klip tersisa untukmu. Terima kasih!":
    "No clips left for you. Thank you!",
  "Klip ini sudah dialihkan ke anotator lain karena terlalu lama dibuka. Lanjut ke klip berikutnya.":
    "This clip was passed to another annotator because it was open too long. Moving on to the next clip.",
  "Gagal mengambil klip berikutnya. Coba muat ulang halaman.":
    "Could not get the next clip. Try reloading the page.",
  "Gagal menyimpan jawaban. Coba lagi.":
    "Could not save the answer. Try again.",
  "Gagal mengganti label. Coba lagi.": "Could not change the label. Try again.",
  "Label diganti: {v}": "Label changed: {v}",
  "(tanpa label)": "(no label)",
  Tutup: "Close",
  "Yakin itu spesies lain? Ganti label kotak":
    "Sure it is another species? Change the box label",
  "Catatan (opsional)": "Note (optional)",
  "Belum ada kotak terpilih; klik kotak untuk melihat detailnya.":
    "No box selected; click a box to see its details.",

  // admin annotation view
  "Label berkas": "File labels",
  "Klip sebelumnya": "Previous clip",
  "Ke klip sebelumnya. Keadaan klip ini tetap tersimpan.":
    "Go to the previous clip. This clip's state stays saved.",
  "Klip berikutnya": "Next clip",
  "Ke klip berikutnya. Keadaan klip ini tetap tersimpan.":
    "Go to the next clip. This clip's state stays saved.",
  "Pilih kotak": "Select box",
  "Mode pilih: klik kotak untuk memilihnya.":
    "Select mode: click a box to select it.",
  "Tambah kotak": "Add box",
  "Mode gambar kotak: klik di spektrogram untuk membuat kotak baru.":
    "Draw mode: click on the spectrogram to make a new box.",
  "Hapus kotak": "Delete box",
  "Mode hapus: klik kotak untuk menghapusnya.":
    "Delete mode: click a box to delete it.",
  Perbesar: "Zoom",
  "Mode perbesar: tarik persegi untuk memperbesar bagian spektrogram.":
    "Zoom mode: drag a rectangle to zoom into part of the spectrogram.",
  "Putar/jeda": "Play/pause",
  "Putar atau jeda audio": "Play or pause the audio",
  "Cari klip": "Find clip",
  "Cari klip lewat UUID-nya: tempel lalu tekan Enter.":
    "Find a clip by its UUID: paste it and press Enter.",
  "UUID klip": "Clip UUID",
  "ID klip": "Clip ID",
  "untuk menyalin": "to copy",
  "ID klip disalin": "Clip ID copied",
  Sekarang: "Current",
  "Klip tidak ditemukan": "Clip not found",
  "Petunjuk anotator": "Annotator instructions",
  "Progres:": "Progress:",
  "Sisa:": "Left:",
  "Peta klip": "Clip map",
  Peta: "Map",
  "Saring klip": "Filter clips",
  "Label yang dipilih di sini otomatis menempel ke kotak baru.":
    "Labels picked here are added to new boxes automatically.",
  "Palet label": "Label palette",
  "Hapus semua label": "Remove all labels",

  // projects
  "Proyek anotasi": "Annotation projects",
  "Pekerjaan anotasi: klip yang ditanyakan ke anotator, label yang boleh dipakai, petunjuk, dan semua jawaban. Dibuat dari rekaman audio.":
    "Annotation work: the clips asked to annotators, the labels they may use, instructions and all answers. Made from audio recordings.",
  Ringkasan: "Overview",
  Anotasi: "Annotate",
  "Tambah klip": "Add clips",
  Label: "Labels",
  Cari: "Search",
  "Cari...": "Search...",
  Unduh: "Download",
  "Yakin mau menghapus proyek ini?":
    "Are you sure you want to delete this project?",
  "Hapus proyek": "Delete project",
  "Tindakan ini tidak bisa dibatalkan. Semua anotasi dan jawaban di proyek ini ikut terhapus.":
    "This cannot be undone. All annotations and answers in this project are deleted too.",
  "Lanjutkan?": "Continue?",
  Batal: "Cancel",
  Hapus: "Delete",
  Nama: "Name",
  "Beri nama proyek anotasi ini.": "Give this annotation project a name.",
  Deskripsi: "Description",
  Dibuat: "Created",
  "Jelaskan tujuan proyek ini": "Describe the purpose of this project",
  "Tulis petunjuk untuk anotator.": "Write instructions for annotators.",
  "Buat proyek": "Create project",
  "Pilih berkas proyek untuk diimpor": "Select a project file to import",
  "Berkas harus berformat AOEF": "The file must be in AOEF format",
  Impor: "Import",
  "Buat proyek anotasi": "Create annotation project",
  "Buat baru": "Create new",
  "Impor proyek anotasi": "Import annotation project",
  "Untuk membuat proyek baru, klik tombol":
    "To create a new project, click the button",
  "Masalah proyek": "Project issues",
  "Masalah klip terbaru": "Latest clip issues",
  "Masalah kotak terbaru": "Latest box issues",
  "Tidak ada masalah tercatat.": "No issues recorded.",
  "Progres anotasi": "Annotation progress",
  "Proyek ini belum punya klip. Tambahkan lewat tombol":
    "This project has no clips yet. Add them with the button",
  "di atas.": "above.",
  "Belum dijawab": "Unanswered",
  "Perlu ditinjau": "Needs review",
  Selesai: "Done",
  Diverifikasi: "Verified",
  "Total klip:": "Total clips:",
  "Label proyek": "Project labels",
  "memberi makna pada anotasi. Lihat label proyek ini atau tambahkan bila perlu.":
    "give annotations meaning. See this project's labels or add more when needed.",
  "Label bisa ditambah lagi kapan saja.": "Labels can be added at any time.",
  "Tambah label": "Add labels",
  "Cari label di bawah, lalu klik untuk menambahkannya.":
    "Search labels below, then click one to add it.",
  "Buat label baru bila perlu, tapi jangan dobel makna.":
    "Create new labels when needed, but avoid duplicate meanings.",
  "Label terpilih": "Selected labels",
  "label terpilih, bisa dipakai anotator.":
    "selected labels, available to annotators.",
  "Cari label yang sudah dipilih. Klik label untuk melepasnya.":
    "Search the selected labels. Click a label to remove it.",
  'Label yang dipakai di proyek ini. "Klip" = jumlah klip berlabel itu, "Kotak" = jumlah kotak berlabel itu.':
    'Labels used in this project. "Clips" = clips with that label, "Boxes" = boxes with that label.',
  "Belum ada label di proyek ini.": "No labels in this project yet.",
  Ada: "There are",
  "label di proyek ini.": "labels in this project.",
  "Belum ada label pada anotasi di proyek ini.":
    "No labels on annotations in this project yet.",
  Klip: "Clips",
  Kotak: "Boxes",
  "Di sini klip ditambahkan ke proyek anotasi: pilih kumpulan rekaman, saring berkasnya bila perlu, lalu atur cara memotong klip.":
    "Add clips to the annotation project here: choose a recording set, filter its files if needed, then set how to cut clips.",
  "Pilih rekaman audio": "Choose audio recordings",
  "Pilih kumpulan rekaman sumber klip.":
    "Choose the recording set to take clips from.",
  "Pilih berkas": "Choose files",
  "Pilih berkas yang akan dipotong jadi klip. Bisa disaring dan diambil sebagian.":
    "Choose the files to cut into clips. You can filter them and take a subset.",
  "Saring berkas": "Filter files",
  "Ambil sebagian berkas lewat saringan.":
    "Take a subset of files with filters.",
  "Tambah saringan": "Add filter",
  "Ambil sebagian berkas": "Take a subset of files",
  "Batas jumlah berkas; diambil acak, semua kalau kosong.":
    "Maximum number of files, picked at random; all if empty.",
  "Maksimum jumlah berkas": "Maximum number of files",
  "Pemotongan klip": "Clip cutting",
  "Atur cara memotong klip dari berkas terpilih.":
    "Set how clips are cut from the chosen files.",
  "Potong jadi klip": "Cut into clips",
  "Nyalakan untuk memotong berkas jadi klip pendek; matikan untuk memakai seluruh berkas sebagai satu klip.":
    "Turn on to cut files into short clips; turn off to use each whole file as one clip.",
  "Panjang klip": "Clip length",
  "Panjang tiap klip, dalam detik.": "Length of each clip, in seconds.",
  "Tumpang tindih": "Overlap",
  "Tumpang tindih antar klip, dalam detik.":
    "Overlap between clips, in seconds.",
  "Ambil sebagian klip": "Take a subset of clips",
  "Batas klip per berkas; diambil acak, semua kalau kosong.":
    "Maximum clips per file, picked at random; all if empty.",
  "Maksimum klip per berkas": "Maximum clips per file",
  "Pilih kumpulan rekaman dulu.": "Choose a recording set first.",
  "Rekaman terpilih:": "Chosen recordings:",
  "Berkas terpilih:": "Chosen files:",
  "Klip yang ditambahkan:": "Clips to add:",
  "Kalau pilihan sudah pas, klik tombol di bawah untuk menambahkan klip ke proyek.":
    "When the choices look right, click the button below to add the clips to the project.",
  "Tambahkan klip": "Add clips",
  "Detail proyek": "Project details",
  "Catatan klip": "Clip notes",
  "Belum ada catatan": "No notes yet",
  "Label klip": "Clip labels",
  "Belum ada label di klip ini.": "No labels on this clip yet.",

  // recordings
  "Rekaman audio": "Audio recordings",
  "File audio yang terdaftar di server, dikelompokkan per kumpulan. Bahan untuk membuat proyek anotasi; belum berisi pekerjaan atau jawaban.":
    "Audio files registered on the server, grouped in sets. Material for annotation projects; they hold no work or answers yet.",
  "Berkas audio": "Audio files",
  "Yakin mau menghapus rekaman ini?":
    "Are you sure you want to delete these recordings?",
  "Hapus rekaman": "Delete recordings",
  "Tindakan ini tidak bisa dibatalkan. Semua berkas audio di kumpulan ini terhapus permanen, beserta anotasi, catatan, dan label yang terkait.":
    "This cannot be undone. All audio files in this set are deleted permanently, with their annotations, notes and labels.",
  "Sebaiknya jangan hapus rekaman yang sudah dianotasi.":
    "Better not delete recordings that have been annotated.",
  "Beri nama kumpulan rekaman ini.": "Give this recording set a name.",
  "Jelaskan isi rekaman ini.": "Describe these recordings.",
  "Folder audio": "Audio folder",
  "Path folder tempat berkas audio disimpan di server.":
    "Path of the folder on the server that holds the audio files.",
  Daftarkan: "Register",
  "Pilih berkas rekaman untuk diimpor": "Select a recordings file to import",
  "Folder tempat semua berkas audio disimpan":
    "Folder that holds all the audio files",
  "Path folder audio...": "Audio folder path...",
  "Daftarkan rekaman audio": "Register audio recordings",
  "Impor rekaman audio": "Import audio recordings",
  "Belum ada rekaman audio.": "No audio recordings yet.",
  "Untuk mendaftarkan rekaman, klik tombol":
    "To register recordings, click the button",
  "Catatan dan masalah": "Notes and issues",
  "Masalah terbaru": "Latest issues",
  "Tidak ada masalah": "No issues",
  "Ringkasan rekaman": "Recordings overview",
  "Masalah metadata": "Metadata issues",
  "Berkas hilang": "Missing files",
  "Ekspor metadata berkas": "Export file metadata",
  ekspor: "export",
  "Label yang dipakai di rekaman ini.": "Labels used in these recordings.",
  "Belum ada label pada rekaman ini.": "No labels in these recordings yet.",
  "Informasi rekaman": "Recording information",
  "Yakin mau menghapus berkas ini?":
    "Are you sure you want to delete this file?",
  "Hapus berkas": "Delete file",
  "Tindakan ini tidak bisa dibatalkan. Berkas terhapus permanen dari basis data beserta metadata, anotasi, catatan, dan labelnya.":
    "This cannot be undone. The file is deleted permanently from the database with its metadata, annotations, notes and labels.",
  "Sebaiknya jangan hapus berkas yang sudah dianotasi.":
    "Better not delete files that have been annotated.",
  Tanggal: "Date",
  "Ubah tanggal rekam. Format: YYYY-MM-DD":
    "Change the recording date. Format: YYYY-MM-DD",
  Kosongkan: "Clear",
  "Path lengkap:": "Full path:",
  "Tanpa lokasi": "No location",
  "Lokasi rekam": "Recording location",
  "Lokasi belum diisi.": "No location yet.",
  "Tulis catatan di atas untuk memulai diskusi tentang berkas ini.":
    "Write a note above to start a discussion about this file.",
  "Catatan berkas": "File notes",
  "Cari berkas...": "Search files...",
  "Belum ada label": "No labels yet",
  "Format jam: hh:mm:ss.ddd": "Time format: hh:mm:ss.ddd",
  Jam: "Time",
  Lokasi: "Location",
  Catatan: "Notes",
  Durasi: "Duration",
  "Laju sampel": "Sample rate",
  Kanal: "Channels",
  "Ekspansi waktu": "Time expansion",

  // filters, lists, notes, tags
  hasil: "results",
  "saringan:": "filters:",
  Saring: "Filter",
  Terapkan: "Apply",
  "Tidak ada saringan": "No filters",
  "Saring menurut": "Filter by",
  Operasi: "Operation",
  "Kosong?": "Empty?",
  "Saring berkas menurut durasi (detik).":
    "Filter files by duration (seconds).",
  Lintang: "Latitude",
  Bujur: "Longitude",
  "Punya label": "Has label",
  "Ada masalah": "Has issues",
  Tampilkan: "Show",
  "Per halaman:": "Per page:",
  "Tulis catatan": "Write a note",
  "Tulis catatannya, lalu pilih simpan sebagai catatan atau masalah.":
    "Write the note, then save it as a note or an issue.",
  "Tulis catatan di sini...": "Write a note here...",
  "Tandai masalah": "Mark as issue",
  "Simpan catatan": "Save note",
  Selesaikan: "Resolve",
  "Tulis catatan di atas untuk memulai diskusi.":
    "Write a note above to start a discussion.",
  "Tidak ada hasil": "No results",
  "Tampilkan semua": "Show all",
  "Tampilkan lebih sedikit": "Show less",
  "Label tidak ditemukan": "No labels found",
  "Label tidak ditemukan.": "No labels found.",
  "Tampilkan lagi": "Show more",
  "klik di sini": "click here",
  tambah: "add",
};

export default EN;
