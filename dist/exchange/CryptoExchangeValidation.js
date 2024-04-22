"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoExchangeValidation = void 0;
const CryptoError_1 = require("../CryptoError");
const CryptoErrorCode_1 = require("../CryptoErrorCode");
const CryptoValidation_1 = require("../CryptoValidation");
class CryptoExchangeValidation extends CryptoValidation_1.CryptoValidation {
    static checkExchangeAlgorithm(algorithm, throwError = true) {
        let error;
        switch (algorithm) {
            case 1 /* CryptoExchangeAlgorithm.ECDH_P256 */:
            case 2 /* CryptoExchangeAlgorithm.ECDH_P521 */:
            case 3 /* CryptoExchangeAlgorithm.ECDH_X25519 */:
                break;
            default:
                error = new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.ExchangeWrongAlgorithm, "Exchange algorithm is not set or supported.");
                break;
        }
        if (error && throwError)
            throw error;
        return error;
    }
    static checkExchangePrivateKeyAsString(privateKey, algorithm, propertyName = "privateKey", throwError = true) {
        return super.checkSerializedBuffer(privateKey, this.PRIVATE_KEY_MIN_BYTES, this.PRIVATE_KEY_MAX_BYTES, propertyName, throwError);
    }
    static checkExchangePrivateKeyAsBuffer(privateKey, algorithm, propertyName = "privateKey", throwError = true) {
        return super.checkBuffer(privateKey, this.PRIVATE_KEY_MIN_BYTES, this.PRIVATE_KEY_MAX_BYTES, propertyName, throwError);
    }
    static checkExchangePrivateKey(privateKey, algorithm, propertyName = "privateKey", throwError = true) {
        if (typeof privateKey === "string") {
            return this.checkExchangePrivateKeyAsString(privateKey, algorithm, propertyName, throwError);
        }
        return this.checkExchangePrivateKeyAsBuffer(privateKey, algorithm, propertyName, throwError);
    }
    static checkExchangePublicKeyAsString(publicKey, algorithm, propertyName = "publicKey", throwError = true) {
        return super.checkSerializedBuffer(publicKey, this.PRIVATE_KEY_MIN_BYTES, this.PRIVATE_KEY_MAX_BYTES, propertyName, throwError);
    }
    static checkExchangePublicKeyAsBuffer(publicKey, algorithm, propertyName = "publicKey", throwError = true) {
        return super.checkBuffer(publicKey, this.PRIVATE_KEY_MIN_BYTES, this.PRIVATE_KEY_MAX_BYTES, propertyName, throwError);
    }
    static checkExchangePublicKey(publicKey, algorithm, propertyName = "publicKey", throwError = true) {
        if (typeof publicKey === "string") {
            return this.checkExchangePublicKeyAsString(publicKey, algorithm, propertyName, throwError);
        }
        return this.checkExchangePublicKeyAsBuffer(publicKey, algorithm, propertyName, throwError);
    }
}
exports.CryptoExchangeValidation = CryptoExchangeValidation;
CryptoExchangeValidation.PRIVATE_KEY_MIN_BYTES = 20;
CryptoExchangeValidation.PRIVATE_KEY_MAX_BYTES = 40;
CryptoExchangeValidation.PUBLIC_KEY_MIN_BYTES = 20;
CryptoExchangeValidation.PUBLIC_KEY_MAX_BYTES = 40;
//# sourceMappingURL=CryptoExchangeValidation.js.map