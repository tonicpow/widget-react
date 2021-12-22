import React from "react";
import Widget from "./components/Widget";
import { TonicPowProvider } from "./context/tonicpow";
export var WidgetType;
(function (WidgetType) {
    WidgetType["Banner"] = "banner";
    WidgetType["ShareButton"] = "share";
})(WidgetType || (WidgetType = {}));
var TonicPowWidget = function (_a) {
    var widgetId = _a.widgetId;
    return (React.createElement(TonicPowProvider, null,
        React.createElement(Widget, { widgetId: widgetId })));
};
export default TonicPowWidget;
//# sourceMappingURL=index.js.map