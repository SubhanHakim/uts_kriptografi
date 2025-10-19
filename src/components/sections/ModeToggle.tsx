import React from "react";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

interface ModeToggleProps {
  mode: "encrypt" | "decrypt";
  onToggle: (mode: "encrypt" | "decrypt") => void;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ mode, onToggle }) => {
  return (
    <div className="w-full flex gap-2">
      <Toggle
        pressed={mode === "decrypt"}
        onPressedChange={() => onToggle("decrypt")}
        className={cn(
          "w-full px-4 py-2 text-lg font-medium text-center rounded-lg transition-colors",
          mode === "decrypt" ? "bg-primary text-white" : "bg-muted text-muted-foreground"
        )}
      >
        decrypt
      </Toggle>
      <Toggle
        pressed={mode === "encrypt"}
        onPressedChange={() => onToggle("encrypt")}
        className={cn(
          "w-full px-4 py-2 text-lg font-medium text-center rounded-lg transition-colors",
          mode === "encrypt" ? "bg-primary text-white" : "bg-muted text-muted-foreground"
        )}
      >
        encrypt
      </Toggle>
    </div>
  );
};

export default ModeToggle;