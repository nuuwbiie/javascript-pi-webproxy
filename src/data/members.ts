import type { Member } from '../types'

export const members: Member[] = [
  ['01', 'Nama Anggota 01', 'Anggota 01', 'Mahasiswa Ilmu Komputer', 'Teknologi, desain, dan hal-hal baru adalah ruang belajarnya.', ['Web', 'UI/UX', 'Kolaborasi']],
  ['02', 'Nama Anggota 02', 'Anggota 02', 'Mahasiswa Ilmu Komputer', 'Suka merangkai ide menjadi pengalaman digital yang berguna.', ['Data', 'Fotografi', 'Riset']],
  ['03', 'Nama Anggota 03', 'Anggota 03', 'Mahasiswa Ilmu Komputer', 'Tertarik pada sistem, produk, dan kerja tim yang rapi.', ['Sistem', 'Produk', 'Musik']],
  ['04', 'Nama Anggota 04', 'Anggota 04', 'Mahasiswa Ilmu Komputer', 'Menikmati proses bercerita lewat visual dan dokumentasi.', ['Visual', 'Cerita', 'Komunitas']],
  ['05', 'Nama Anggota 05', 'Anggota 05', 'Mahasiswa Ilmu Komputer', 'Senang belajar bersama dan mengubah tantangan menjadi progres.', ['Kode', 'Game', 'Organisasi']],
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
