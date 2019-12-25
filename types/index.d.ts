import { I2cBus } from 'i2c-bus';
import Properties from './properties';
import Configuration from './configuration';
import { Registers } from './registers';
import Measurements from './measurements';
import Calibration from './calibration';
export declare class BMP280 implements Properties {
    device: I2cBus | null;
    bus: number;
    address: number;
    configuration: Configuration;
    calibration: Calibration | null;
    registers: Registers;
    constructor(properties: Properties);
    connect(): Promise<void>;
    readConfig(): Promise<Configuration>;
    writeConfig(configuration: Configuration): Promise<void>;
    read(register: number): Promise<number>;
    write(register: number, value: number): Promise<void>;
    sensors(): Promise<Measurements>;
    disconnect(): Promise<void>;
    private readCalibration;
    private pause;
}
