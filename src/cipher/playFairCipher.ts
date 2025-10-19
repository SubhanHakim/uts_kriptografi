const onlyAZ = (s: string) => s.toUpperCase().replace(/[^A-Z]/g, "");

function normalizeIJ(s: string): string {
  return s.replace(/J/g, "I");
}


export function buildKeySquare(key: string) {
  const base = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
  const seen = new Set<string>();
  const K = normalizeIJ(onlyAZ(key));

  const letters: string[] = [];
  for (const ch of K + base) {
    if (ch === "J") continue;
    if (!seen.has(ch)) {
      seen.add(ch);
      letters.push(ch);
    }
  }
  
  const grid = [];
  for (let r = 0; r < 5; r++) {
    grid.push(letters.slice(r * 5, r * 5 + 5));
  }
  
  const pos: Record<string, { r: number; c: number }> = {};
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      pos[grid[r][c]] = { r, c };
    }
  }
  return { grid, pos };
}


export function makeDigraphs(plain: string, padPrimary = "X", padAlt = "Q"): string[] {
  const P = normalizeIJ(onlyAZ(plain));
  const out: string[] = [];
  let i = 0;
  while (i < P.length) {
    const a = P[i];
    const b = P[i + 1];

    if (!b) {
      // ganjil: tambahkan padding
      const pad = (a === padPrimary) ? padAlt : padPrimary;
      out.push(a + pad);
      i += 1;
      break;
    }

    if (a === b) {
      // huruf rangkap: sisipkan padding setelah a
      const pad = (a === padPrimary) ? padAlt : padPrimary;
      out.push(a + pad);
      i += 1; // hanya maju 1 (b diproses lagi)
    } else {
      out.push(a + b);
      i += 2;
    }
  }
  return out;
}

// Enkripsi satu pasangan (digraph) mengikuti aturan Playfair
function encPair(pair: string, pos: Record<string, { r: number; c: number }>, grid: string[][]): string {
  const a = pair[0], b = pair[1];
  const { r: r1, c: c1 } = pos[a];
  const { r: r2, c: c2 } = pos[b];

  if (r1 === r2) {
    // satu baris: geser kanan
    return grid[r1][(c1 + 1) % 5] + grid[r2][(c2 + 1) % 5];
  } else if (c1 === c2) {
    // satu kolom: geser bawah
    return grid[(r1 + 1) % 5][c1] + grid[(r2 + 1) % 5][c2];
  } else {
    // persegi: tukar kolom
    return grid[r1][c2] + grid[r2][c1];
  }
}

// Dekripsi satu pasangan (digraph)
function decPair(pair: string, pos: Record<string, { r: number; c: number }>, grid: string[][]): string {
  const a = pair[0], b = pair[1];
  const { r: r1, c: c1 } = pos[a];
  const { r: r2, c: c2 } = pos[b];

  if (r1 === r2) {
    // satu baris: geser kiri
    return grid[r1][(c1 + 5 - 1) % 5] + grid[r2][(c2 + 5 - 1) % 5];
  } else if (c1 === c2) {
    // satu kolom: geser atas
    return grid[(r1 + 5 - 1) % 5][c1] + grid[(r2 + 5 - 1) % 5][c2];
  } else {
    // persegi: tukar kolom
    return grid[r1][c2] + grid[r2][c1];
  }
}

// Enkripsi Playfair (return A-Z, tanpa spasi)
export function playfairEncrypt(plain: string, key: string): string {
  const { grid, pos } = buildKeySquare(key);
  const digraphs = makeDigraphs(plain);
  let out = "";
  for (const d of digraphs) out += encPair(d, pos, grid);
  return out;
}

// Heuristik sederhana untuk buang padding saat dekripsi:
// - hapus 'X' (atau padPrimary) bila berada di pola A X A (kemungkinan sisipan double-letter)
// - hapus pad trailing di akhir bila panjang awal ganjil (opsional, sulit diketahui tanpa metadata)
// Catatan: Depadding Playfair tidak selalu bisa sempurna tanpa metadata asli.
function simpleDepad(decrypted: string, padPrimary = "X", padAlt = "Q"): string {
  const chars = decrypted.split("");
  const out: string[] = [];
  for (let i = 0; i < chars.length; i++) {
    const prev = out.length ? out[out.length - 1] : null;
    const cur = chars[i];
    const next = i + 1 < chars.length ? chars[i + 1] : null;

    // buang 'X' (atau padPrimary) bila pola prev == next dan cur == padPrimary
    if (prev && next && cur === padPrimary && prev === next) {
      continue;
    }
    out.push(cur);
  }

  // opsional: jika terakhir adalah padPrimary atau padAlt dan panjang ganjil indikasi padding
  // Sulit akurat: biarkan apa adanya untuk tugas (bisa dikomentari bila ingin)
  return out.join("");
}

// Dekripsi Playfair (return A-Z, tanpa spasi)
// Perhatikan bahwa I/J tetap digabung (semua J dianggap I)
export function playfairDecrypt(cipher: string, key: string): string {
  const C = normalizeIJ(onlyAZ(cipher));
  const { grid, pos } = buildKeySquare(key);
  if (C.length % 2 !== 0) {
    // cipher harus genap, jika tidak genap abaikan huruf terakhir
    // atau bisa lempar error. Di sini kita buang 1 agar aman.
  }
  let raw = "";
  for (let i = 0; i < C.length - (C.length % 2); i += 2) {
    raw += decPair(C[i] + C[i + 1], pos, grid);
  }
  // depadding heuristik
  return simpleDepad(raw);
}
