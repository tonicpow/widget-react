"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTonicPow = exports.TonicPowProvider = void 0;
var tPow = __importStar(require("@tonicpow/widget"));
var querystring_1 = require("querystring");
var react_1 = __importStar(require("react"));
var storage_1 = require("../../utils/storage");
var TonicPowContext = react_1.default.createContext(undefined);
var TonicPowProvider = function (props) {
    var _a;
    var _b = (0, react_1.useState)(), tonicPow = _b[0], setTonicPow = _b[1];
    var _c = (0, react_1.useState)(false), ready = _c[0], setReady = _c[1];
    var _d = (0, react_1.useState)([]), widgets = _d[0], setWidgets = _d[1];
    var _e = (0, storage_1.useLocalStorage)(sessionStorageKey, undefined), sessionId = _e[0], setSessionId = _e[1];
    var onWidgetLoaded = (0, react_1.useCallback)(function (widget) {
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
    var tncpwSessionQueryParam = (0, react_1.useRef)((0, querystring_1.parse)((_a = window.location.search) === null || _a === void 0 ? void 0 : _a.slice(1)).tncpw_session);
    var getWidget = (0, react_1.useCallback)(function (widgetId) {
        console.log("getting widget", widgetId);
        return widgets.filter(function (w) { return w.id === widgetId; })[0] || null;
    }, [widgets]);
    (0, react_1.useEffect)(function () {
        tPow.options = { onWidgetLoaded: onWidgetLoaded };
        setTonicPow(tPow);
        setReady(true);
    }, []);
    (0, react_1.useEffect)(function () {
        if ((tncpwSessionQueryParam === null || tncpwSessionQueryParam === void 0 ? void 0 : tncpwSessionQueryParam.current) != null) {
            // TODO: Validate
            setSessionId(tncpwSessionQueryParam.current);
        }
    }, [location, sessionId, setSessionId, widgets]);
    var value = (0, react_1.useMemo)(function () { return ({
        sessionId: sessionId,
        ready: ready,
        tonicPow: tonicPow,
        widgets: widgets,
        getWidget: getWidget,
    }); }, [sessionId, ready, tonicPow, widgets, getWidget]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(TonicPowContext.Provider, __assign({ value: value }, props))));
};
exports.TonicPowProvider = TonicPowProvider;
var useTonicPow = function () {
    var context = (0, react_1.useContext)(TonicPowContext);
    if (context === undefined) {
        throw new Error("useTonicPow must be used within an TonicPowProvider");
    }
    return context;
};
exports.useTonicPow = useTonicPow;
//
// Utils
//
var sessionStorageKey = "tp__TonicPowProvider_session";
//# sourceMappingURL=index.js.map