import { autokeyEncrypt, autokeyDecrypt } from "./autokeyVigenere";
import { strToBytes, toBase64 } from "@/lib/base64";

export function runAutokeyVigenere(
  mode: "encrypt" | "decrypt",
  text: string,
  key: string
) {
  const letters = mode === "encrypt"
    ? autokeyEncrypt(text, key)
    : autokeyDecrypt(text, key);

  const lettersPreview = letters.toLowerCase();
  const base64 = toBase64(strToBytes(lettersPreview));
  return { lettersPreview, base64 };
}