import Configuration from './configuration';
import {Mode} from './configuration/mode';
import {Oversampling} from './configuration/oversampling';

class BMP280 {
    private mode = Mode.normal;
    private oversampling = Oversampling.none;

    constructor(config: Configuration) {
    }
}

module.exports = BMP280;
