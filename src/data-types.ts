export function uint20(msb: number, lsb: number, xlsb: number): number {
    return ((msb << 16) | (lsb << 8) | xlsb) >> 4;
}

export function uint16(msb: number, lsb: number): number {
    return msb << 8 | lsb;
}

export function int16(msb: number, lsb: number): number {
    const result = uint16(msb, lsb);

    if (result <= 32767) {
        return result;
    }

    return result - 65536;
}
