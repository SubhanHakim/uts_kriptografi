import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface OutputSectionProps {
  output: { lettersPreview: string; base64: string } | null;
  mode: "encrypt" | "decrypt";
  selectedProgram: string;
  onDownload: (base64: string, filename: string) => void;
}

const OutputSection: React.FC<OutputSectionProps> = ({ output, mode, selectedProgram, onDownload }) => {
  if (!output) return null;

  return (
    <div className="flex flex-col gap-5 text-left w-full justify-center items-center">
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
      <div>
        <Button
          onClick={() => onDownload(output.base64, `output-${mode}-${selectedProgram}.dat`)}
          className="mt-4 bg-primary text-black px-4 py-2 rounded-md"
        >
          Download Base64
        </Button>
      </div>
    </div>
  );
};

export default OutputSection;