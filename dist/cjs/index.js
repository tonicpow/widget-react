"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var widget_1 = __importDefault(require("./components/widget"));
var tonicpow_1 = require("./context/tonicpow");
var TonicPowWidget = function (props) {
    return (react_1.default.createElement(tonicpow_1.TonicPowProvider, null,
        react_1.default.createElement(widget_1.default, __assign({}, props))));
};
exports.default = TonicPowWidget;
//# sourceMappingURL=index.js.map