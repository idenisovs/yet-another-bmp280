export const deviceId = 0xD0;
export const reset = 0xE0;
export const status = 0xF3;
export const ctrl_meas = 0xF4;
export const config = 0xF5;

export const dig_T1 = {
    lsb: 0x88, msb: 0x89
};

export const dig_P9 = {
    lsb: 0x9E, msb: 0x9F
};

export const press = {
    msb: 0xF7,
    lsb: 0xF8,
    xlsb: 0xF9
};

export const temp = {
    msb: 0xFA,
    lsb: 0xFB,
    xlsb: 0xFC
};

export class Registers {
    ctrl_meas: number = 0;
    config: number = 0
}
