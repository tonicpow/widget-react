export declare const lsTest: () => boolean;
export declare const saveInLocalStorage: (storageKey: string, data: unknown | undefined) => void;
export declare const loadFromLocalStorage: <T>(storageKey: string) => T | undefined;
export declare const saveInSessionStorage: (storageKey: string, data: unknown | undefined) => void;
export declare const loadFromSessionStorage: <T>(storageKey: string) => T | undefined;
export declare const useLocalStorage: <T>(storageKey: string, initialValue?: T | undefined) => [T | undefined, (value: T | undefined) => void];
export declare const useSessionStorage: <T>(storageKey: string, initialValue?: T | undefined) => [T | undefined, (value: T | undefined) => void];
