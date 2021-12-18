"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSessionStorage = exports.useLocalStorage = exports.loadFromSessionStorage = exports.saveInSessionStorage = exports.loadFromLocalStorage = exports.saveInLocalStorage = exports.lsTest = void 0;
var react_1 = require("react");
var lsTest = function () {
    var test = "test";
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    }
    catch (e) {
        return false;
    }
};
exports.lsTest = lsTest;
var replacer = function (_key, value) {
    if (value instanceof Map) {
        return {
            dataType: "Map",
            value: Array.from(value.entries()), // or with spread: value: [...originalObject]
        };
    }
    else {
        return value;
    }
};
var reviver = function (_key, value) {
    if (typeof value === "object" && value !== null) {
        if (value.dataType === "Map") {
            return new Map(value.value);
        }
    }
    return value;
};
var getStorage = function (storageType) {
    var storage;
    if (typeof window !== "undefined") {
        switch (storageType) {
            case "localStorage":
                return window.localStorage;
            case "sessionStorage":
                return window.sessionStorage;
        }
    }
    return storage;
};
var saveInStorage = function (storageType, storageKey, data) {
    var storage = getStorage(storageType);
    try {
        if (storage) {
            if (data != null && data !== undefined) {
                storage.setItem(storageKey, JSON.stringify(data, replacer));
            }
            else {
                storage.removeItem(storageKey);
            }
        }
    }
    catch (e) {
        // TODO: showError toast
        console.log("ERROR", "Could not access browser local/session storage");
    }
};
var loadFromStorage = function (storageType, localStorageKey) {
    var storage = getStorage(storageType);
    try {
        if (storage) {
            var dataStr = storage.getItem(localStorageKey);
            return dataStr ? JSON.parse(dataStr, reviver) : undefined;
        }
    }
    catch (e) {
        // TODO: showError toast
        console.log("ERROR", "Could not access browser local/session storage");
    }
    return undefined;
};
var saveInLocalStorage = function (storageKey, data) { return saveInStorage("localStorage", storageKey, data); };
exports.saveInLocalStorage = saveInLocalStorage;
var loadFromLocalStorage = function (storageKey) {
    return loadFromStorage("localStorage", storageKey) || undefined;
};
exports.loadFromLocalStorage = loadFromLocalStorage;
var saveInSessionStorage = function (storageKey, data) { return saveInStorage("sessionStorage", storageKey, data); };
exports.saveInSessionStorage = saveInSessionStorage;
var loadFromSessionStorage = function (storageKey) {
    return loadFromStorage("sessionStorage", storageKey) || undefined;
};
exports.loadFromSessionStorage = loadFromSessionStorage;
// Hooks
var useStorage = function (storageType, storageKey, initialValue) {
    var _a = (0, react_1.useState)(function () {
        try {
            return loadFromStorage(storageType, storageKey) || initialValue;
        }
        catch (e) {
            console.error(e);
            return initialValue;
        }
    }), storedValue = _a[0], setStoredValue = _a[1];
    var setValue = (0, react_1.useCallback)(function (value) {
        try {
            setStoredValue(value);
            saveInStorage(storageType, storageKey, value);
        }
        catch (e) {
            console.error(e);
        }
    }, [storageKey, storageType]);
    // Listen to changes in local storage in order to adapt to actions from other browser tabs
    (0, react_1.useEffect)(function () {
        var handleChange = function () {
            setStoredValue(loadFromStorage(storageType, storageKey) || initialValue);
        };
        window.addEventListener("storage", handleChange, false);
        return function () {
            window.removeEventListener("storage", handleChange);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValue, storageKey, storageType]);
    var value = (0, react_1.useMemo)(function () { return [storedValue, setValue]; }, [storedValue, setValue]);
    return value;
};
var useLocalStorage = function (storageKey, initialValue) {
    return useStorage("localStorage", storageKey, initialValue);
};
exports.useLocalStorage = useLocalStorage;
var useSessionStorage = function (storageKey, initialValue) {
    return useStorage("sessionStorage", storageKey, initialValue);
};
exports.useSessionStorage = useSessionStorage;
//# sourceMappingURL=storage.js.map