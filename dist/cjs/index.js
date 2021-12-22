"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetType = void 0;
var react_1 = __importDefault(require("react"));
var Widget_1 = __importDefault(require("./components/Widget"));
var tonicpow_1 = require("./context/tonicpow");
var WidgetType;
(function (WidgetType) {
    WidgetType["Banner"] = "banner";
    WidgetType["ShareButton"] = "share";
})(WidgetType = exports.WidgetType || (exports.WidgetType = {}));
var TonicPowWidget = function (_a) {
    var widgetId = _a.widgetId;
    return (react_1.default.createElement(tonicpow_1.TonicPowProvider, null,
        react_1.default.createElement(Widget_1.default, { widgetId: widgetId })));
};
exports.default = TonicPowWidget;
//# sourceMappingURL=index.js.map