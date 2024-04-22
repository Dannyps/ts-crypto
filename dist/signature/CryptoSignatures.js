"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoSignatures = void 0;
const CoreBuffer_1 = require("../CoreBuffer");
const CryptoError_1 = require("../CryptoError");
const CryptoErrorCode_1 = require("../CryptoErrorCode");
const CryptoSignatureKeypair_1 = require("./CryptoSignatureKeypair");
const CryptoSignaturePrivateKey_1 = require("./CryptoSignaturePrivateKey");
const CryptoSignaturePublicKey_1 = require("./CryptoSignaturePublicKey");
const CryptoSignatureValidation_1 = require("./CryptoSignatureValidation");
class CryptoSignatures {
    static async privateKeyToPublicKey(privateKey) {
        switch (privateKey.algorithm) {
            case 3 /* CryptoSignatureAlgorithm.ECDSA_ED25519 */:
                throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.NotYetImplemented);
            default:
                throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.NotYetImplemented);
        }
    }
    /**
     * Generates a keypair for the specified elliptic algorithm
     * @param algorithm
     */
    static async generateKeypair(algorithm = 3 /* CryptoSignatureAlgorithm.ECDSA_ED25519 */) {
        CryptoSignatureValidation_1.CryptoSignatureValidation.checkSignatureAlgorithm(algorithm);
        let pair;
        switch (algorithm) {
            case 3 /* CryptoSignatureAlgorithm.ECDSA_ED25519 */:
                throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.NotYetImplemented);
                break;
            default:
                throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.NotYetImplemented);
        }
        const privateKey = CryptoSignaturePrivateKey_1.CryptoSignaturePrivateKey.from({ algorithm, privateKey: CoreBuffer_1.CoreBuffer.from(pair.privateKey) });
        const publicKey = CryptoSignaturePublicKey_1.CryptoSignaturePublicKey.from({ algorithm, publicKey: CoreBuffer_1.CoreBuffer.from(pair.publicKey) });
        const keypair = CryptoSignatureKeypair_1.CryptoSignatureKeypair.from({ publicKey, privateKey });
        return keypair;
    }
    static async sign(content, privateKey, algorithm = 2 /* CryptoHashAlgorithm.SHA512 */, keyId, id) {
        CryptoSignatureValidation_1.CryptoSignatureValidation.checkBuffer(content, 1);
        CryptoSignatureValidation_1.CryptoSignatureValidation.checkHashAlgorithm(algorithm);
        try {
            throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.NotYetImplemented);
        }
        catch (e) {
            const error = new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.SignatureSign, `${e}`);
            throw error;
        }
    }
    static async verify(content, signature, publicKey) {
        throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.NotYetImplemented);
    }
    static getArrayOfPublicKey(publicKey) {
        let buffer;
        if (publicKey instanceof CryptoSignaturePublicKey_1.CryptoSignaturePublicKey) {
            buffer = publicKey.publicKey;
        }
        else if (publicKey instanceof CoreBuffer_1.CoreBuffer) {
            buffer = publicKey;
        }
        else {
            throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.SignatureWrongPublicKey, "The given public key must be of type CryptoSignaturePublicKey or CoreBuffer.");
        }
        CryptoSignatureValidation_1.CryptoSignatureValidation.checkBuffer(buffer);
        return buffer.buffer;
    }
}
exports.CryptoSignatures = CryptoSignatures;
//# sourceMappingURL=CryptoSignatures.js.map