import { Mode } from './mode';
import { Filter } from './filter';
import { Oversampling } from './oversampling';
import { Standby } from './standby';
import Configuration from './index';
export declare class WeatherMonitoring implements Configuration {
    mode: Mode;
    filter: Filter;
    oversampling: {
        pressure: Oversampling;
        temperature: Oversampling;
    };
    standby: Standby;
    constructor();
}
