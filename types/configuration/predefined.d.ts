import { Mode } from './mode';
import { Filter } from './filter';
import { Standby } from './standby';
import Configuration from './index';
import { Registers } from '../registers';
export declare class DefaultConfiguration implements Configuration {
    mode: Mode;
    filter: Filter;
    standby: Standby;
    oversampling: {
        temperature: number;
        pressure: number;
    };
    get registers(): Registers;
    set registers(value: Registers);
    constructor(configuration: Configuration | Registers);
    toString(): string;
}
export declare class WeatherMonitoring extends DefaultConfiguration {
    constructor();
}
