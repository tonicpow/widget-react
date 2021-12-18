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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { parse } from "querystring";
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState, } from "react";
import Script from "react-load-script";
import { useLocalStorage } from "../../utils/storage";
var TonicPowContext = React.createContext(undefined);
export var TonicPowProvider = function (props) {
    var _a;
    var _b = useState(), tonicPow = _b[0], setTonicPow = _b[1];
    var _c = useState(false), ready = _c[0], setReady = _c[1];
    var _d = useState([]), widgets = _d[0], setWidgets = _d[1];
    var _e = useLocalStorage(sessionStorageKey, undefined), sessionId = _e[0], setSessionId = _e[1];
    var onWidgetLoaded = useCallback(function (widget) {
        var newWidgets = __spreadArray([], widgets, true);
        if (widget) {
            if (!widgets.some(function (w) {
                return w.id === widget.id;
            })) {
                newWidgets.push(widget);
                setWidgets(newWidgets);
            }
        }
    }, [widgets]);
    var tncpwSessionQueryParam = useRef(parse((_a = window.location.search) === null || _a === void 0 ? void 0 : _a.slice(1)).tncpw_session);
    var getWidget = useCallback(function (widgetId) {
        return widgets.filter(function (w) { return w.id === widgetId; })[0] || null;
    }, [widgets]);
    var handleScriptLoad = useCallback(function () {
        var tPow = window.TonicPow;
        tPow.options = { onWidgetLoaded: onWidgetLoaded };
        setTonicPow(tPow);
        setReady(true);
    }, [onWidgetLoaded]);
    useEffect(function () {
        if ((tncpwSessionQueryParam === null || tncpwSessionQueryParam === void 0 ? void 0 : tncpwSessionQueryParam.current) != null) {
            // TODO: Validate
            setSessionId(tncpwSessionQueryParam.current);
        }
    }, [location, sessionId, setSessionId, widgets]);
    var value = useMemo(function () { return ({
        sessionId: sessionId,
        ready: ready,
        tonicPow: tonicPow,
        widgets: widgets,
        getWidget: getWidget,
    }); }, [sessionId, ready, tonicPow, widgets, getWidget]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Script, { async: true, defer: true, url: "../../../node_modules/@tonicpow/widget/dist/tonicpow.js", onLoad: handleScriptLoad }),
        React.createElement(TonicPowContext.Provider, __assign({ value: value }, props))));
};
export var useTonicPow = function () {
    var context = useContext(TonicPowContext);
    if (context === undefined) {
        throw new Error("useTonicPow must be used within an TonicPowProvider");
    }
    return context;
};
//
// Utils
//
var sessionStorageKey = "tp__TonicPowProvider_session";
//# sourceMappingURL=index.js.map