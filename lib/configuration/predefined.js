"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mode_1 = require("./mode");
var filter_1 = require("./filter");
var oversampling_1 = require("./oversampling");
var standby_1 = require("./standby");
var registers_1 = require("../registers");
var DefaultConfiguration = /** @class */ (function () {
    function DefaultConfiguration(configuration) {
        this.mode = 0;
        this.filter = 0;
        this.standby = 0;
        this.oversampling = {
            temperature: 0,
            pressure: 0
        };
        if (!configuration) {
            return;
        }
        if (configuration instanceof registers_1.Registers) {
            this.registers = configuration;
        }
        else {
            Object.assign(this, configuration);
        }
    }
    Object.defineProperty(DefaultConfiguration.prototype, "registers", {
        get: function () {
            var result = new registers_1.Registers();
            result.ctrl_meas = (this.oversampling.temperature << 5)
                | (this.oversampling.pressure << 2)
                | (this.mode);
            result.config = (this.standby << 5)
                | (this.filter << 2);
            return result;
        },
        set: function (value) {
            var ctrl_meas = value.ctrl_meas, config = value.config;
            this.mode = (ctrl_meas & 3);
            this.filter = ((config >> 2) & 7);
            this.standby = ((config >> 5) & 7);
            this.oversampling = {
                pressure: ((ctrl_meas >> 2) & 7),
                temperature: ((ctrl_meas >> 5) & 7)
            };
        },
        enumerable: true,
        configurable: true
    });
    DefaultConfiguration.prototype.toString = function () {
        var mode = mode_1.Mode[this.mode];
        var filter = filter_1.Filter[this.filter];
        var standby = standby_1.Standby[this.standby].replace('SB_', '').toLowerCase();
        var oing_t = oversampling_1.Oversampling[this.oversampling.temperature];
        var oing_p = oversampling_1.Oversampling[this.oversampling.pressure];
        return "Mode: " + mode + ", Filter: " + filter + ", Standby: " + standby + ", Ot: " + oing_t + ", Op: " + oing_p;
    };
    return DefaultConfiguration;
}());
exports.DefaultConfiguration = DefaultConfiguration;
var WeatherMonitoring = /** @class */ (function (_super) {
    __extends(WeatherMonitoring, _super);
    function WeatherMonitoring() {
        return _super.call(this, {
            mode: mode_1.Mode.forced,
            filter: filter_1.Filter.off,
            standby: standby_1.Standby.SB_1000MS,
            oversampling: {
                temperature: oversampling_1.Oversampling.x1,
                pressure: oversampling_1.Oversampling.x1
            }
        }) || this;
    }
    return WeatherMonitoring;
}(DefaultConfiguration));
exports.WeatherMonitoring = WeatherMonitoring;
//# sourceMappingURL=predefined.js.map