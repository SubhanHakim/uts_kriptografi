import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectGhostDemoProps {
  value?: string;
  onChange?: (value: string) => void;
  options: { value: string; label: string }[];
}



export default function SelectGhostDemo({ value, onChange, options }: SelectGhostDemoProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full border-none hover:bg-accent shadow-none">
        <SelectValue placeholder="Select Input" />
      </SelectTrigger>
      <SelectContent position="popper" side="bottom" align="start" sideOffset={8}>
        <SelectGroup>
          <SelectLabel>Input Types</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
