// Rotor konfigurasi sederhana
const ROTORS = [
  "EKMFLGDQVZNTOWYHXUSPAIBRCJ", 
  "AJDKSIRUXBLHWTMCQGZNPYFVOE",
  "BDFHJLCPRTXVZNYEIWGAKMUSQO",
];

const REFLECTOR = "YRUHQSLDPXNGOKMIEBFZCWVJAT";

const PLUGBOARD: Record<string, string> = {
  A: "B",
  B: "A",
  C: "D",
  D: "C",
};

// Fungsi untuk substitusi karakter menggunakan rotor
function substitute(char: string, rotor: string, reverse: boolean = false): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const index = reverse ? rotor.indexOf(char) : alphabet.indexOf(char);
  return reverse ? alphabet[index] : rotor[index];
}

// Fungsi untuk substitusi karakter menggunakan plugboard
function plugboardSubstitute(char: string): string {
  return PLUGBOARD[char] || char;
}

// Fungsi utama Enigma Cipher
export function enigmaEncrypt(plaintext: string, rotorPositions: number[]): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const rotors = ROTORS.map((rotor, i) =>
    rotor.slice(rotorPositions[i]) + rotor.slice(0, rotorPositions[i])
  );

  return plaintext
    .toUpperCase()
    .split("")
    .map((char) => {
      if (!alphabet.includes(char)) return char; // Abaikan karakter non-alfabet

      // Plugboard substitusi awal
      char = plugboardSubstitute(char);

      // Rotor substitusi maju
      char = substitute(char, rotors[0]);
      char = substitute(char, rotors[1]);
      char = substitute(char, rotors[2]);

      // Reflector substitusi
      char = substitute(char, REFLECTOR);

      // Rotor substitusi mundur
      char = substitute(char, rotors[2], true);
      char = substitute(char, rotors[1], true);
      char = substitute(char, rotors[0], true);

      // Plugboard substitusi akhir
      return plugboardSubstitute(char);
    })
    .join("");
}