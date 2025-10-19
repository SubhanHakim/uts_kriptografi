import  { playfairEncrypt, playfairDecrypt } from "./playFairCipher";

export function runPlayfairText(
  mode: "encrypt" | "decrypt",
  text: string,
  key: string
) {
  if (!key.trim()) throw new Error("Key wajib diisi.");

  const letters = mode === "encrypt"
    ? playfairEncrypt(text, key)
    : playfairDecrypt(text, key);

  const lettersPreview = letters.toLowerCase(); // sesuai spesifikasi (huruf tanpa spasi, lower)
  const base64 = btoa(lettersPreview);

  return { lettersPreview, base64 };
}
