import { evigEncrypt, evigDecrypt } from "./extendedVigenere";
import { strToBytes, bytesToStr } from "@/lib/bytes";
import { toBase64, fromBase64 } from "@/lib/base64";

export type EVMode = "encrypt" | "decrypt";

export function runExtendedText(
  mode: EVMode,
  text: string,
  key: string
): { lettersPreview: string; base64: string } {
  if (!key.trim()) throw new Error("Key wajib diisi.");

  if (mode === "encrypt") {
    // teks bebas (UTF-8) → enkripsi per-byte → tampilkan Base64 cipher
    const plainBytes = strToBytes(text);
    const cipherBytes = evigEncrypt(plainBytes, key);
    const b64Cipher = toBase64(cipherBytes);
    return { lettersPreview: "(cipher ditampilkan sebagai Base64)", base64: b64Cipher };
  } else {
    // decrypt: input `text` harus Base64 dari cipher
    let cipherBytes: Uint8Array;
    try {
      cipherBytes = fromBase64(text);
    } catch {
      throw new Error("Input bukan Base64 valid untuk mode decrypt.");
    }
    const plainBytes = evigDecrypt(cipherBytes, key);
    const restoredText = bytesToStr(plainBytes); // teks asli (UTF-8)
    return { lettersPreview: restoredText, base64: toBase64(plainBytes) };
  }
}