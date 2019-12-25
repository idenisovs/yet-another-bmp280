export declare const deviceId = 208;
export declare const reset = 224;
export declare const status = 243;
export declare const ctrl_meas = 244;
export declare const config = 245;
export declare const press: {
    msb: number;
    lsb: number;
    xlsb: number;
};
export declare const temp: {
    msb: number;
    lsb: number;
    xlsb: number;
};
export declare class Registers {
    ctrl_meas: number;
    config: number;
}
