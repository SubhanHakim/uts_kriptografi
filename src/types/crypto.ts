export type Mode = "encrypt" | "decrypt";

export type InputType = "text" | "file";

export type Algorithm =
  | "vigenere"         
  | "autokey"           
  | "extended";

// -------- TEXT MODE --------
export interface RunTextParams {
  algo: Algorithm;      
  mode: Mode;           
  text: string;         
  key: string;          
}

export interface RunTextResult {
  lettersPreview?: string;

  base64: string;

  previewText?: string;
}

// -------- FILE MODE --------
export interface RunFileParams {
  mode: Mode;  
  file: File;
  key: string;
}

export interface RunFileResult {
  base64: string;      
  downloadName: string;
}
