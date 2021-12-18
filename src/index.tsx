import React from "react";
import Widget from "./components/widget";
import { TonicPowProvider } from "./context/tonicpow";

interface TonicPowWidgetProps {
  widgetId: string;
}

const TonicPowWidget: React.FC<TonicPowWidgetProps> = (props) => {
  return (
    <TonicPowProvider>
      <Widget {...props} />
    </TonicPowProvider>
  );
};
export default TonicPowWidget;
