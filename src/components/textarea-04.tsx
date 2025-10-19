import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TextareaWithLabelProps {
  value?: string;
  placeholder?: string;
  className?: string;
  label?: string; // Tambahkan properti untuk label
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextareaWithLabelDemo({
  value = "",
  placeholder = "Input Text",
  className = "",
  label = "Input Text",
  onChange,
}: TextareaWithLabelProps) {
  return (
    <div className="flex w-full items-center gap-4">
      <Label htmlFor="message" className="text-sm font-medium shrink-0">
        {label} :
      </Label>
      <Textarea
        id="message"
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}