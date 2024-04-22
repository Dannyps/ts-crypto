import { CoreBuffer } from "../CoreBuffer";
import { CryptoError } from "../CryptoError";
import { CryptoErrorCode } from "../CryptoErrorCode";
import { CryptoHashAlgorithm } from "../hash/CryptoHash";
import { CryptoSignature } from "./CryptoSignature";
import { CryptoSignatureAlgorithm } from "./CryptoSignatureAlgorithm";
import { CryptoSignatureKeypair } from "./CryptoSignatureKeypair";
import { CryptoSignaturePrivateKey } from "./CryptoSignaturePrivateKey";
import { CryptoSignaturePublicKey } from "./CryptoSignaturePublicKey";
import { CryptoSignatureValidation } from "./CryptoSignatureValidation";

export class CryptoSignatures {
    public static async privateKeyToPublicKey(
        privateKey: CryptoSignaturePrivateKey
    ): Promise<CryptoSignaturePublicKey> {
        switch (privateKey.algorithm) {
            case CryptoSignatureAlgorithm.ECDSA_ED25519:
                throw new CryptoError(CryptoErrorCode.NotYetImplemented);
            default:
                throw new CryptoError(CryptoErrorCode.NotYetImplemented);
        }
    }

    /**
     * Generates a keypair for the specified elliptic algorithm
     * @param algorithm
     */
    public static async generateKeypair(
        algorithm: CryptoSignatureAlgorithm = CryptoSignatureAlgorithm.ECDSA_ED25519
    ): Promise<CryptoSignatureKeypair> {
        CryptoSignatureValidation.checkSignatureAlgorithm(algorithm);

        let pair;
        switch (algorithm) {
            case CryptoSignatureAlgorithm.ECDSA_ED25519:
                throw new CryptoError(CryptoErrorCode.NotYetImplemented);
                break;
            default:
                throw new CryptoError(CryptoErrorCode.NotYetImplemented);
        }

        const privateKey = CryptoSignaturePrivateKey.from({ algorithm, privateKey: CoreBuffer.from(pair.privateKey) });
        const publicKey = CryptoSignaturePublicKey.from({ algorithm, publicKey: CoreBuffer.from(pair.publicKey) });

        const keypair = CryptoSignatureKeypair.from({ publicKey, privateKey });
        return keypair;
    }

    public static async sign(
        content: CoreBuffer,
        privateKey: CryptoSignaturePrivateKey | CoreBuffer,
        algorithm: CryptoHashAlgorithm = CryptoHashAlgorithm.SHA512,
        keyId?: string,
        id?: string
    ): Promise<CryptoSignature> {
        CryptoSignatureValidation.checkBuffer(content, 1);
        CryptoSignatureValidation.checkHashAlgorithm(algorithm);
        try {
            throw new CryptoError(CryptoErrorCode.NotYetImplemented);
        } catch (e) {
            const error = new CryptoError(CryptoErrorCode.SignatureSign, `${e}`);
            throw error;
        }
    }

    public static async verify(
        content: CoreBuffer,
        signature: CryptoSignature,
        publicKey: CryptoSignaturePublicKey | CoreBuffer
    ): Promise<boolean> {
        throw new CryptoError(CryptoErrorCode.NotYetImplemented);
    }

    private static getArrayOfPublicKey(publicKey: CryptoSignaturePublicKey | CoreBuffer): Uint8Array {
        let buffer: CoreBuffer;
        if (publicKey instanceof CryptoSignaturePublicKey) {
            buffer = publicKey.publicKey;
        } else if (publicKey instanceof CoreBuffer) {
            buffer = publicKey;
        } else {
            throw new CryptoError(
                CryptoErrorCode.SignatureWrongPublicKey,
                "The given public key must be of type CryptoSignaturePublicKey or CoreBuffer."
            );
        }
        CryptoSignatureValidation.checkBuffer(buffer);

        return buffer.buffer;
    }
}
