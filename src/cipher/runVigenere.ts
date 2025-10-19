import { vigenereEncrypt, vigenereDecrypt } from "./vigenere";
import { strToBytes, toBase64 } from "@/lib/base64"; 

// return: {letters, base64}
export function runVigenere(mode: "encrypt" | "decrypt", text: string, key: string) {
  const letters = (mode === "encrypt")
    ? vigenereEncrypt(text, key)
    : vigenereDecrypt(text, key);

  // Preview huruf: lowercase tanpa spasi (ketentuan 26 huruf)
  const lettersPreview = letters.toLowerCase(); // sudah tanpa spasi

  // Base64 display: dari string huruf (lowercase) -> byte -> b64
  const b64 = toBase64(strToBytes(lettersPreview));
  return { lettersPreview, base64: b64 };
}
