import { 
  readFileAsBytes, 
  packHeaderAndData, 
  unpackHeaderAndData, 
  downloadBytes, 
  type CryptoHeader
} from "@/lib/file";
import type { RunFileParams, RunFileResult } from "@/types/crypto";
import { evigEncrypt, evigDecrypt } from "@/cipher/extendedVigenere";
import { toBase64 } from "@/lib/base64";

export async function runCipherFile(params: RunFileParams): Promise<RunFileResult> {
  const { mode, file, key } = params;
  if (!file) throw new Error("Pilih file terlebih dahulu.");
  if (!key.trim()) throw new Error("Key wajib diisi.");

  const bytes = await readFileAsBytes(file);

  if (mode === "encrypt") {
    const cipher = evigEncrypt(bytes, key);
    const header: CryptoHeader = {
      magic: "CRYPTOv1",
      algo: "extended-vigenere",
      originalName: file.name,
      timestamp: Date.now(),
    };
    const packed = packHeaderAndData(header, cipher);

    return {
      base64: toBase64(packed),  // tampilkan Base64 dari .dat
      downloadName: "cipher.dat" // tombol download
    };
  }

  // decrypt
  const { header, data } = unpackHeaderAndData(bytes);
  if (header.algo !== "extended-vigenere") {
    throw new Error("File bukan hasil Extended Vigenere.");
  }
  const plain = evigDecrypt(data, key);
  return {
    base64: toBase64(plain),
    downloadName: header.originalName || "restored.bin"
  };
}

/** Util bila kamu ingin langsung trigger download dari UI */
export function triggerDownloadFromBase64(b64: string, name: string) {
  const raw = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
  downloadBytes(raw, name);
}