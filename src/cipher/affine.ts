const onlyAZ = (s: string) => s.toUpperCase().replace(/[^A-Z]/g, "");
const a2i = (ch: string) => ch.charCodeAt(0) - 65; // A->0
const i2a = (n: number) => String.fromCharCode(65 + n); 
const mod = (n: number, m: number) => ((n % m) + m) % m;

function egcd(a: number, b: number): { g: number; x: number; y: number } {
  if (b === 0) return { g: Math.abs(a), x: a >= 0 ? 1 : -1, y: 0 };
  const { g, x, y } = egcd(b, a % b);
  return { g, x: y, y: x - Math.floor(a / b) * y };
}

function modInv(a: number, m: number): number | null {
  const { g, x } = egcd(a, m);
  if (g !== 1) return null;
  return mod(x, m);
}

export interface AffineKey {
  a: number;
  b: number;
}

/** Parse key string "a,b" → { a, b } dengan validasi */
export function parseAffineKey(key: string): AffineKey {
  const m = key.trim().match(/^(-?\d+)\s*,\s*(-?\d+)$/);
  if (!m) {
    throw new Error('Format key Affine harus "a,b" (misal: 5,8).');
  }
  let a = parseInt(m[1], 10);
  let b = parseInt(m[2], 10);
  a = mod(a, 26);
  b = mod(b, 26);
  const inv = modInv(a, 26);
  if (inv === null) {
    throw new Error(
      `a=${a} tidak relatif prima dengan 26. Pilih a ∈ {1,3,5,7,9,11,15,17,19,21,23,25}.`
    );
  }
  return { a, b };
}

export function affineEncrypt(plain: string, key: string): string {
  const { a, b } = parseAffineKey(key);
  console.log("Affine Encrypt - Key:", { a, b }); // Debugging key
  const P = onlyAZ(plain);
  console.log("Affine Encrypt - Plaintext:", P); // Debugging plaintext
  let out = "";
  for (let i = 0; i < P.length; i++) {
    const x = a2i(P[i]);
    const y = mod(a * x + b, 26);
    console.log(`Encrypting: ${P[i]} (${x}) -> ${i2a(y)} (${y})`); // Debugging each character
    out += i2a(y);
  }
  return out;
}

/** Dekripsi Affine: P = aInv * (C - b) mod 26 */
export function affineDecrypt(cipher: string, key: string): string {
  const { a, b } = parseAffineKey(key);
  const aInv = modInv(a, 26);
  if (aInv === null) {
    throw new Error(`Tidak ada invers untuk a=${a} modulo 26.`);
  }
  const C = onlyAZ(cipher);
  let out = "";
  for (let i = 0; i < C.length; i++) {
    const y = a2i(C[i]);
    const x = mod(aInv * (y - b), 26);
    out += i2a(x);
  }
  return out;
}
