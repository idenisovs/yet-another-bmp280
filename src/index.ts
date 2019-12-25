import {I2cBus} from 'i2c-bus';
import Properties from './properties';
import Configuration from './configuration';
import {DefaultConfiguration, WeatherMonitoring} from './configuration/predefined';
import {connect, disconnect, registerRead, registerWrite, readBlock} from './commands';
import {ctrl_meas, config, press, Registers, dig_T1, dig_P9} from './registers';
import Measurements from './measurements';
import {uint20} from './data-types';
import Calibration from './calibration';

class BMP280 implements Properties {
    device: I2cBus|null;
    bus: number;
    address: number;
    configuration: Configuration;
    calibration: Calibration|null;

    constructor(properties: Properties) {
        this.bus = properties.bus;
        this.address = properties.address;
        this.configuration = properties.configuration || new WeatherMonitoring();
        this.device = null;
        this.calibration = null;
    }

    async connect(): Promise<void> {
        if (this.device) {
            return;
        }

        this.device = await connect(this.bus, this.address);

        await this.writeConfig(this.configuration);

        this.calibration = await this.readCalibration();
    }

    async readConfig(): Promise<Configuration> {
        const registers = new Registers();

        registers.ctrl_meas = await this.read(ctrl_meas);
        registers.config = await this.read(config);

        return new DefaultConfiguration(registers);
    }

    async writeConfig(configuration: Configuration): Promise<void> {
        const cfg = new DefaultConfiguration(configuration);

        const registers = cfg.registers;

        await this.write(ctrl_meas, registers.ctrl_meas);
        await this.write(config, registers.config);
    }

    async read(register: number): Promise<number> {
        return await registerRead(this.device as I2cBus, this.address, register)
    }

    async write(register: number, value: number): Promise<void> {
        await registerWrite(this.device as I2cBus, this.address, register, value);
    }

    async values(): Promise<Measurements> {
        const raw = await readBlock(this.device as I2cBus, this.address, press.msb, 6);

        const result: Measurements = {
            temperature: uint20(raw[3], raw[4], raw[5]),
            pressure: uint20(raw[0], raw[1], raw[2])
        };

        if (this.calibration) {
            return this.calibration.compensate(result);
        }

        return result;
    }

    async disconnect(): Promise<void> {
        if (this.device) {
            await disconnect(this.device);
        }
    }

    private async readCalibration(): Promise<Calibration> {
        const from = dig_T1.lsb;
        const size = dig_P9.msb - dig_T1.lsb;

        const raw = await readBlock(this.device as I2cBus, this.address, from, size);

        return new Calibration(raw);
    }
}

module.exports = BMP280;
