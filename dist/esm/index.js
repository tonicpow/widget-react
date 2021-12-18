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
import React from "react";
import Widget from "./components/widget";
import { TonicPowProvider } from "./context/tonicpow";
var TonicPowWidget = function (props) {
    return (React.createElement(TonicPowProvider, null,
        React.createElement(Widget, __assign({}, props))));
};
export default TonicPowWidget;
//# sourceMappingURL=index.js.map