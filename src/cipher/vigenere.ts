import { mod } from "@/lib/mod";
import { onlyAZ, a2i, i2a } from "@/lib/text";


const normKey = (k: string) => {
    const K = onlyAZ(k);
    if(!K) throw new Error('Key Harus berisi dengan huruf A-Z');
    return K;
}

export function vigenereEncrypt(plaintext: string, key: string) { 
    const P = onlyAZ(plaintext);
    const K = normKey(key);
    let ciphertext = '';
    for(let i = 0; i < P.length; i++) {
        const c = mod(a2i(P[i]) + a2i(K[i % K.length]), 26);
        ciphertext += i2a(c);
    }

    return ciphertext.toUpperCase();
}

export function vigenereDecrypt(ciphertext: string, key: string) {
    const C = onlyAZ(ciphertext);
    const K = normKey(key);
    let plaintext = '';
    for(let i = 0; i < C.length; i++) {
        const p = mod(a2i(C[i]) - a2i(K[i % K.length]), 26);
        plaintext += i2a(p);
    }

    return plaintext.toUpperCase();
}
