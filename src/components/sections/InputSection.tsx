import React from "react";
import { Label } from "@/components/ui/label";
import TextareaWithLabelDemo from "@/components/textarea-04";
import FileInputDemoFile from "@/components/input-11";
import { readFileAsBytes } from "@/lib/file";
import SelectGhostDemo from "@/components/select-03";

interface InputSectionProps {
  inputType: "text" | "file";
  text: string | Uint8Array;
  onInputTypeChange: (type: "text" | "file") => void;
  onTextChange: (text: string | Uint8Array) => void;
  fileSupported: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({
  inputType,
  text,
  onInputTypeChange,
  onTextChange,
  fileSupported,
}) => {
  return (
    <div className="flex flex-col w-full gap-4 items-center">
      <div className="flex w-full items-center gap-4">
        <Label htmlFor="input-type" className="text-sm font-medium shrink-0">
          Input Type :
        </Label>
        <SelectGhostDemo
          value={inputType}
          onChange={(value) => onInputTypeChange(value as "text" | "file")}
          options={[
            { value: "text", label: "Text" },
            ...(fileSupported ? [{ value: "file", label: "File" }] : []),
          ]}
        />
      </div>
      {inputType === "text" ? (
        <TextareaWithLabelDemo
          onChange={(e) => onTextChange(e.target.value)}
          value={typeof text === "string" ? text : new TextDecoder().decode(text)}
        />
      ) : (
        <FileInputDemoFile
          onChange={(file) => {
            if (file) {
              readFileAsBytes(file).then((bytes) => onTextChange(bytes));
            }
          }}
        />
      )}
    </div>
  );
};

export default InputSection;