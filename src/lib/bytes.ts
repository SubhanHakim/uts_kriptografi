export const strToBytes = (s: string) => new TextEncoder().encode(s);
export const bytesToStr = (u8: Uint8Array) => new TextDecoder().decode(u8);