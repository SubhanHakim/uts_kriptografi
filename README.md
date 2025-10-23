# 🔐 UTS Kriptografi - Extended Vigenere Cipher


Link Akses : https://uts-kriptografi.vercel.app/

Proyek ini merupakan implementasi **Extended Vigenere Cipher** berbasis web menggunakan **React**, **TypeScript**, **Vite**, dan **TailwindCSS (shadcn/ui)**.  
Aplikasi ini dirancang untuk memenuhi tugas **UTS Mata Kuliah Kriptografi**, dengan kemampuan untuk mengenkripsi dan mendekripsi teks maupun file, serta mendukung tampilan modern yang responsif.

---

## 🧠 **Deskripsi Singkat**

**Extended Vigenere Cipher** merupakan pengembangan dari algoritma klasik *Vigenere Cipher* yang bekerja pada seluruh **256 karakter ASCII**, bukan hanya huruf alfabet (A–Z).  
Artinya, algoritma ini dapat digunakan untuk mengenkripsi teks, karakter spesial, bahkan file biner seperti gambar atau dokumen.  

Aplikasi ini dibangun untuk:
- Menerima input teks maupun file.
- Mengenkripsi atau mendekripsi menggunakan kunci tertentu.
- Menampilkan hasil dalam format **Base64**.
- Mengunduh hasil enkripsi sebagai file biner (`.dat`).

---

## ✨ **Fitur Utama**
| Fitur | Deskripsi |
|-------|------------|
| 🔒 **Enkripsi** | Mengenkripsi teks atau file menggunakan Extended Vigenere Cipher. |
| 🔓 **Dekripsi** | Mengembalikan cipher menjadi teks atau file asli. |
| 💾 **Download File** | Hasil enkripsi dapat diunduh dalam bentuk file (`cipher.dat`). |
| 🎨 **Mode Gelap & Terang** | Mendukung tema tampilan dark dan light mode. |
| 🧭 **UI Modern** | Dibangun dengan shadcn/ui dan TailwindCSS. |
| 📱 **Responsif** | Tampilan menyesuaikan semua ukuran layar (desktop, tablet, mobile). |

---

## 🧩 **Teknologi yang Digunakan**
- ⚛️ **React + TypeScript** – framework utama berbasis komponen.
- ⚡ **Vite** – bundler cepat untuk pengembangan modern.
- 🎨 **TailwindCSS + shadcn/ui** – styling dan komponen antarmuka modern.
- 💾 **File API & Base64 Encoding** – untuk membaca dan menyimpan data biner.
- 🧮 **Algoritma Kriptografi**:
  - Vigenere Cipher (26 alfabet)
  - Auto-Key Vigenere
  - Extended Vigenere Cipher (256 byte)
  - Playfair Cipher
  - Affine Cipher
  - Hill Cipher
  - Super Encryption (Extended Vigenere + Transposisi Kolom)
  - Enigma Cipher *(bonus)*

---

## ⚙️ **Persyaratan Sistem**
Sebelum menjalankan proyek, pastikan sistem Anda memenuhi syarat berikut:
- **Node.js** ≥ 16.x  
- **npm** ≥ 7.x  
- Browser modern (Chrome, Edge, Firefox, Brave, Safari)

---

## 🚀 **Instalasi & Menjalankan Proyek**

1. **Clone repositori:**
   ```bash
   git clone https://github.com/username/uts-kriptografi.git
   cd uts-kriptografi
