import { runAutokeyVigenere } from "@/cipher/runAutokeyVigenere";
import { runVigenere } from "@/cipher/runVigenere";
import { runExtendedText } from "@/cipher/runExtendedVigenereText";
// import { playfairDecrypt, playfairEncrypt } from "@/cipher/playFairCipher";
import { runPlayfairText } from "@/cipher/runPlayfairText";
import { runAffineText } from "@/cipher/runAffineText";
import { hillDecrypt, hillEncrypt } from "@/cipher/hill";
import { superDecrypt, superEncrypt } from "@/cipher/superEncryption";
import { enigmaEncrypt } from "@/cipher/enigma";

export const programRegistry: Record<
  string,
  (
    mode: "encrypt" | "decrypt",
    text: string,
    key: string
  ) => { lettersPreview: string; base64: string }
> = {
  vigenere: runVigenere,
  "auto-key": runAutokeyVigenere,
  extended: runExtendedText,
  playfair: runPlayfairText,
  affine: runAffineText,
  hill: (mode, text, key) => {
    const keyMatrix = JSON.parse(key); // Pastikan key adalah matriks JSON
    if (mode === "encrypt") {
      const lettersPreview = hillEncrypt(text, keyMatrix);
      return { lettersPreview, base64: btoa(lettersPreview) };
    } else {
      const lettersPreview = hillDecrypt(text, keyMatrix);
      return { lettersPreview, base64: btoa(lettersPreview) };
    }
  },
  super: (mode, text, key) => {
    const [vigenereKey, transposeKey] = key.split("|");
    if (!vigenereKey || !transposeKey) {
      throw new Error("Key harus dalam format 'vigenereKey|transposeKey'.");
    }

    if (mode === "encrypt") {
      const lettersPreview = superEncrypt(text, vigenereKey, transposeKey);
      return { lettersPreview, base64: btoa(lettersPreview) };
    } else {
      const lettersPreview = superDecrypt(text, vigenereKey, transposeKey);
      return { lettersPreview, base64: btoa(lettersPreview) };
    }
  },
  enigma: (mode, text, key) => {
    console.log("Key diterima di programRegistry:", key);

    const rotorPositions = key
      .split(",")
      .map((pos) => parseInt(pos.trim(), 10));

    if (
      rotorPositions.length !== 3 ||
      rotorPositions.some((pos) => isNaN(pos))
    ) {
      console.error("Invalid Key:", key);
      throw new Error("Key harus berupa 3 angka, contoh: 1,2,3.");
    }

    const lettersPreview = enigmaEncrypt(text, rotorPositions);
    return { lettersPreview, base64: btoa(lettersPreview) };
  },
};
