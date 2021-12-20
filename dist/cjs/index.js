"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var widget_1 = __importDefault(require("./components/widget"));
var tonicpow_1 = require("./context/tonicpow");
var TonicPowWidget = function (_a) {
    var widgetId = _a.widgetId;
    react_1.default.useEffect(function () {
        console.log("floobygoo", { widgetId: widgetId });
    }, [widgetId]);
    return (react_1.default.createElement(tonicpow_1.TonicPowProvider, null,
        react_1.default.createElement(widget_1.default, { widgetId: widgetId })));
};
exports.default = TonicPowWidget;
//# sourceMappingURL=index.js.map