import { useState } from "react";
import ProgramSelector from "@/components/sections/ProgramSelector";
import ModeToggle from "@/components/sections/ModeToggle";
import InputSection from "@/components/sections/InputSection";
import KeyInputSection from "@/components/sections/KeyInputSection";
import OutputSection from "@/components/sections/OutputSection";
import { programRegistry } from "@/lib/programRegistry";
import { Button } from "@/components/ui/button";

const programs = [
  { id: "vigenere", name: "Vigenere Cipher", description: "Standard 26 huruf alfabet" },
  { id: "auto-key", name: "Auto-Key Vigenere Cipher", description: "Varian Vigenere Cipher" },
  { id: "extended", name: "Extended Vigenere Cipher", description: "256 karakter ASCII" },
  { id: "playfair", name: "Playfair Cipher", description: "26 huruf alfabet" },
  { id: "affine", name: "Affine Cipher", description: "26 huruf alfabet" },
  { id: "hill", name: "Hill Cipher", description: "26 huruf alfabet" },
  { id: "super", name: "Super Encryption", description: "Extended Vigenere + Transposisi Kolom" },
  { id: "enigma", name: "Enigma Cipher", description: "Bonus 1" },
];

export default function HomePage() {
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  const [selectedProgram, setSelectedProgram] = useState<string>("vigenere");
  const [text, setText] = useState<string | Uint8Array>("");
  const [key, setKey] = useState<string>("");
  const [output, setOutput] = useState<{ lettersPreview: string; base64: string } | null>(null);
  const [inputType, setInputType] = useState<"text" | "file">("text");
  const fileSupportedPrograms = ["extended", "super"];

  const handleRunProgram = () => {
    const programFunction = programRegistry[selectedProgram];
    if (!programFunction) {
      console.error("Program tidak ditemukan");
      return;
    }

    if (inputType === "file" && !fileSupportedPrograms.includes(selectedProgram)) {
      alert("Algoritma ini tidak mendukung file sebagai input.");
      return;
    }


    const inputText = typeof text === "string" ? text : new TextDecoder().decode(text);

    const result = programFunction(mode, inputText, key);
    setOutput(result);
  };

  const downloadBase64 = (base64: string, filename: string) => {
    const blob = new Blob([base64], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="px-[100px] py-[100px] flex flex-col gap-10 justify-center items-center">
      <ProgramSelector programs={programs} selectedProgram={selectedProgram} onSelect={setSelectedProgram} />
      <div className="flex flex-col w-full gap-4 items-center mt-8 rounded-lg bg-white/5 backdrop-blur-md shadow-md p-4 h-fit">
        <ModeToggle mode={mode} onToggle={setMode} />
        <InputSection
          inputType={inputType}
          text={text}
          onInputTypeChange={setInputType}
          onTextChange={setText}
          fileSupported={fileSupportedPrograms.includes(selectedProgram)}
        />
        <KeyInputSection selectedProgram={selectedProgram} inputKey={key} onKeyChange={setKey} />
        <Button onClick={handleRunProgram}>Run Program</Button>
        <OutputSection
          output={output}
          mode={mode}
          selectedProgram={selectedProgram}
          onDownload={downloadBase64}
        />
      </div>
    </div>
  );
}