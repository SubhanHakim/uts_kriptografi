import React from "react";
import TextareaWithLabelDemo from "@/components/textarea-04";
import { AffineKeyInput } from "@/components/AffineKeyInput";

interface KeyInputSectionProps {
  selectedProgram: string;
  inputKey: string; // Ubah dari 'key' menjadi 'inputKey'
  onKeyChange: (key: string) => void;
}

const KeyInputSection: React.FC<KeyInputSectionProps> = ({ selectedProgram, inputKey, onKeyChange }) => {
  return (
    <div className="flex w-full items-center gap-4">
      {selectedProgram === "enigma" ? (
        <TextareaWithLabelDemo
          value={inputKey} // Gunakan 'inputKey' di sini
          placeholder="Masukkan kunci, contoh: 1,2,3"
          label="Input Key"
          onChange={(e) => onKeyChange(e.target.value)}
        />
      ) : selectedProgram === "super" ? (
        <TextareaWithLabelDemo
          onChange={(e) => onKeyChange(e.target.value)}
          value={inputKey} // Gunakan 'inputKey' di sini
          label="Input Key"
          placeholder="Masukkan kunci dalam format 'vigenereKey|transposeKey', contoh: mykey|columnkey"
        />
      ) : selectedProgram === "hill" ? (
        <TextareaWithLabelDemo
          onChange={(e) => onKeyChange(e.target.value)}
          value={inputKey} // Gunakan 'inputKey' di sini
          label="Input Key"
          placeholder='Masukkan matriks kunci dalam format JSON, contoh: [[3,3],[2,5]]'
        />
      ) : selectedProgram === "affine" ? (
        <AffineKeyInput onChange={(newKey) => onKeyChange(newKey)} />
      ) : (
        <TextareaWithLabelDemo
          label="Input Key"
          onChange={(e) => onKeyChange(e.target.value)}
          value={inputKey} // Gunakan 'inputKey' di sini
        />
      )}
    </div>
  );
};

export default KeyInputSection;