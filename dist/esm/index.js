import React from "react";
import Widget from "./components/widget";
import { TonicPowProvider } from "./context/tonicpow";
var TonicPowWidget = function (_a) {
    var widgetId = _a.widgetId;
    React.useEffect(function () {
        console.log("floobygoo", { widgetId: widgetId });
    }, [widgetId]);
    return (React.createElement(TonicPowProvider, null,
        React.createElement(Widget, { widgetId: widgetId })));
};
export default TonicPowWidget;
//# sourceMappingURL=index.js.map