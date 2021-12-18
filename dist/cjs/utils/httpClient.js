"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.runIfNotAborted = exports.customFetch = exports.json = exports.unregisterResponseInterceptor = exports.registerResponseInterceptor = exports.clearDefaultHeader = exports.setDefaultHeader = exports.defaultContentType = exports.HttpErrors = void 0;
var HttpErrors;
(function (HttpErrors) {
    HttpErrors["EmptyResponseError"] = "EmptyResponseError";
    HttpErrors["ExpectationFailed"] = "ExpectationFailedError";
    HttpErrors["ForbiddenRequestError"] = "ForbiddenRequestError";
    HttpErrors["NotFoundRequestError"] = "NotFoundRequestError";
    HttpErrors["UnknownRequestError"] = "UnknownRequestError";
    HttpErrors["UnauthenticatedRequestError"] = "UnauthenticatedRequestError";
    HttpErrors["InvalidRequestError"] = "InvalidRequestError";
    HttpErrors["UnprocessableRequestError"] = "UnprocessableRequestError";
})(HttpErrors = exports.HttpErrors || (exports.HttpErrors = {}));
var InvalidRequestError = /** @class */ (function (_super) {
    __extends(InvalidRequestError, _super);
    function InvalidRequestError(errorData) {
        var _this = _super.call(this, "InvalidRequestError") || this;
        _this.name = "InvalidRequestError";
        _this.errorData = errorData;
        return _this;
    }
    return InvalidRequestError;
}(Error));
var GenericRequestError = /** @class */ (function (_super) {
    __extends(GenericRequestError, _super);
    function GenericRequestError(type, json) {
        var _this = _super.call(this, type) || this;
        _this.name = type;
        _this.json = json;
        return _this;
    }
    return GenericRequestError;
}(Error));
//
// Globals
//
exports.defaultContentType = "application/json; charset=utf-8";
var defaultHeaders = {
    "Content-Type": exports.defaultContentType,
};
var setDefaultHeader = function (header, value) {
    defaultHeaders[header] = value;
};
exports.setDefaultHeader = setDefaultHeader;
var clearDefaultHeader = function (header) {
    delete defaultHeaders[header];
};
exports.clearDefaultHeader = clearDefaultHeader;
var responseInterceptors = [];
var registerResponseInterceptor = function (interceptor) {
    responseInterceptors.push(interceptor);
};
exports.registerResponseInterceptor = registerResponseInterceptor;
var unregisterResponseInterceptor = function (interceptor) {
    var index = responseInterceptors.indexOf(interceptor);
    if (index >= 0) {
        responseInterceptors.splice(index, 1);
    }
};
exports.unregisterResponseInterceptor = unregisterResponseInterceptor;
var json = function (body) {
    return new Blob([JSON.stringify(body)], { type: "application/json" });
};
exports.json = json;
var customFetch = function (url, options) {
    if (options === void 0) { options = {}; }
    // Cancel logic
    var controller = new AbortController();
    // Inject default headers
    var headers = (options === null || options === void 0 ? void 0 : options.headers) || defaultHeaders;
    // do fetch
    var responsePromise = fetch(url, __assign(__assign({}, options), { headers: headers, signal: controller.signal }));
    // Register response interceptors
    responseInterceptors.forEach(function (interceptor) {
        responsePromise = responsePromise.then(function (res) {
            return interceptor(res, options);
        });
    });
    // handle result
    var returnPromise = responsePromise.then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        return __generator(this, function (_m) {
            switch (_m.label) {
                case 0:
                    if (!(response.status < 300)) return [3 /*break*/, 4];
                    if (!(response.status !== 204)) return [3 /*break*/, 2];
                    return [4 /*yield*/, response.json()];
                case 1:
                    _a = (_m.sent());
                    return [3 /*break*/, 3];
                case 2:
                    // this makes working with apis that don't use 204 (most of the time) a lot easier
                    _a = undefined;
                    _m.label = 3;
                case 3: return [2 /*return*/, _a];
                case 4:
                    _b = response.status;
                    switch (_b) {
                        case 400: return [3 /*break*/, 5];
                        case 401: return [3 /*break*/, 7];
                        case 403: return [3 /*break*/, 8];
                        case 404: return [3 /*break*/, 10];
                        case 417: return [3 /*break*/, 11];
                        case 422: return [3 /*break*/, 13];
                    }
                    return [3 /*break*/, 15];
                case 5:
                    _c = InvalidRequestError.bind;
                    return [4 /*yield*/, response.json()];
                case 6: throw new (_c.apply(InvalidRequestError, [void 0, _m.sent()]))();
                case 7: throw new GenericRequestError(HttpErrors.UnauthenticatedRequestError);
                case 8:
                    _d = GenericRequestError.bind;
                    _e = [void 0, HttpErrors.ForbiddenRequestError];
                    return [4 /*yield*/, response.json()];
                case 9: throw new (_d.apply(GenericRequestError, _e.concat([_m.sent()])))();
                case 10: throw new GenericRequestError(HttpErrors.NotFoundRequestError);
                case 11:
                    _f = GenericRequestError.bind;
                    _g = [void 0, HttpErrors.ExpectationFailed];
                    return [4 /*yield*/, response.json()];
                case 12: throw new (_f.apply(GenericRequestError, _g.concat([_m.sent()])))();
                case 13:
                    _h = GenericRequestError.bind;
                    _j = [void 0, HttpErrors.UnprocessableRequestError];
                    return [4 /*yield*/, response.json()];
                case 14: throw new (_h.apply(GenericRequestError, _j.concat([_m.sent()])))();
                case 15:
                    _k = GenericRequestError.bind;
                    _l = [void 0, HttpErrors.UnknownRequestError];
                    return [4 /*yield*/, response.json()];
                case 16: throw new (_k.apply(GenericRequestError, _l.concat([_m.sent()])))();
            }
        });
    }); });
    return {
        promise: returnPromise,
        abort: function () {
            controller.abort();
        },
    };
};
exports.customFetch = customFetch;
var runIfNotAborted = function (e, callback) {
    if (e.name !== "AbortError") {
        callback();
    }
};
exports.runIfNotAborted = runIfNotAborted;
//# sourceMappingURL=httpClient.js.map