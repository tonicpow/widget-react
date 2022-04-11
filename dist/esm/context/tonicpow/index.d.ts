import React from "react";
import TonicPow from "../../types/tonicpow-js";
declare type ContextValue = {
    sessionId: string | undefined;
    tonicPow: typeof TonicPow | undefined;
    ready: boolean;
    widgets: TonicPow.Widget[];
    getWidget: (widgetId: string) => TonicPow.Widget;
};
export declare const TonicPowProvider: React.FC<React.PropsWithChildren<{}>>;
export declare const useTonicPow: () => ContextValue;
export {};
