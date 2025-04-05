export enum ApprovalStatus {
    Entered = 0,
    Pending = 1,
    Ready = 2,
    Approved = 3,
    Rejected = 4
}
export function fromUnixTimestamp(timestamp: bigint | number): Date {
    const seconds = typeof timestamp === "bigint" ? Number(timestamp) : timestamp;
    return new Date(seconds * 1000); // Multiply by 1000 to convert seconds to milliseconds
}


export async function computeHash(url: string): Promise<string> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Invalid data");
    }
    const data = await response.arrayBuffer();
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
    const hashArray = new Uint8Array(hashBuffer);
    // Convert bytes to hex string (uppercase)
    return toHex(hashArray, true);
}
export function hexToByteArray(value: string): Uint8Array {
    // If the string is null or empty, return an empty Uint8Array.
    if (!value) {
        return new Uint8Array(0);
    }

    const length = value.length;
    // If the hex string starts with "0x", skip those two characters.
    let index = value.startsWith("0x") ? 2 : 0;
    let effectiveLength = length - index;
    let oddLength = false;

    // If the effective length is odd, mark it and increment the count to make it even.
    if (effectiveLength % 2 !== 0) {
        oddLength = true;
        effectiveLength++;
    }

    const byteArray = new Uint8Array(effectiveLength / 2);
    let pos = 0;

    // If the hex digits count was odd, process the first character separately.
    if (oddLength) {
        byteArray[pos++] = fromCharacterToByte(value.charAt(index), index);
        index++;
    }

    // Process pairs of characters.
    for (let i = index; i < value.length; i += 2) {
        // The first character in the pair is shifted left by 4 bits.
        const highNibble = fromCharacterToByte(value.charAt(i), i, 4);
        // The second character is used as is.
        const lowNibble = fromCharacterToByte(value.charAt(i + 1), i + 1);
        byteArray[pos++] = highNibble | lowNibble;
    }

    return byteArray;
}

/**
 * Converts a single hex character to its numerical value.
 * @param c The hex character.
 * @param index The index of the character (used for error messages).
 * @param shift If provided as 4, the result is shifted left by 4 bits.
 * @returns The nibble value (optionally shifted) for the given hex character.
 */
function fromCharacterToByte(c: string, index: number, shift: number = 0): number {
    const nibble = parseInt(c, 16);
    if (isNaN(nibble)) {
        throw new Error(`Invalid hex character at index ${index}: ${c}`);
    }
    return shift === 4 ? nibble << 4 : nibble;
}

export function toHex(value: Uint8Array, prefix: boolean = false): string {
    const hex = Array.from(value, byte => byte.toString(16).padStart(2, '0')).join('');
    return (prefix ? '0x' : '') + hex;
}