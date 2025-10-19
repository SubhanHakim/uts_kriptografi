import type { Algorithm, Mode, RunTextParams, RunTextResult } from "@/types/crypto";
import { vigenereEncrypt, vigenereDecrypt } from "@/cipher/vigenere";
import { runExtendedText } from "@/cipher/runExtendedVigenereText";

export async function runCipherText(params: RunTextParams): Promise<RunTextResult> {
  const { algo, mode, text, key } = params;
  if (!key.trim()) throw new Error("Key wajib diisi.");

  if (algo === "vigenere") {
    const letters = mode === "encrypt"
      ? vigenereEncrypt(text, key)
      : vigenereDecrypt(text, key);

    const lettersPreview = letters.toLowerCase(); // sesuai spesifikasi tampilan
    const base64 = btoa(lettersPreview);
    return { lettersPreview, base64 };
  }

  // extended
  const { base64, previewText } = runExtendedText(mode, text, key);
  return { base64, previewText };
}
