import { useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import SelectGhostDemo from "@/components/select-03";
import { Label } from "@/components/ui/label";
import TextareaWithLabelDemo from "@/components/textarea-04";
import { programRegistry } from "@/lib/programRegistry";
import { Button } from "@/components/ui/button";
import { readFileAsBytes } from "@/lib/file";
import FileInputDemoFile from "@/components/input-11";
import { evigDecrypt, evigEncrypt } from "@/cipher/extendedVigenere";
import { toBase64 } from "@/lib/base64";
import { AffineKeyInput } from "@/components/AffineKeyInput";
import { Textarea } from "@/components/ui/textarea";
import { superDecryptFile, superEncryptFile } from "@/cipher/superEncryption";

const programs = [
  { id: "vigenere", name: "Vigenere Cipher", description: "Standard 26 huruf alfabet" },
  { id: "auto-key", name: "Auto-Key Vigenere Cipher", description: "Varian Vigenere Cipher" },
  { id: "extended", name: "Extended Vigenere Cipher", description: "256 karakter ASCII" },
  { id: "playfair", name: "Playfair Cipher", description: "26 huruf alfabet" },
  { id: "affine", name: "Affine Cipher", description: "26 huruf alfabet" },
  { id: "hill", name: "Hill Cipher", description: "26 huruf alfabet" },
  { id: "super", name: "Super Encryption", description: "Extended Vigenere + Transposisi Kolom" },
  { id: "enigma", name: "Enigma Cipher", description: "Bonus 1" },
  { id: "ruby", name: "Ruby Cipher", description: "Bonus 2: Menggunakan Ruby" },
];

export default function HomePage() {
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  const [selectedProgram, setSelectedProgram] = useState<string>("vigenere");
  const [text, setText] = useState<string | Uint8Array>("");
  const [key, setKey] = useState<string>("");
  const [output, setOutput] = useState<{ lettersPreview: string; base64: string } | null>(null);
  const [inputType, setInputType] = useState<"text" | "file">("text");
  const fileSupportedPrograms = ["extended", "super"];

  const downloadBase64 = (base64: string, filename: string) => {
    const blob = new Blob([base64], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRunProgram = () => {
    const programFunction = programRegistry[selectedProgram];
    console.log("Selected Program:", selectedProgram);
    console.log("Input Type:", inputType);
    console.log("Key:", key);
    console.log("Key Split:", key.split(","));
    console.log("Key sebelum diteruskan ke programFunction:", key);

    if (programFunction) {
      if (inputType === "file" && !fileSupportedPrograms.includes(selectedProgram)) {
        console.error("Algoritma ini tidak mendukung file sebagai input.");
        alert("Algoritma ini tidak mendukung file sebagai input. Silakan pilih input teks.");
        return;
      }

      if (inputType === "text" && typeof text === "string") {
        console.log("Running algorithm for text input...");
        const result = programFunction(mode, text, key);
        console.log("Algorithm Result:", result);
        setOutput({
          ...result,
          lettersPreview: result.lettersPreview.toUpperCase(), // Pastikan huruf besar
        });
      } else if (inputType === "file" && text instanceof Uint8Array) {
        console.log("Running algorithm for file input...");
        if (selectedProgram === "super") {
          const [vigenereKey, transposeKey] = key.split("|");
          if (!vigenereKey || !transposeKey) {
            console.error("Key harus dalam format 'vigenereKey|transposeKey'.");
            return;
          }

          const resultBytes =
            mode === "encrypt"
              ? superEncryptFile(text, vigenereKey, transposeKey)
              : superDecryptFile(text, vigenereKey, transposeKey);

          const base64 = toBase64(resultBytes);
          console.log("File Algorithm Result (Base64):", base64);

          try {
            const lettersPreview = new TextDecoder().decode(resultBytes);
            setOutput({ lettersPreview, base64 });
          } catch {
            console.warn("Letters Preview tidak dapat ditampilkan untuk file ini.");
            setOutput({ lettersPreview: "", base64 });
          }
        } else {
          const resultBytes =
            mode === "encrypt"
              ? evigEncrypt(text, key)
              : evigDecrypt(text, key);
          const base64 = toBase64(resultBytes);
          console.log("File Algorithm Result (Base64):", base64);

          try {
            const lettersPreview = new TextDecoder().decode(resultBytes);
            setOutput({ lettersPreview, base64 });
          } catch (error) {
            console.warn("Letters Preview tidak dapat ditampilkan untuk file ini.", error);
            setOutput({ lettersPreview: "", base64 });
          }
        }
      } else {
        console.error("Input tidak valid");
      }
    } else {
      console.error("Program tidak ditemukan");
    }
  };

  return (
    <div className="px-[100px] py-[100px] flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center w-full gap-4 text-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="font-bold text-5xl uppercase align-middle items-center">
            Web Kriptografi <br /> Toolkit
          </h1>
          <span className="w-[900px] text-lg font-normal align-middle items-center">
            Aplikasi kriptografi berbasis web untuk enkripsi / dekripsi teks & file. Menampilkan Base64, mendukung cipher 26 huruf dan Extended (256 byte), serta penyimpanan cipher binary.
          </span>
        </div>
        {/* Card Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {programs.map((program) => (
            <div
              key={program.id}
              onClick={() => setSelectedProgram(program.id)}
              className={cn(
                "cursor-pointer rounded-lg border p-4 shadow-md transition-colors",
                selectedProgram === program.id
                  ? "bg-primary text-black"
                  : "bg-white/5 text-muted-foreground hover:bg-primary/10"
              )}
            >
              <h2 className="text-xl font-semibold">{program.name}</h2>
              <p className="text-sm">
                {selectedProgram === program.id
                  ? `Dipilih: ${program.description}`
                  : program.description}
              </p>
            </div>
          ))}
        </div>

        {/* Toggle Section */}
        <div
          className={cn(
            "flex flex-col gap-4 items-center mt-8 rounded-lg bg-white/5 backdrop-blur-md shadow-md p-4 h-screen"
          )}
        >
          <div>
            {selectedProgram && (
              <div className="mt-8 text-xl font-semibold">
                Program Terpilih: {programs.find((p) => p.id === selectedProgram)?.name}
              </div>
            )}
          </div>
          <div className="w-full flex gap-2">
            <Toggle
              pressed={mode === "decrypt"}
              onPressedChange={() => setMode("decrypt")}
              className={cn(
                "w-full px-4 py-2 text-lg font-medium text-center rounded-lg transition-colors",
                mode === "decrypt" ? "bg-primary text-white" : "bg-muted text-muted-foreground"
              )}
            >
              decrypt
            </Toggle>
            <Toggle
              pressed={mode === "encrypt"}
              onPressedChange={() => setMode("encrypt")}
              className={cn(
                "w-full px-4 py-2 text-lg font-medium text-center rounded-lg transition-colors",
                mode === "encrypt" ? "bg-primary text-white" : "bg-muted text-muted-foreground"
              )}
            >
              encrypt
            </Toggle>
          </div>
          <div className="mt-4 text-xl font-semibold">
            {mode === "encrypt" ? "Mode: encrypt" : "Mode: decrypt"}
          </div>

          <div className="w-full">
            <div className="flex flex-col w-full gap-4 items-center">
              <div className="flex w-full items-center gap-4">
                <Label htmlFor="input-type" className="text-sm font-medium shrink-0">
                  Input Type :
                </Label>
                <SelectGhostDemo
                  value={inputType}
                  onChange={(value) => setInputType(value as "text" | "file")}
                  options={[
                    { value: "text", label: "Text" },
                    ...(fileSupportedPrograms.includes(selectedProgram)
                      ? [{ value: "file", label: "File" }]
                      : []), // Hanya tambahkan opsi file jika program mendukung file
                  ]}
                />
              </div>
              {inputType === "text" ? (
                <TextareaWithLabelDemo
                  onChange={(e) => setText(e.target.value)}
                  value={typeof text === "string" ? text : new TextDecoder().decode(text)}
                />
              ) : (
                <FileInputDemoFile
                  onChange={(file) => {
                    if (file) {
                      readFileAsBytes(file).then((bytes) => setText(bytes));
                    }
                  }}
                />
              )}
              <div className="flex w-full items-center gap-4">
                {selectedProgram === "enigma" ? (
                  <TextareaWithLabelDemo
                    value={key}
                    placeholder="Masukkan kunci, contoh: 1,2,3"
                    label="Input Key"
                    onChange={(e) => setKey(e.target.value)}
                  />
                ) : selectedProgram === "super" ? (
                  <TextareaWithLabelDemo
                    onChange={(e) => setKey(e.target.value)}
                    value={key}
                    label="input Key"
                    placeholder="Masukkan kunci dalam format 'vigenereKey|transposeKey', contoh: mykey|columnkey"
                  />
                ) : selectedProgram === "hill" ? (
                  <TextareaWithLabelDemo
                    onChange={(e) => setKey(e.target.value)}
                    value={key}
                    label="Input Key"
                    placeholder='Masukkan matriks kunci dalam format JSON, contoh: [[3,3],[2,5]]'
                  />
                ) : selectedProgram === "affine" ? (
                  <AffineKeyInput onChange={(newKey) => setKey(newKey)} />
                ) : (
                  <TextareaWithLabelDemo
                    label="Input Key"
                    onChange={(e) => setKey(e.target.value)}
                    value={key}
                  />
                )}
              </div>
              <Button onClick={handleRunProgram} className="w-full bg-primary">
                Run Program
              </Button>
            </div>
            {output && (
              <div className="mt-8 text-left">
                <p className="text-lg font-medium">Letters Preview:</p>
                <Textarea
                  value={output.lettersPreview}
                  readOnly
                  className="w-full h-32 resize-none overflow-auto border border-gray-300 rounded-md p-2"
                />
                <p className="text-lg font-medium mt-4">Base64:</p>
                <Textarea
                  value={output.base64}
                  readOnly
                  className="w-full h-32 resize-none overflow-auto border border-gray-300 rounded-md p-2"
                />
                <Button
                  onClick={() => downloadBase64(output.base64, `output-${mode}-${selectedProgram}.dat`)}
                  className="mt-4 bg-primary text-white px-4 py-2 rounded-md"
                >
                  Download Base64
                </Button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}