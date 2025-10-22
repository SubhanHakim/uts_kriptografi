export const strToBytes = (str: string) => new TextEncoder().encode(str);

export function toBase64(input: string | Uint8Array): string {
  let binary = "";

  if (typeof input === "string") {
    // Encode string ke Uint8Array, lalu konversi ke string Latin1
    const bytes = new TextEncoder().encode(input);
    binary = Array.from(bytes)
      .map((byte) => String.fromCharCode(byte))
      .join("");
  } else {
    // Proses Uint8Array langsung
    binary = Array.from(input)
      .map((byte) => String.fromCharCode(byte))
      .join("");
  }

  return btoa(binary); // Konversi ke Base64
}

export function fromBase64(base64: string): Uint8Array {
  const binary = atob(base64); // Decode Base64 ke string biner
  return new Uint8Array([...binary].map((char) => char.charCodeAt(0))); // Konversi ke Uint8Array
}