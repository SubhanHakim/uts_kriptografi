import { onlyAZ, a2i, i2a } from "@/lib/text";
import { mod } from "@/lib/mod"; 

const normKey = (k: string) => {
  const K = onlyAZ(k);
  if (!K) throw new Error("Key harus berisi huruf A-Z.");
  return K;
};

/** Enkripsi Auto-Key Vigenere (26 huruf A-Z) */
export function autokeyEncrypt(plain: string, key: string): string {
  const P = onlyAZ(plain);
  const K0 = normKey(key);

  const Kstream = (K0 + P).slice(0, P.length);

  let out = "";
  for (let i = 0; i < P.length; i++) {
    const c = mod(a2i(P[i]) + a2i(Kstream[i]), 26);
    out += i2a(c);
  }
  return out;
}

export function autokeyDecrypt(cipher: string, key: string): string {
  const C = onlyAZ(cipher);
  const K0 = normKey(key);

  let out = "";
  const keystream: string[] = K0.split("");

  for (let i = 0; i < C.length; i++) {
    const k = keystream[i];
    const p = i2a(mod(a2i(C[i]) - a2i(k), 26));
    out += p;
    keystream.push(p);              
  }
  return out;
}
