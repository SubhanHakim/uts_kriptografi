// Extended Vigenere Cipher
export function extendedVigenereEncrypt(plaintext: Uint8Array, key: string): Uint8Array {
  const keyBytes = new TextEncoder().encode(key);
  const ciphertext = new Uint8Array(plaintext.length);

  for (let i = 0; i < plaintext.length; i++) {
    ciphertext[i] = plaintext[i] ^ keyBytes[i % keyBytes.length]; // XOR dengan kunci
  }

  return ciphertext;
}

export function extendedVigenereDecrypt(ciphertext: Uint8Array, key: string): Uint8Array {
  return extendedVigenereEncrypt(ciphertext, key); // XOR adalah operasi reversibel
}

// Transposisi Kolom
export function columnarTransposeEncrypt(plaintext: string, key: string): string {
  const keyOrder = key.split("").map((_, i) => i).sort((a, b) => key[a].localeCompare(key[b]));
  const columns = Array.from({ length: key.length }, () => "");

  for (let i = 0; i < plaintext.length; i++) {
    columns[i % key.length] += plaintext[i];
  }

  return keyOrder.map((i) => columns[i]).join("");
}

export function columnarTransposeDecrypt(ciphertext: string, key: string): string {
  const keyOrder = key.split("").map((_, i) => i).sort((a, b) => key[a].localeCompare(key[b]));
  const rows = Math.ceil(ciphertext.length / key.length);
  const columns = Array.from({ length: key.length }, (_, i) =>
    ciphertext.slice(i * rows, (i + 1) * rows)
  );

  const plaintext = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < key.length; j++) {
      if (columns[keyOrder.indexOf(j)][i]) {
        plaintext.push(columns[keyOrder.indexOf(j)][i]);
      }
    }
  }

  return plaintext.join("");
}

// Gabungkan Extended Vigenere dan Transposisi Kolom
export function superEncrypt(plaintext: string, vigenereKey: string, transposeKey: string): string {
  // Step 1: Extended Vigenere Cipher
  const plaintextBytes = new TextEncoder().encode(plaintext);
  const vigenereEncrypted = extendedVigenereEncrypt(plaintextBytes, vigenereKey);
  const vigenereEncryptedText = new TextDecoder().decode(vigenereEncrypted);

  // Step 2: Transposisi Kolom
  return columnarTransposeEncrypt(vigenereEncryptedText, transposeKey);
}

export function superDecrypt(ciphertext: string, vigenereKey: string, transposeKey: string): string {
  // Step 1: Transposisi Kolom (Reverse)
  const transposedDecrypted = columnarTransposeDecrypt(ciphertext, transposeKey);

  // Step 2: Extended Vigenere Cipher (Reverse)
  const transposedBytes = new TextEncoder().encode(transposedDecrypted);
  const vigenereDecrypted = extendedVigenereDecrypt(transposedBytes, vigenereKey);

  return new TextDecoder().decode(vigenereDecrypted);
}

// Super Encryption untuk file
export function superEncryptFile(fileBytes: Uint8Array, vigenereKey: string, transposeKey: string): Uint8Array {
  // Step 1: Extended Vigenere Cipher
  const vigenereEncrypted = extendedVigenereEncrypt(fileBytes, vigenereKey);

  // Step 2: Transposisi Kolom
  const transposed = columnarTransposeEncrypt(new TextDecoder().decode(vigenereEncrypted), transposeKey);

  // Kembalikan hasil sebagai Uint8Array
  return new TextEncoder().encode(transposed);
}

export function superDecryptFile(fileBytes: Uint8Array, vigenereKey: string, transposeKey: string): Uint8Array {
  // Step 1: Transposisi Kolom (Reverse)
  const transposedDecrypted = columnarTransposeDecrypt(new TextDecoder().decode(fileBytes), transposeKey);

  // Step 2: Extended Vigenere Cipher (Reverse)
  return extendedVigenereDecrypt(new TextEncoder().encode(transposedDecrypted), vigenereKey);
}