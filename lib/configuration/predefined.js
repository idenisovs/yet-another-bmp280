"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mode_1 = require("./mode");
var filter_1 = require("./filter");
var oversampling_1 = require("./oversampling");
var standby_1 = require("./standby");
var WeatherMonitoring = /** @class */ (function () {
    function WeatherMonitoring() {
        this.mode = mode_1.Mode.forced;
        this.filter = filter_1.Filter.off;
        this.standby = standby_1.Standby.SB_1000MS;
        this.oversampling = {
            temperature: oversampling_1.Oversampling.x1,
            pressure: oversampling_1.Oversampling.x1
        };
    }
    return WeatherMonitoring;
}());
exports.WeatherMonitoring = WeatherMonitoring;
//# sourceMappingURL=predefined.js.map