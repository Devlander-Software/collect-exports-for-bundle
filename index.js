"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

var _dist_1 = __importDefault(require("./dist"));

var moduleToExport = {};

if (_dist_1["default"] && _dist_1["default"].default) {
    console.log(_dist_1["default"].default);
    moduleToExport = _dist_1["default"].default;
}

module.exports = moduleToExport;