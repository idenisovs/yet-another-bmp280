import i2c, {I2cBus} from 'i2c-bus';
import {deviceId} from './registers';

export function connect(bus: number, address: number): Promise<I2cBus> {
    return new Promise((resolve, reject) => {
        const device = i2c.open(bus, error => {
            if (error) {
                return reject(error);
            }

            device.readByte(address, deviceId, ((error, chipId: number) => {
                if (error) {
                    return reject(error);
                }

                if (chipId !== 88) {
                    return reject(`Wrong device: expected 88, actual ${chipId}`);
                }

                resolve(device);
            }))
        })
    });
}

export function registerRead(device: I2cBus, address: number, register: number): Promise<number> {
    return new Promise((resolve, reject) => {
        device.readByte(address, register, ((error, result: number) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        }));
    });
}

export function registerWrite(device: I2cBus, address: number, register: number, value: number): Promise<number> {
    return new Promise((resolve, reject) => {
        device.writeByte(address, register, value, error => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

export function disconnect(device: I2cBus): Promise<void> {
    return new Promise((resolve, reject) => {
        device.close((error => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        }))
    });
}
