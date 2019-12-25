import { uint16, int16 } from './data-types';
import Measurements from './measurements';

export default class Calibration {
    t: number[];
    p: number[];

    constructor(raw: Buffer) {
        this.t = [
            uint16(raw[1], raw[0]),
            int16(raw[3], raw[2]),
            int16(raw[5], raw[4])
        ];

        this.p = [
           uint16(raw[7], raw[6]),
           int16(raw[9], raw[8]),
           int16(raw[11], raw[10]),
           int16(raw[13], raw[12]),
           int16(raw[15], raw[14]),
           int16(raw[17], raw[16]),
           int16(raw[19], raw[18]),
           int16(raw[21], raw[20]),
           int16(raw[23], raw[22])
        ]
    }

    compensate(raw: Measurements): Measurements {
        const [ dig_T1, dig_T2, dig_T3 ] = this.t;
        const [ dig_P1, dig_P2, dig_P3, dig_P4, dig_P5, dig_P6, dig_P7, dig_P8, dig_P9 ] = this.p;

        let t_fine: number;

        return {
            temperature: temperature(),
            pressure: pressure()
        };

        function temperature(): number {
            const adcT = raw.temperature;

            const tvar1 = (((adcT >> 3) - (dig_T1 << 1)) * dig_T2) >> 11;
            const tvar2 = (((((adcT >> 4) - dig_T1) * ((adcT >> 4) - dig_T1)) >> 12) * dig_T3) >> 14;

            t_fine = tvar1 + tvar2;

            return ((t_fine * 5 + 128) >> 8) / 100;
        }

        function pressure(): number {
            const adcP = raw.pressure;

            let pvar1 = t_fine / 2.0 - 64000.0;
            let pvar2 = pvar1 * pvar1 * dig_P6 / 32768.0;

            pvar2 = pvar2 + pvar1 * dig_P5 * 2.0;
            pvar2 = pvar2 / 4.0 + dig_P4 * 65536.0;

            pvar1 = (dig_P3 * pvar1 * pvar1 / 524288.0 + dig_P2 * pvar1) / 524288.0;
            pvar1 = (1.0 + pvar1 / 32768.0) * dig_P1;

            if (Math.abs(pvar1) <= 1.e-32) {
                return 0;
            }

            let p = 1048576.0 - adcP;

            p = ((p - pvar2 / 4096.0) * 6250.0) / pvar1;

            pvar1 = dig_P9 * p * p / 2147483648.0;
            pvar2 = p * dig_P8 / 32768.0;

            p = p + (pvar1 + pvar2 + dig_P7) / 16.0;

            return p / 100.0;
        }
    }
}
