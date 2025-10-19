import { Input } from "@/components/ui/input";

interface FilledInputProps {
  type?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

}


export default function FilledInputDemo({
  type = "text",
  placeholder = "Input",
  className = "",
  value = "",
  onChange,
}: FilledInputProps) {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      className={`bg-secondary border-none shadow-none w-full ${className}`}
      onChange={onChange}
    />
  );
}
