export interface CryptoHeader {
  magic: string;
  algo: "extended-vigenere" | "super-encryption";
  originalName: string;
  timestamp: number;
}

export function packHeaderAndData(header: CryptoHeader, payload: Uint8Array): Uint8Array {
  const headerStr = JSON.stringify(header);
  const headerBytes = new TextEncoder().encode(headerStr);
  const len = headerBytes.length;

  const out = new Uint8Array(4 + len + payload.length);
  out[0] = len & 0xff;
  out[1] = (len >> 8) & 0xff;
  out[2] = (len >> 16) & 0xff;
  out[3] = (len >> 24) & 0xff;
  out.set(headerBytes, 4);
  out.set(payload, 4 + len);
  return out;
}

export async function readFileAsBytes(file: File): Promise<Uint8Array> {
  const buf = await file.arrayBuffer();
  return new Uint8Array(buf);
}

export function unpackHeaderAndData(u8: Uint8Array): { header: CryptoHeader; data: Uint8Array } {
  const len = u8[0] | (u8[1] << 8) | (u8[2] << 16) | (u8[3] << 24);
  const headerBytes = u8.slice(4, 4 + len);
  const headerStr = new TextDecoder().decode(headerBytes);
  const header = JSON.parse(headerStr) as CryptoHeader;
  const data = u8.slice(4 + len);
  return { header, data };
}


export function downloadBytes(u8: Uint8Array, filename: string) {
  const arrayBuffer =
    u8.buffer instanceof SharedArrayBuffer
      ? u8.slice().buffer
      : u8.buffer;

  
  const blob = new Blob([arrayBuffer], { type: "application/octet-stream" });

  
  const url = URL.createObjectURL(blob);

  
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);

  // Trigger klik & hapus URL object
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}