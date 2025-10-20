
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


function substitute(char: string, rotor: string, reverse: boolean = false): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const index = reverse ? rotor.indexOf(char) : alphabet.indexOf(char);
  return reverse ? alphabet[index] : rotor[index];
}


function plugboardSubstitute(char: string): string {
  return PLUGBOARD[char] || char;
}


export function enigmaEncrypt(plaintext: string, rotorPositions: number[]): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const rotors = ROTORS.map((rotor, i) =>
    rotor.slice(rotorPositions[i]) + rotor.slice(0, rotorPositions[i])
  );

  return plaintext
    .toUpperCase()
    .split("")
    .map((char) => {
      if (!alphabet.includes(char)) return char;


      char = plugboardSubstitute(char);

      
      char = substitute(char, rotors[0]);
      char = substitute(char, rotors[1]);
      char = substitute(char, rotors[2]);

      
      char = substitute(char, REFLECTOR);

      
      char = substitute(char, rotors[2], true);
      char = substitute(char, rotors[1], true);
      char = substitute(char, rotors[0], true);

      
      return plugboardSubstitute(char);
    })
    .join("");
}