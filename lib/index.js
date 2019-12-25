"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var predefined_1 = require("./configuration/predefined");
var commands_1 = require("./commands");
var registers_1 = require("./registers");
var BMP280 = /** @class */ (function () {
    function BMP280(properties) {
        this.bus = properties.bus;
        this.address = properties.address;
        this.configuration = properties.configuration || new predefined_1.WeatherMonitoring();
        this.device = null;
    }
    BMP280.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.device) {
                            return [2 /*return*/];
                        }
                        _a = this;
                        return [4 /*yield*/, commands_1.connect(this.bus, this.address)];
                    case 1:
                        _a.device = _b.sent();
                        return [4 /*yield*/, this.writeConfig(this.configuration)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BMP280.prototype.readConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var registers, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        registers = new registers_1.Registers();
                        _a = registers;
                        return [4 /*yield*/, this.read(registers_1.ctrl_meas)];
                    case 1:
                        _a.ctrl_meas = _c.sent();
                        _b = registers;
                        return [4 /*yield*/, this.read(registers_1.config)];
                    case 2:
                        _b.ctrl_meas = _c.sent();
                        return [2 /*return*/, new predefined_1.DefaultConfiguration(registers)];
                }
            });
        });
    };
    BMP280.prototype.writeConfig = function (configuration) {
        return __awaiter(this, void 0, void 0, function () {
            var cfg, registers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cfg = new predefined_1.DefaultConfiguration(configuration);
                        registers = cfg.registers;
                        return [4 /*yield*/, this.write(registers_1.ctrl_meas, registers.ctrl_meas)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.write(registers_1.config, registers.config)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BMP280.prototype.read = function (register) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, commands_1.registerRead(this.device, this.address, register)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BMP280.prototype.write = function (register, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, commands_1.registerWrite(this.device, this.address, register, value)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BMP280.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.device) return [3 /*break*/, 2];
                        return [4 /*yield*/, commands_1.disconnect(this.device)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    return BMP280;
}());
module.exports = BMP280;
//# sourceMappingURL=index.js.map