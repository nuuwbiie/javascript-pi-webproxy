import type { Member } from '../types'

export const members: Member[] = [
  ['01', 'Nama PJK (Ketua Kelompok)', 'PJK Kelompok', 'Penanggung Jawab Kelompok (PJK) · Mahasiswa Ilmu Komputer 62', 'Bertanggung jawab atas koordinasi tim, manajemen deliverables, dan memastikan proyek Connect & Deploy terlaksana dengan baik.', ['Project Lead', 'Architecture', 'Coordination']],
  ['02', 'Nama Anggota 02', 'Anggota 02', 'Mahasiswa Ilmu Komputer 62', 'Fokus pada pengembangan antarmuka pengguna dan pengalaman interaktif sistem.', ['Frontend', 'UI/UX', 'Desain']],
  ['03', 'Nama Anggota 03', 'Anggota 03', 'Mahasiswa Ilmu Komputer 62', 'Tertarik pada integrasi data, struktur sistem, dan dokumentasi teknis.', ['Data Logic', 'Backend', 'Sistem']],
  ['04', 'Nama Anggota 04', 'Anggota 04', 'Mahasiswa Ilmu Komputer 62', 'Menangani dokumentasi tim, aset visual, dan penyusunan portofolio kenangan.', ['Dokumentasi', 'Visual', 'Fotografi']],
  ['05', 'Nama Anggota 05', 'Anggota 05', 'Mahasiswa Ilmu Komputer 62', 'Mendukung pengujian fungsionalitas dan integrasi komponen aplikasi desktop.', ['Quality Assurance', 'Testing', 'Kode']],
  ['06', 'Nama Anggota 06', 'Anggota 06', 'Mahasiswa Ilmu Komputer 62', 'Eksplorasi teknologi web modern dan optimalisasi performa aplikasi.', ['Web Tech', 'Performance', 'Riset']],
  ['07', 'Nama Anggota 07', 'Anggota 07', 'Mahasiswa Ilmu Komputer 62', 'Membantu penyusunan CV ATS dan profil anggota kelompok.', ['Content Writing', 'ATS Resume', 'Komunikasi']],
  ['08', 'Nama Anggota 08', 'Anggota 08', 'Mahasiswa Ilmu Komputer 62', 'Pengembangan fitur aksesibilitas dan kemudahan navigasi sistem.', ['A11y', 'Navigasi', 'Interaksi']],
  ['09', 'Nama Anggota 09', 'Anggota 09', 'Mahasiswa Ilmu Komputer 62', 'Desain grafis, styling komponen, dan visual identity kelompok.', ['Graphic Design', 'Styling', 'Branding']],
  ['10', 'Nama Anggota 10', 'Anggota 10', 'Mahasiswa Ilmu Komputer 62', 'Manajemen aset statis, pengarsipan berkas, dan kurasi foto kenangan.', ['Media Archiving', 'Kurasi', 'Kreatif']],
  ['11', 'Nama Anggota 11', 'Anggota 11', 'Mahasiswa Ilmu Komputer 62', 'Dukungan kolaborasi Git, version control, dan penyelarasan kode tim.', ['Git Workflow', 'Review', 'DevOps']],
  ['12', 'Nama Anggota 12', 'Anggota 12', 'Mahasiswa Ilmu Komputer 62', 'Riset pengguna, evaluasi interaktivitas, dan presentasi hasil kelompok.', ['User Research', 'Evaluasi', 'Presentasi']],
].map(([id, name, nickname, role, bio, interests]) => ({
  id: id as string,
  name: name as string,
  nickname: nickname as string,
  role: role as string,
  bio: bio as string,
  interests: interests as string[],
  birthDate: undefined,
  hometown: undefined,
  socials: [{ label: 'Instagram' }, { label: 'LinkedIn' }, { label: 'GitHub' }],
  isPlaceholder: true,
}))

export const getMember = (id?: string): Member => members.find((member) => member.id === id) ?? members[0]!
