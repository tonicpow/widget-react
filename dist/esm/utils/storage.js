import { useCallback, useEffect, useMemo, useState } from "react";
export var lsTest = function () {
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
export var saveInLocalStorage = function (storageKey, data) { return saveInStorage("localStorage", storageKey, data); };
export var loadFromLocalStorage = function (storageKey) {
    return loadFromStorage("localStorage", storageKey) || undefined;
};
export var saveInSessionStorage = function (storageKey, data) { return saveInStorage("sessionStorage", storageKey, data); };
export var loadFromSessionStorage = function (storageKey) {
    return loadFromStorage("sessionStorage", storageKey) || undefined;
};
// Hooks
var useStorage = function (storageType, storageKey, initialValue) {
    var _a = useState(function () {
        try {
            return loadFromStorage(storageType, storageKey) || initialValue;
        }
        catch (e) {
            console.error(e);
            return initialValue;
        }
    }), storedValue = _a[0], setStoredValue = _a[1];
    var setValue = useCallback(function (value) {
        try {
            setStoredValue(value);
            saveInStorage(storageType, storageKey, value);
        }
        catch (e) {
            console.error(e);
        }
    }, [storageKey, storageType]);
    // Listen to changes in local storage in order to adapt to actions from other browser tabs
    useEffect(function () {
        var handleChange = function () {
            setStoredValue(loadFromStorage(storageType, storageKey) || initialValue);
        };
        window.addEventListener("storage", handleChange, false);
        return function () {
            window.removeEventListener("storage", handleChange);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValue, storageKey, storageType]);
    var value = useMemo(function () { return [storedValue, setValue]; }, [storedValue, setValue]);
    return value;
};
export var useLocalStorage = function (storageKey, initialValue) {
    return useStorage("localStorage", storageKey, initialValue);
};
export var useSessionStorage = function (storageKey, initialValue) {
    return useStorage("sessionStorage", storageKey, initialValue);
};
//# sourceMappingURL=storage.js.map