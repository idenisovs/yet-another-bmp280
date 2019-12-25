import {Mode} from './mode';
import {Filter} from './filter';
import {Oversampling} from './oversampling';
import {Standby} from './standby';
import Configuration from './index';
import {Registers} from '../registers';

export class DefaultConfiguration implements Configuration {
    mode: Mode = 0;
    filter: Filter = 0;
    standby: Standby = 0;
    oversampling = {
        temperature: 0,
        pressure: 0
    };

    get registers(): Registers {
        const result = new Registers();

        result.ctrl_meas = (this.oversampling.temperature << 5)
            | (this.oversampling.pressure << 2)
            | (this.mode);

        result.config = (this.standby << 5)
            | (this.filter << 2);

        return result;
    }

    set registers(value: Registers) {
        const { ctrl_meas, config } = value;

        this.mode = (ctrl_meas & 0b11);
        this.filter = ((config >> 2) & 0b111);
        this.standby = ((config >> 5) & 0b111);

        this.oversampling = {
            pressure: ((ctrl_meas >> 2) & 0b111),
            temperature: ((ctrl_meas >> 5) & 0b111)
        };
    }

    constructor(configuration: Configuration|Registers) {
        if (!configuration) {
            return;
        }

        if (configuration instanceof Registers) {
            this.registers = configuration;
        } else {
            Object.assign(this, configuration);
        }
    }

    toString() {
        const mode = Mode[this.mode];
        const filter = Filter[this.filter];
        const standby = Standby[this.standby].replace('SB_', '').toLowerCase();
        const oing_t = Oversampling[this.oversampling.temperature];
        const oing_p = Oversampling[this.oversampling.pressure];

        return `Mode: ${mode}, Filter: ${filter}, Standby: ${standby}, Ot: ${oing_t}, Op: ${oing_p}`;
    }
}

export class WeatherMonitoring extends DefaultConfiguration {
    constructor() {
        super({
            mode: Mode.forced,
            filter: Filter.off,
            standby: Standby.SB_1000MS,
            oversampling: {
                temperature: Oversampling.x1,
                pressure: Oversampling.x1
            }
        });
    }
}
