"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoEncryption = void 0;
const CoreBuffer_1 = require("../CoreBuffer");
const CryptoError_1 = require("../CryptoError");
const CryptoErrorCode_1 = require("../CryptoErrorCode");
const CryptoValidation_1 = require("../CryptoValidation");
const CryptoSecretKey_1 = require("./CryptoSecretKey");
class CryptoEncryption {
    static async generateKey(algorithm = 3 /* CryptoEncryptionAlgorithm.XCHACHA20_POLY1305 */) {
        throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.NotYetImplemented);
    }
    /**
     * Encrypts a given plaintext [[CoreBuffer]] object with the given secretKey. If a nonce is set,
     * please be advised that this nonce MUST be uniquely used for this secretKey. The nonce MUST be
     * a high entropy (best random) [[CoreBuffer]] object.
     *
     * @param plaintext
     * @param secretKey
     * @param nonce
     * @param algorithm
     */
    static async encrypt(plaintext, secretKey, nonce, algorithm = 3 /* CryptoEncryptionAlgorithm.XCHACHA20_POLY1305 */) {
        throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.NotYetImplemented);
    }
    static async encryptWithCounter(plaintext, secretKey, nonce, counter, algorithm = 3 /* CryptoEncryptionAlgorithm.XCHACHA20_POLY1305 */) {
        throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.NotYetImplemented);
    }
    static async decrypt(cipher, secretKey, nonce, algorithm = 3 /* CryptoEncryptionAlgorithm.XCHACHA20_POLY1305 */) {
        throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.NotYetImplemented);
    }
    static async decryptWithCounter(cipher, secretKey, nonce, counter, algorithm = 3 /* CryptoEncryptionAlgorithm.XCHACHA20_POLY1305 */) {
        if (secretKey instanceof CryptoSecretKey_1.CryptoSecretKey) {
            CryptoValidation_1.CryptoValidation.checkNonceForAlgorithm(nonce, secretKey.algorithm);
        }
        else if (secretKey instanceof CoreBuffer_1.CoreBuffer) {
            CryptoValidation_1.CryptoValidation.checkEncryptionAlgorithm(algorithm);
            CryptoValidation_1.CryptoValidation.checkNonceForAlgorithm(nonce, algorithm);
        }
        else {
            throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.EncryptionWrongSecretKey, "Secret key must either be a CoreBuffer or a CryptoSecretKey object.");
        }
        CryptoValidation_1.CryptoValidation.checkCounter(counter);
        const publicnonce = this._addCounter(nonce.buffer, counter);
        return await this.decrypt(cipher, secretKey, publicnonce);
    }
    static createNonce(algorithm) {
        CryptoValidation_1.CryptoValidation.checkEncryptionAlgorithm(algorithm);
        let nonceLength;
        switch (algorithm) {
            case 1 /* CryptoEncryptionAlgorithm.AES128_GCM */:
            case 2 /* CryptoEncryptionAlgorithm.AES256_GCM */:
                nonceLength = 12;
                break;
            case 3 /* CryptoEncryptionAlgorithm.XCHACHA20_POLY1305 */:
                nonceLength = 24;
                break;
            default:
                throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.EncryptionWrongAlgorithm, "Encryption algorithm is not supported.");
        }
        return CoreBuffer_1.CoreBuffer.random(nonceLength);
    }
    /**
     * Creates a new CoreBuffer object and increases it by the counter
     *
     * @param nonce
     * @param counter
     */
    static _addCounter(nonce, counter) {
        let buffer;
        if (nonce instanceof Uint8Array) {
            buffer = new CoreBuffer_1.CoreBuffer(nonce);
        }
        else if (nonce instanceof CoreBuffer_1.CoreBuffer) {
            buffer = nonce;
        }
        else {
            throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.EncryptionWrongNonce);
        }
        const clone = buffer.clone().add(counter);
        return clone;
    }
}
exports.CryptoEncryption = CryptoEncryption;
//# sourceMappingURL=CryptoEncryption.js.map