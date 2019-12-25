import {I2cBus} from 'i2c-bus';
import Properties from './properties';
import Configuration from './configuration';
import {DefaultConfiguration, WeatherMonitoring} from './configuration/predefined';
import {connect, disconnect, registerRead, registerWrite} from './commands';
import {ctrl_meas, config, Registers} from './registers';

class BMP280 implements Properties {
    device: I2cBus|null;
    bus: number;
    address: number;
    configuration: Configuration;

    constructor(properties: Properties) {
        this.bus = properties.bus;
        this.address = properties.address;
        this.configuration = properties.configuration || new WeatherMonitoring();
        this.device = null;
    }

    async connect(): Promise<void> {
        if (this.device) {
            return;
        }

        this.device = await connect(this.bus, this.address);
        await this.writeConfig(this.configuration);
    }

    async readConfig(): Promise<Configuration> {
        const registers = new Registers();

        registers.ctrl_meas = await registerRead(this.device as I2cBus, this.address, ctrl_meas);
        registers.config = await registerRead(this.device as I2cBus, this.address, config);

        return new DefaultConfiguration(registers);
    }

    async writeConfig(configuration: Configuration): Promise<void> {
        const cfg = new DefaultConfiguration(configuration);

        const registers = cfg.registers;

        await registerWrite(this.device as I2cBus, this.address, ctrl_meas, registers.ctrl_meas);
        await registerWrite(this.device as I2cBus, this.address, config, registers.config);
    }

    async disconnect(): Promise<void> {
        if (this.device) {
            await disconnect(this.device);
        }
    }
}

module.exports = BMP280;
