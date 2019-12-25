"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceId = 0xD0;
exports.reset = 0xE0;
exports.status = 0xF3;
exports.ctrl_meas = 0xF4;
exports.config = 0xF5;
exports.dig_T1 = {
    lsb: 0x88, msb: 0x89
};
exports.dig_P9 = {
    lsb: 0x9E, msb: 0x9F
};
exports.press = {
    msb: 0xF7,
    lsb: 0xF8,
    xlsb: 0xF9
};
exports.temp = {
    msb: 0xFA,
    lsb: 0xFB,
    xlsb: 0xFC
};
var Registers = /** @class */ (function () {
    function Registers() {
        this.ctrl_meas = 0;
        this.config = 0;
    }
    return Registers;
}());
exports.Registers = Registers;
//# sourceMappingURL=registers.js.map