import React from "react";
import Widget from "./components/Widget";
import { TonicPowProvider } from "./context/tonicpow";

export enum WidgetType {
  Banner = "banner",
  ShareButton = "share",
}

export interface WidgetProps {
  className?: string;
  widgetId: string;
  width?: number;
  height?: number;
  rotateInterval?: number;
  widgetType?: WidgetType;
  buttonText?: string;
  buttonTextAuth?: string;
  buttonTextDone?: string;
  buttonTextLoading?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  target?: string;
}

const TonicPowWidget: React.FC<WidgetProps> = ({
  widgetId,
  rotateInterval,
}) => {
  return (
    <TonicPowProvider>
      <Widget widgetId={widgetId} rotateInterval={rotateInterval} />
    </TonicPowProvider>
  );
};
export default TonicPowWidget;
