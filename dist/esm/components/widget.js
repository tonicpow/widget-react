var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTonicPow } from "../context/tonicpow";
import { FetchStatus } from "../types/common";
var Widget = function (_a) {
    var className = _a.className, height = _a.height, widgetId = _a.widgetId, width = _a.width, _b = _a.rotateInterval, rotateInterval = _b === void 0 ? 0 : _b, _c = _a.widgetType, widgetType = _c === void 0 ? "banner" : _c, _d = _a.buttonText, buttonText = _d === void 0 ? "Get Link" : _d, _e = _a.buttonTextAuth, buttonTextAuth = _e === void 0 ? "Log In" : _e, _f = _a.buttonTextDone, buttonTextDone = _f === void 0 ? "Copied" : _f, _g = _a.buttonTextLoading, buttonTextLoading = _g === void 0 ? "Loading" : _g, target = _a.target;
    React.useEffect(function () {
        console.log({ widgetId: widgetId });
    }, [widgetId]);
    if (!target) {
        target = window.location.href;
    }
    var _h = useTonicPow(), tonicPow = _h.tonicPow, widgets = _h.widgets, getWidget = _h.getWidget;
    var _j = useState(width || 0), imgWidth = _j[0], setImgWidth = _j[1];
    var _k = useState(height || 0), imgHeight = _k[0], setImgHeight = _k[1];
    var _l = useState(), wasUnmounted = _l[0], setWasUnmounted = _l[1];
    var _m = useState(FetchStatus.Idle), widgetStatus = _m[0], setWidgetStatus = _m[1];
    var unmounted = useRef(false);
    // use the useEffect cleanup function to know if the component (page) was unmounted
    // so we don't update the state afterwards and thereby introduce a memory leak
    useEffect(function () { return function () {
        unmounted.current = true;
        setWidgetStatus(FetchStatus.Idle);
        setWasUnmounted(true);
    }; }, []);
    var loadedWidget = useMemo(function () {
        return getWidget(widgetId);
    }, [getWidget, widgetId]);
    useEffect(function () {
        var load = function () { return __awaiter(void 0, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("loading");
                        setWidgetStatus(FetchStatus.Loading);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, (tonicPow === null || tonicPow === void 0 ? void 0 : tonicPow.load())];
                    case 2:
                        _a.sent();
                        if (rotateInterval) {
                            setTimeout(function () {
                                setWidgetStatus(FetchStatus.Idle);
                            }, rotateInterval * 1000);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.log("Failed to load widget", e_1);
                        setWidgetStatus(FetchStatus.Error);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        console.log("should we load?", widgetId);
        if (!!widgetId && widgetStatus === FetchStatus.Idle) {
            load();
        }
    }, [
        height,
        rotateInterval,
        tonicPow,
        wasUnmounted,
        widgetId,
        widgetStatus,
        widgets,
        width,
        location,
    ]);
    useEffect(function () {
        if (loadedWidget) {
            var height_1 = loadedWidget.height, width_1 = loadedWidget.width;
            if (widgetType === "banner") {
                setImgHeight(height_1);
                setImgWidth(width_1);
                setWidgetStatus(FetchStatus.Success);
            }
        }
    }, [getWidget, loadedWidget, widgetId, widgetStatus, widgetType, widgets]);
    var renderShareButton = useMemo(function () {
        return (React.createElement("div", { className: "tonicpow-widget h-12 w-full", "data-widget-type": "share-button", "data-button-id": widgetId, "data-environment": "production", "data-width": width, "data-height": height, "data-get-link-text": buttonText, "data-auth-text": buttonTextAuth, "data-done-text": buttonTextDone, "data-error-text": "Error", "data-loading-text": buttonTextLoading, "data-target": target }));
    }, [widgetId, buttonText, buttonTextAuth, buttonTextDone, buttonTextLoading]);
    var renderDisplayWidget = useMemo(function () { return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "flex w-full p-4" }, FetchStatus.Error !== widgetStatus && (React.createElement("div", { className: "transition duration-700 ease-in-out ".concat(widgetStatus === FetchStatus.Idle ||
                widgetStatus === FetchStatus.Loading
                ? "opacity-0"
                : "opacity-100", " tonicpow-widget ").concat(className ? className : ""), "data-widget-id": "".concat(widgetId), style: { width: imgWidth, height: imgHeight } }))))); }, [widgetId, imgWidth, imgHeight, className, widgetStatus]);
    return widgetType === "share" ? renderShareButton : renderDisplayWidget;
};
export default Widget;
//# sourceMappingURL=widget.js.map