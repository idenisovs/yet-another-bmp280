import {Mode} from './mode';
import {Filter} from './filter';
import {Oversampling} from './oversampling';

export default interface Configuration {
    mode: Mode;
    filter: Filter;
    standby: number;
    oversampling: {
        pressure: Oversampling,
        temperature: Oversampling
    }
}
