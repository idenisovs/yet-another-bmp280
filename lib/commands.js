"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var i2c_bus_1 = __importDefault(require("i2c-bus"));
var registers_1 = require("./registers");
function connect(bus, address) {
    return new Promise(function (resolve, reject) {
        var device = i2c_bus_1.default.open(bus, function (error) {
            if (error) {
                return reject(error);
            }
            device.readByte(address, registers_1.deviceId, (function (error, chipId) {
                if (error) {
                    return reject(error);
                }
                if (chipId !== 88) {
                    return reject("Wrong device: expected 88, actual " + chipId);
                }
                resolve(device);
            }));
        });
    });
}
exports.connect = connect;
function registerRead(device, address, register) {
    return new Promise(function (resolve, reject) {
        device.readByte(address, register, (function (error, result) {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        }));
    });
}
exports.registerRead = registerRead;
function registerWrite(device, address, register, value) {
    return new Promise(function (resolve, reject) {
        device.writeByte(address, register, value, function (error) {
            if (error) {
                reject(error);
            }
            else {
                resolve();
            }
        });
    });
}
exports.registerWrite = registerWrite;
function readBlock(device, address, start, size) {
    return new Promise(function (resolve, reject) {
        device.readI2cBlock(address, start, size, Buffer.alloc(size), (function (error, bytesReadOrWritten, buffer) {
            if (error) {
                reject(error);
            }
            else {
                resolve(buffer);
            }
        }));
    });
}
exports.readBlock = readBlock;
function disconnect(device) {
    return new Promise(function (resolve, reject) {
        device.close((function (error) {
            if (error) {
                reject(error);
            }
            else {
                resolve();
            }
        }));
    });
}
exports.disconnect = disconnect;
//# sourceMappingURL=commands.js.map