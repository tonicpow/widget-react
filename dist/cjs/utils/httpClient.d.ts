export declare type ResponseInterceptor = (res: Response, options: RequestInit) => Response | Promise<Response>;
export declare type FetchResponse<T> = {
    promise: Promise<T>;
    abort: () => void;
};
export declare enum HttpErrors {
    EmptyResponseError = "EmptyResponseError",
    ExpectationFailed = "ExpectationFailedError",
    ForbiddenRequestError = "ForbiddenRequestError",
    NotFoundRequestError = "NotFoundRequestError",
    UnknownRequestError = "UnknownRequestError",
    UnauthenticatedRequestError = "UnauthenticatedRequestError",
    InvalidRequestError = "InvalidRequestError",
    UnprocessableRequestError = "UnprocessableRequestError"
}
export declare const defaultContentType = "application/json; charset=utf-8";
export declare const setDefaultHeader: (header: string, value: string) => void;
export declare const clearDefaultHeader: (header: string) => void;
export declare const registerResponseInterceptor: (interceptor: ResponseInterceptor) => void;
export declare const unregisterResponseInterceptor: (interceptor: ResponseInterceptor) => void;
export declare const json: (body: Object) => Blob;
export declare const customFetch: <T>(url: string, options?: RequestInit) => FetchResponse<T>;
export declare const runIfNotAborted: (e: Error, callback: () => void) => void;
