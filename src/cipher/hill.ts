const onlyAZ = (s: string) => s.toUpperCase().replace(/[^A-Z]/g, "");
const mod = (n: number, m: number) => ((n % m) + m) % m;

/** Hitung determinan matriks */
function determinant(matrix: number[][]): number {
  const n = matrix.length;
  if (n === 2) {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  }
  let det = 0;
  for (let i = 0; i < n; i++) {
    const subMatrix = matrix.slice(1).map(row => row.filter((_, j) => j !== i));
    det += matrix[0][i] * determinant(subMatrix) * (i % 2 === 0 ? 1 : -1);
  }
  return det;
}

/** Hitung invers modular */
function modInverse(a: number, m: number): number | null {
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  return null;
}

/** Hitung invers matriks */
function inverseMatrix(matrix: number[][], modValue: number): number[][] | null {
  const n = matrix.length;
  const det = determinant(matrix);
  const detMod = mod(det, modValue);
  const detInv = modInverse(detMod, modValue);
  if (detInv === null) return null;

  const cofactors = matrix.map((row, i) =>
    row.map((_, j) => {
      const subMatrix = matrix
        .filter((_, rowIndex) => rowIndex !== i)
        .map(row => row.filter((_, colIndex) => colIndex !== j));
      const cofactor = determinant(subMatrix) * ((i + j) % 2 === 0 ? 1 : -1);
      return mod(cofactor, modValue);
    })
  );

  const adjugate = cofactors[0].map((_, colIndex) => cofactors.map(row => row[colIndex]));

  return adjugate.map(row => row.map(value => mod(value * detInv, modValue)));
}

export function hillEncrypt(plaintext: string, keyMatrix: number[][]): string {
  const P = onlyAZ(plaintext);
  const n = keyMatrix.length;

  // Tambahkan padding jika panjang plaintext tidak kelipatan n
  const paddingChar = "X";
  const paddingLength = n - (P.length % n);
  const paddedPlaintext = P + (paddingLength < n ? paddingChar.repeat(paddingLength) : "");

  let ciphertext = "";
  for (let i = 0; i < paddedPlaintext.length; i += n) {
    const block = paddedPlaintext.slice(i, i + n).split("").map(ch => ch.charCodeAt(0) - 65);
    const encryptedBlock = keyMatrix.map(row =>
      mod(row.reduce((sum, value, j) => sum + value * block[j], 0), 26)
    );
    ciphertext += encryptedBlock.map(num => String.fromCharCode(num + 65)).join("");
  }

  return ciphertext;
}

export function hillDecrypt(ciphertext: string, keyMatrix: number[][]): string {
  const C = onlyAZ(ciphertext);
  const n = keyMatrix.length;

  const inverseKey = inverseMatrix(keyMatrix, 26);
  if (!inverseKey) {
    throw new Error("Key matrix is not invertible modulo 26.");
  }

  let plaintext = "";
  for (let i = 0; i < C.length; i += n) {
    const block = C.slice(i, i + n).split("").map(ch => ch.charCodeAt(0) - 65);
    const decryptedBlock = inverseKey.map(row =>
      mod(row.reduce((sum, value, j) => sum + value * block[j], 0), 26)
    );
    plaintext += decryptedBlock.map(num => String.fromCharCode(num + 65)).join("");
  }

  // Hapus padding (jika ada)
  return plaintext.replace(/X+$/, ""); // Menghapus huruf 'X' di akhir
}