import Properties from './properties';
import Configuration from './configuration';
import {WeatherMonitoring} from './configuration/predefined';

class BMP280 implements Properties {
    bus: number;
    address: number;
    configuration: Configuration;

    constructor(properties: Properties) {
        this.bus = properties.bus;
        this.address = properties.address;
        this.configuration = properties.configuration || new WeatherMonitoring();
    }
}

module.exports = BMP280;
