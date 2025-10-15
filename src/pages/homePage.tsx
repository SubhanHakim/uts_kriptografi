import { useState } from 'react';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { SelectGroup, SelectLabel } from '@/components/ui/select';

const programs = [
  { id: 'vigenere', name: 'Vigenere Cipher', description: 'Standard 26 huruf alfabet' },
  { id: 'auto-key', name: 'Auto-Key Vigenere Cipher', description: 'Varian Vigenere Cipher' },
  { id: 'extended', name: 'Extended Vigenere Cipher', description: '256 karakter ASCII' },
  { id: 'playfair', name: 'Playfair Cipher', description: '26 huruf alfabet' },
  { id: 'affine', name: 'Affine Cipher', description: '26 huruf alfabet' },
  { id: 'hill', name: 'Hill Cipher', description: '26 huruf alfabet' },
  { id: 'super', name: 'Super Encryption', description: 'Extended Vigenere + Transposisi Kolom' },
  { id: 'enigma', name: 'Enigma Cipher', description: 'Bonus 1' },
  { id: 'ruby', name: 'Ruby Cipher', description: 'Bonus 2: Menggunakan Ruby' },
];

export default function HomePage() {
  const [mode, setMode] = useState<'encrypted' | 'decrypted'>('encrypted'); // State untuk toggle
  const [selectedProgram, setSelectedProgram] = useState<string>('vigenere'); // State untuk program

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
                'cursor-pointer rounded-lg border p-4 shadow-md transition-colors',
                selectedProgram === program.id
                  ? 'bg-primary text-black'
                  : 'bg-white/5 text-muted-foreground hover:bg-primary/10'
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
            'flex flex-col gap-4 items-center mt-8 rounded-lg bg-white/5 backdrop-blur-md shadow-md p-4'
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
              pressed={mode === 'decrypted'}
              onPressedChange={() => setMode('decrypted')}
              className={cn(
                'w-full px-4 py-2 text-lg font-medium text-center rounded-lg transition-colors',
                mode === 'decrypted' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
              )}
            >
              Decrypted
            </Toggle>
            <Toggle
              pressed={mode === 'encrypted'}
              onPressedChange={() => setMode('encrypted')}
              className={cn(
                'w-full px-4 py-2 text-lg font-medium text-center rounded-lg transition-colors',
                mode === 'encrypted' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
              )}
            >
              Encrypted
            </Toggle>
          </div>
          <div className="mt-4 text-xl font-semibold">
            {mode === 'encrypted' ? 'Mode: Encrypted' : 'Mode: Decrypted'}
          </div>

          <div>
            <div
              className="flex justify-center self-start pt-6 w-full"
              style={{
                all: 'revert',
                display: 'flex',
                justifyContent: 'center',
                alignSelf: 'flex-start',
                paddingTop: '1.5rem',
                width: '100%',
                fontSize: '14px',
                lineHeight: '1.5',
                letterSpacing: 'normal'
              }}
            >
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}