function keyToBytes(key: string): Uint8Array {
  const kb = new TextEncoder().encode(key);
  if (kb.length === 0) throw new Error("Key wajib diisi.");
  return kb;
}

export function evigEncrypt(bytes: Uint8Array, key: string): Uint8Array {
  const k = keyToBytes(key);
  const out = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) {
    out[i] = (bytes[i] + k[i % k.length]) & 0xff;
  }
  return out;
}

export function evigDecrypt(bytes: Uint8Array, key: string): Uint8Array {
  const k = keyToBytes(key);
  const out = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) {
    out[i] = (bytes[i] - k[i % k.length]) & 0xff;
  }
  return out;
}

export function downloadBytes(bytes: Uint8Array, filename: string) {
  const blob = new Blob([bytes], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}