import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AffineKeyInputProps {
  onChange: (key: string) => void;
}

export function AffineKeyInput({ onChange }: AffineKeyInputProps) {
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const handleKeyChange = () => {
    if (!isCoprime(a, 26)) {
      setError('Nilai "a" harus relatif prima terhadap 26.');
      return;
    }

    setError(null);
    onChange(`${a},${b}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Label htmlFor="a" className="text-sm font-medium">
          Nilai a:
        </Label>
        <Input
          id="a"
          type="number"
          value={a}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            setA(isNaN(value) ? 0 : value); 
            handleKeyChange();
          }}
        />
      </div>
      <div>
        <Label htmlFor="b" className="text-sm font-medium">
          Nilai b:
        </Label>
        <Input
          id="b"
          type="number"
          value={b}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            setB(isNaN(value) ? 0 : value); 
            handleKeyChange();
          }}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

function isCoprime(a: number, b: number): boolean {
  return gcd(a, b) === 1;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}