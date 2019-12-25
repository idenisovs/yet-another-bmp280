import {Mode} from './mode';
import {Filter} from './filter';
import {Oversampling} from './oversampling';
import {Standby} from './standby';
import Configuration from './index';

export class WeatherMonitoring implements Configuration {
    mode: Mode;
    filter: Filter;
    oversampling: { pressure: Oversampling; temperature: Oversampling };
    standby: Standby;

    constructor() {
        this.mode = Mode.forced;
        this.filter = Filter.off;
        this.standby = Standby.SB_1000MS;
        this.oversampling = {
            temperature: Oversampling.x1,
            pressure: Oversampling.x1
        }
    }
}
