"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var predefined_1 = require("./configuration/predefined");
var BMP280 = /** @class */ (function () {
    function BMP280(properties) {
        this.bus = properties.bus;
        this.address = properties.address;
        this.configuration = properties.configuration || new predefined_1.WeatherMonitoring();
    }
    return BMP280;
}());
module.exports = BMP280;
//# sourceMappingURL=index.js.map