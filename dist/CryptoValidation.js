"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoValidation = void 0;
const CoreBuffer_1 = require("./CoreBuffer");
const CryptoError_1 = require("./CryptoError");
const CryptoErrorCode_1 = require("./CryptoErrorCode");
const CryptoStateType_1 = require("./state/CryptoStateType");
class CryptoValidation {
    static checkObject(value, propertyName, throwError = true) {
        let error;
        if (!(typeof value === "object")) {
            let message;
            if (propertyName) {
                message = `Property ${propertyName} must be an object.`;
            }
            else {
                message = "Parameter must be an object.";
            }
            error = new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.WrongObject, message);
        }
        if (error && throwError)
            throw error;
        return error;
    }
    static checkBufferAsStringOrBuffer(buffer, minBytes = 0, maxBytes = Number.MAX_SAFE_INTEGER, propertyName, throwError = true) {
        if (typeof buffer === "string") {
            return this.checkSerializedBuffer(buffer, minBytes, maxBytes, propertyName, throwError);
        }
        return this.checkBuffer(buffer, minBytes, maxBytes, propertyName, throwError);
    }
    static checkBuffer(buffer, minBytes = 0, maxBytes = Number.MAX_SAFE_INTEGER, propertyName, throwError = true) {
        let error;
        if (buffer instanceof CoreBuffer_1.CoreBuffer) {
            if (buffer.buffer.byteLength < minBytes) {
                error = new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.WrongBuffer, `Buffer has a minimum of ${minBytes} bytes.`);
            }
            else if (buffer.buffer.byteLength > maxBytes) {
                error = new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.WrongBuffer, `Buffer has a maximum of ${maxBytes} bytes.`);
            }
        }
        else {
            error = new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.WrongBuffer, "Buffer must be of instance CoreBuffer.");
        }
        if (error && throwError)
            throw error;
        return error;
    }
    static checkSerializedBuffer(serializedBuffer, minBytes = 0, maxBytes = Number.MAX_SAFE_INTEGER, propertyName, throwError = true) {
        let error;
        if (typeof serializedBuffer !== "string") {
            error = new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.WrongSerializedBuffer, `Property ${propertyName} must be a string.`);
        }
        if (!error) {
            const byteLength = Math.floor(3 * (serializedBuffer.length / 4));
            if (byteLength < minBytes) {
                error = new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.WrongSerializedBuffer, `Size of serialized buffer within property ${propertyName} is smaller than the minimum of ${minBytes} bytes.`);
            }
            if (byteLength > maxBytes) {
                error = new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.WrongSerializedBuffer, `Size of serialized buffer within property ${propertyName} is greater than the maximum of ${maxBytes} bytes.`);
            }
        }
        if (error && throwError)
            throw error;
        return error;
    }
    static checkEncryptionAlgorithm(algorithm, throwError = true) {
        let error;
        switch (algorithm) {
            case 3 /* CryptoEncryptionAlgorithm.XCHACHA20_POLY1305 */:
                break;
            default:
                error = new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.EncryptionWrongAlgorithm, "Encryption algorithm is not supported.");
                break;
        }
        if (error && throwError)
            throw error;
        return error;
    }
    static checkHashAlgorithm(algorithm, throwError = true) {
        let error;
        switch (algorithm) {
            case 3 /* CryptoHashAlgorithm.BLAKE2B */:
            case 1 /* CryptoHashAlgorithm.SHA256 */:
            case 2 /* CryptoHashAlgorithm.SHA512 */:
                break;
            default:
                error = new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.WrongHashAlgorithm, "Hash algorithm is not supported.");
                break;
        }
        if (error && throwError)
            throw error;
        return error;
    }
    static checkStateType(type, throwError = true) {
        switch (type) {
            case CryptoStateType_1.CryptoStateType.Receive:
            case CryptoStateType_1.CryptoStateType.Transmit:
                return;
            default:
                const error = new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.StateWrongType, "State type is not supported.");
                if (throwError)
                    throw error;
                else
                    return error;
        }
    }
    static checkId(id, minLength = 0, maxLength = 30, throwError = true) {
        let error;
        if (typeof id === "undefined")
            return;
        if (typeof id !== "string") {
            error = new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.WrongId, "Id must be a string");
        }
        if ((!error && id.length < minLength) || id.length > maxLength) {
            error = new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.WrongId, "Id must be more than 0 and less than 101 characters.");
        }
        if (error && throwError)
            throw error;
        return error;
    }
    static checkSerializedSecretKeyForAlgorithm(key, algorithm, throwError = true) {
        let error;
        if (typeof key !== "string") {
            error = new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.EncryptionWrongSecretKey, "Serialized SecretKey must be of type string.");
        }
        else {
            const byteLength = Math.floor(3 * (key.length / 4));
            let errorLength = 0;
            switch (algorithm) {
                case 1 /* CryptoEncryptionAlgorithm.AES128_GCM */:
                    if (byteLength !== 16) {
                        errorLength = 16;
                    }
                    break;
                case 2 /* CryptoEncryptionAlgorithm.AES256_GCM */:
                case 3 /* CryptoEncryptionAlgorithm.XCHACHA20_POLY1305 */:
                    if (byteLength !== 32) {
                        errorLength = 32;
                    }
                    break;
                default:
                    error = new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.EncryptionWrongAlgorithm, "Encryption algorithm is not supported.");
                    break;
            }
            if (!error && errorLength) {
                error = new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.EncryptionWrongSecretKey, `SecretKey must be ${errorLength} bytes long for encryption algorithm ${algorithm} (is ${byteLength})`);
            }
        }
        if (error && throwError)
            throw error;
        return error;
    }
    static checkSecretKeyForAlgorithm(key, algorithm, throwError = true) {
        if (typeof key === "string")
            key = CoreBuffer_1.CoreBuffer.from(key);
        let error;
        let buffer;
        if (key instanceof CoreBuffer_1.CoreBuffer) {
            buffer = key.buffer;
            let errorLength = 0;
            switch (algorithm) {
                case 1 /* CryptoEncryptionAlgorithm.AES128_GCM */:
                    if (buffer.byteLength !== 16) {
                        errorLength = 16;
                    }
                    break;
                case 2 /* CryptoEncryptionAlgorithm.AES256_GCM */:
                case 3 /* CryptoEncryptionAlgorithm.XCHACHA20_POLY1305 */:
                    if (buffer.byteLength !== 32) {
                        errorLength = 32;
                    }
                    break;
                default:
                    error = new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.EncryptionWrongAlgorithm, "Encryption algorithm is not supported.");
                    break;
            }
            if (!error && errorLength) {
                error = new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.EncryptionWrongSecretKey, `SecretKey must be ${errorLength} bytes long for encryption algorithm ${algorithm}`);
            }
        }
        else {
            error = new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.EncryptionWrongSecretKey, "SecretKey must be of type CoreBuffer.");
        }
        if (error && throwError)
            throw error;
        return error;
    }
    static checkNonceAsString(nonce, algorithm, propertyName = "nonce", throwError = true) {
        return this.checkSerializedBuffer(nonce, 12, 24, propertyName, throwError);
    }
    static checkNonceAsBuffer(nonce, algorithm, propertyName = "nonce", throwError = true) {
        return this.checkBuffer(nonce, 12, 24, propertyName, throwError);
    }
    static checkNonce(nonce, algorithm, propertyName = "nonce", throwError = true) {
        if (typeof nonce === "string")
            return this.checkNonceAsString(nonce, algorithm, propertyName, throwError);
        return this.checkNonceAsBuffer(nonce, algorithm, propertyName, throwError);
    }
    static checkNonceForAlgorithm(nonce, algorithm, throwError = true) {
        let error;
        let buffer;
        if (nonce instanceof CoreBuffer_1.CoreBuffer) {
            buffer = nonce.buffer;
            let errorLength = 0;
            switch (algorithm) {
                case 1 /* CryptoEncryptionAlgorithm.AES128_GCM */:
                case 2 /* CryptoEncryptionAlgorithm.AES256_GCM */:
                    if (buffer.byteLength !== 12) {
                        errorLength = 12;
                    }
                    break;
                case 3 /* CryptoEncryptionAlgorithm.XCHACHA20_POLY1305 */:
                    if (buffer.byteLength !== 24) {
                        errorLength = 24;
                    }
                    break;
                default:
                    error = new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.EncryptionWrongAlgorithm, "Encryption algorithm is not supported.");
                    break;
            }
            if (!error && errorLength) {
                error = new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.EncryptionWrongNonce, `Nonce must be ${errorLength} bytes long for encryption algorithm ${algorithm}`);
            }
        }
        else {
            error = new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.EncryptionWrongNonce, "Nonce must be of type CoreBuffer.");
        }
        if (error && throwError)
            throw error;
        return error;
    }
    static checkCounter(counter, throwError = true) {
        let error;
        if (typeof counter !== "number" || counter < 0 || counter > 4294967295) {
            error = new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.EncryptionWrongCounter, `Counter must be a positive integer within 0 and ${Number.MAX_SAFE_INTEGER}.`);
        }
        if (error && throwError)
            throw error;
        return error;
    }
}
exports.CryptoValidation = CryptoValidation;
//# sourceMappingURL=CryptoValidation.js.map