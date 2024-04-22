"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoError = void 0;
const CryptoErrorCode_1 = require("./CryptoErrorCode");
class CryptoError extends Error {
    constructor(code = CryptoErrorCode_1.CryptoErrorCode.Unknown, reason = "Crypto operation failed unexpectedly.", time = new Date().toISOString(), rootError, context) {
        const message = [];
        message.push(code);
        if (reason) {
            message.push(": '", reason, "'");
        }
        if (time) {
            message.push(" at ", time);
        }
        super(message.join(""));
        this.code = code;
        this.reason = reason;
        this.time = time;
        this.name = "CryptoError";
        this.rootError = rootError;
        this.context = context;
        Error.captureStackTrace(this, context !== null && context !== void 0 ? context : CryptoError);
    }
    setRootError(error) {
        this.rootError = error;
        return this;
    }
    setContext(context) {
        this.context = context;
        Error.captureStackTrace(this, context);
        return this;
    }
}
exports.CryptoError = CryptoError;
//# sourceMappingURL=CryptoError.js.map