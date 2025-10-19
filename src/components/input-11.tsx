import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FileInputDemoFileProps {
  className?: string;
  onChange?: (file: File | null) => void;
}

export default function FileInputDemoFile({
  className = "",
  onChange,
}: FileInputDemoFileProps) {
  return (
    <div className={`w-full max-w-xs ${className}`}>
      <Label htmlFor="file-upload" className="text-sm font-medium">
        Upload File
      </Label>
      <Input
        id="file-upload"
        type="file"
        className="mt-1 file:pt-0.5"
        onChange={(e) => {
          const file = e.target.files?.[0] || null;
          if (onChange) {
            onChange(file);
          }
        }}
      />
    </div>
  );
}