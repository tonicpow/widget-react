import React from "react";
export interface WidgetProps {
    className?: string;
    widgetId: string;
    width?: number;
    height?: number;
    rotateInterval?: number;
    widgetType?: "banner" | "share";
    buttonText?: string;
    buttonTextAuth?: string;
    buttonTextDone?: string;
    buttonTextLoading?: string;
    onSuccess?: (data: any) => void;
    onError?: (error: Error) => void;
    target?: string;
}
declare const TonicPowWidget: React.FC<WidgetProps>;
export default TonicPowWidget;
