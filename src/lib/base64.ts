export const strToBytes = (str: string) => new TextEncoder().encode(str);

export const toBase64 = (bytes: Uint8Array) => {
    let bin = '';
    bytes.forEach((b) => bin += String.fromCharCode(b));
    return btoa(bin);
}

export const fromBase64 = (b64: string): Uint8Array => {
    const bin = atob(b64.replace(/\s/g, ''));
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
}