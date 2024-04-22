export declare class CryptoError extends Error {
    code: string;
    reason: string;
    time: string;
    rootError?: Error;
    context?: Function;
    constructor(code?: string, reason?: string, time?: string, rootError?: Error, context?: Function);
    setRootError(error: Error): this;
    setContext(context: Function): this;
}
