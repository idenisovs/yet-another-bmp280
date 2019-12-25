"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function uint20(msb, lsb, xlsb) {
    return ((msb << 16) | (lsb << 8) | xlsb) >> 4;
}
exports.uint20 = uint20;
function uint16(msb, lsb) {
    return msb << 8 | lsb;
}
exports.uint16 = uint16;
function int16(msb, lsb) {
    var result = uint16(msb, lsb);
    if (result <= 32767) {
        return result;
    }
    return result - 65536;
}
exports.int16 = int16;
//# sourceMappingURL=data-types.js.map