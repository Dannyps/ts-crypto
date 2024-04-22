"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoDerivation = void 0;
const CryptoError_1 = require("./CryptoError");
const CryptoErrorCode_1 = require("./CryptoErrorCode");
class CryptoDerivation {
    static async deriveKeyFromMaster(masterKey, iterations, keyAlgorithm, salt) {
        switch (keyAlgorithm) {
            case 1 /* CryptoEncryptionAlgorithm.AES128_GCM */:
            case 2 /* CryptoEncryptionAlgorithm.AES256_GCM */:
            case 3 /* CryptoEncryptionAlgorithm.XCHACHA20_POLY1305 */:
                break;
            default:
                throw new Error("KeyAlgorithm not supported.");
        }
        const saltedMaster = masterKey;
        if (typeof salt !== "undefined") {
            saltedMaster.append(salt);
        }
        throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.NotYetImplemented);
    }
    static async deriveKeyFromBase(baseKey, keyId, context, keyAlgorithm = 3 /* CryptoEncryptionAlgorithm.XCHACHA20_POLY1305 */) {
        if (context.length !== 8) {
            throw new Error("The context should be exactly 8 characters long!");
        }
        let keyLength;
        switch (keyAlgorithm) {
            case 1 /* CryptoEncryptionAlgorithm.AES128_GCM */:
                keyLength = 16;
                break;
            case 2 /* CryptoEncryptionAlgorithm.AES256_GCM */:
                keyLength = 32;
                break;
            case 3 /* CryptoEncryptionAlgorithm.XCHACHA20_POLY1305 */:
                keyLength = 32;
                break;
            default:
                throw new Error("KeyAlgorithm not supported.");
        }
        throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.NotYetImplemented);
    }
}
exports.CryptoDerivation = CryptoDerivation;
//# sourceMappingURL=CryptoDerivation.js.map