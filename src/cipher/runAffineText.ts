import { affineEncrypt, affineDecrypt } from "./affine";

/** Kembalikan letters lowercase + Base64 sesuai spesifikasi tugas */
export function runAffineText(
  mode: "encrypt" | "decrypt",
  text: string,
  key: string // format "a,b" contoh: "5,8"
) {
  if (!key.trim()) throw new Error("Key wajib diisi (format: a,b).");

  const letters = mode === "encrypt"
    ? affineEncrypt(text, key)
    : affineDecrypt(text, key);

  const lettersPreview = letters.toLowerCase(); // tanpa spasi, lower
  const base64 = btoa(lettersPreview);
  return { lettersPreview, base64 };
}
