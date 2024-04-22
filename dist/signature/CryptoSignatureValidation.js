"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoSignatureValidation = void 0;
const CryptoError_1 = require("../CryptoError");
const CryptoErrorCode_1 = require("../CryptoErrorCode");
const CryptoValidation_1 = require("../CryptoValidation");
class CryptoSignatureValidation extends CryptoValidation_1.CryptoValidation {
    static checkSignatureAlgorithm(algorithm, throwError = true) {
        let error;
        switch (algorithm) {
            case 3 /* CryptoSignatureAlgorithm.ECDSA_ED25519 */:
            case 1 /* CryptoSignatureAlgorithm.ECDSA_P256 */:
            case 2 /* CryptoSignatureAlgorithm.ECDSA_P521 */:
                break;
            default:
                error = new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.SignatureWrongAlgorithm, "Signature algorithm is not set or supported.");
                break;
        }
        if (throwError && error)
            throw error;
        return error;
    }
    static checkSignaturePrivateKeyAsString(key, propertyName = "privateKey", throwError = true) {
        return super.checkSerializedBuffer(key, this.PRIVATE_KEY_MIN_BYTES, this.PRIVATE_KEY_MAX_BYTES, propertyName, throwError);
    }
    static checkSignaturePrivateKeyAsBuffer(buffer, propertyName = "privateKey", throwError = true) {
        return super.checkBuffer(buffer, this.PRIVATE_KEY_MIN_BYTES, this.PRIVATE_KEY_MAX_BYTES, propertyName, throwError);
    }
    static checkSignaturePrivateKey(privateKey, propertyName = "privateKey", throwError = true) {
        if (typeof privateKey === "string") {
            return this.checkSignaturePrivateKeyAsString(privateKey, propertyName, throwError);
        }
        return this.checkSignaturePrivateKeyAsBuffer(privateKey, propertyName, throwError);
    }
    static checkSignaturePublicKeyAsString(key, algorithm, propertyName = "publicKey", throwError = true) {
        return super.checkSerializedBuffer(key, this.PUBLIC_KEY_MIN_BYTES, this.PUBLIC_KEY_MAX_BYTES, propertyName, throwError);
    }
    static checkSignaturePublicKeyAsBuffer(buffer, algorithm, propertyName = "publicKey", throwError = true) {
        return super.checkBuffer(buffer, this.PUBLIC_KEY_MIN_BYTES, this.PUBLIC_KEY_MAX_BYTES, propertyName, throwError);
    }
    static checkSignaturePublicKey(publicKey, algorithm, propertyName = "publicKey", throwError = true) {
        if (typeof publicKey === "string") {
            return this.checkSignaturePublicKeyAsString(publicKey, algorithm, propertyName, throwError);
        }
        return this.checkSignaturePublicKeyAsBuffer(publicKey, algorithm, propertyName, throwError);
    }
    static checkSignatureAsString(signature, throwError = true) {
        return this.checkSerializedBuffer(signature, this.SIGNATURE_MIN_BYTES, this.SIGNATURE_MAX_BYTES, "signature", throwError);
    }
    static checkSignatureAsBuffer(signature, throwError = true) {
        return this.checkBuffer(signature, this.SIGNATURE_MIN_BYTES, this.SIGNATURE_MAX_BYTES, "signature", throwError);
    }
    static checkSignature(signature, throwError = true) {
        if (typeof signature === "string")
            return this.checkSignatureAsString(signature, throwError);
        return this.checkSignatureAsBuffer(signature, throwError);
    }
    static checkSignaturePublicKeyId(keyId, throwError = true) {
        return this.checkId(keyId, 0, 30, throwError);
    }
    static checkSignatureKeyId(keyId, throwError = true) {
        let error;
        if (typeof keyId === "undefined") {
            return;
        }
        if (typeof keyId !== "string") {
            error = new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.WrongId, "KeyId must be of type string!");
        }
        if (!error && keyId.length > 50) {
            error = new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.WrongId, "KeyId must be less than 50 characters.");
        }
        if (error && throwError)
            throw error;
        return error;
    }
    static checkSignatureId(id, throwError = true) {
        let error;
        if (typeof id === "undefined") {
            return;
        }
        if (typeof id !== "string") {
            error = new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.WrongId, "Signature id must be of type string!");
        }
        if (!error && id.length > 50) {
            error = new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.WrongId, "Signature id must be less than 50 characters.");
        }
        if (error && throwError)
            throw error;
        return error;
    }
}
exports.CryptoSignatureValidation = CryptoSignatureValidation;
CryptoSignatureValidation.PRIVATE_KEY_MIN_BYTES = 20;
CryptoSignatureValidation.PRIVATE_KEY_MAX_BYTES = 80;
CryptoSignatureValidation.PUBLIC_KEY_MIN_BYTES = 20;
CryptoSignatureValidation.PUBLIC_KEY_MAX_BYTES = 80;
CryptoSignatureValidation.SIGNATURE_MIN_BYTES = 20;
CryptoSignatureValidation.SIGNATURE_MAX_BYTES = 100;
//# sourceMappingURL=CryptoSignatureValidation.js.map