import { I2cBus } from 'i2c-bus';
export declare function connect(bus: number, address: number): Promise<I2cBus>;
export declare function registerRead(device: I2cBus, address: number, register: number): Promise<number>;
export declare function registerWrite(device: I2cBus, address: number, register: number, value: number): Promise<number>;
export declare function disconnect(device: I2cBus): Promise<void>;
