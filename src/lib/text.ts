export const onlyAZ = (s: string) => s.toUpperCase().replace(/[^A-Z]/g, "");

export const a2i = (char: string) => char.charCodeAt(0) - 65;

export const i2a = (n: number) => String.fromCharCode(65 + n);