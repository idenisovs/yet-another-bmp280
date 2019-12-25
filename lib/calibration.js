"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_types_1 = require("./data-types");
var Calibration = /** @class */ (function () {
    function Calibration(raw) {
        this.t = [
            data_types_1.uint16(raw[1], raw[0]),
            data_types_1.int16(raw[3], raw[2]),
            data_types_1.int16(raw[5], raw[4])
        ];
        this.p = [
            data_types_1.uint16(raw[7], raw[6]),
            data_types_1.int16(raw[9], raw[8]),
            data_types_1.int16(raw[11], raw[10]),
            data_types_1.int16(raw[13], raw[12]),
            data_types_1.int16(raw[15], raw[14]),
            data_types_1.int16(raw[17], raw[16]),
            data_types_1.int16(raw[19], raw[18]),
            data_types_1.int16(raw[21], raw[20]),
            data_types_1.int16(raw[23], raw[22])
        ];
    }
    Calibration.prototype.compensate = function (raw) {
        var _a = this.t, dig_T1 = _a[0], dig_T2 = _a[1], dig_T3 = _a[2];
        var _b = this.p, dig_P1 = _b[0], dig_P2 = _b[1], dig_P3 = _b[2], dig_P4 = _b[3], dig_P5 = _b[4], dig_P6 = _b[5], dig_P7 = _b[6], dig_P8 = _b[7], dig_P9 = _b[8];
        var t_fine;
        return {
            temperature: temperature(),
            pressure: pressure()
        };
        function temperature() {
            var adcT = raw.temperature;
            var tvar1 = (((adcT >> 3) - (dig_T1 << 1)) * dig_T2) >> 11;
            var tvar2 = (((((adcT >> 4) - dig_T1) * ((adcT >> 4) - dig_T1)) >> 12) * dig_T3) >> 14;
            t_fine = tvar1 + tvar2;
            return ((t_fine * 5 + 128) >> 8) / 100;
        }
        function pressure() {
            var adcP = raw.pressure;
            var pvar1 = t_fine / 2.0 - 64000.0;
            var pvar2 = pvar1 * pvar1 * dig_P6 / 32768.0;
            pvar2 = pvar2 + pvar1 * dig_P5 * 2.0;
            pvar2 = pvar2 / 4.0 + dig_P4 * 65536.0;
            pvar1 = (dig_P3 * pvar1 * pvar1 / 524288.0 + dig_P2 * pvar1) / 524288.0;
            pvar1 = (1.0 + pvar1 / 32768.0) * dig_P1;
            if (Math.abs(pvar1) <= 1.e-32) {
                return 0;
            }
            var p = 1048576.0 - adcP;
            p = ((p - pvar2 / 4096.0) * 6250.0) / pvar1;
            pvar1 = dig_P9 * p * p / 2147483648.0;
            pvar2 = p * dig_P8 / 32768.0;
            p = p + (pvar1 + pvar2 + dig_P7) / 16.0;
            return p / 100.0;
        }
    };
    return Calibration;
}());
exports.default = Calibration;
//# sourceMappingURL=calibration.js.map