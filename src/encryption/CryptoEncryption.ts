import { CoreBuffer } from "../CoreBuffer";
import { CryptoError } from "../CryptoError";
import { CryptoErrorCode } from "../CryptoErrorCode";
import { CryptoValidation } from "../CryptoValidation";
import { CryptoCipher } from "./CryptoCipher";
import { CryptoSecretKey } from "./CryptoSecretKey";

/**
 * The symmetric encryption algorithm to use.
 */
export const enum CryptoEncryptionAlgorithm {
    /**
     * AES 128-bit encryption with Galois-Counter-Mode
     * 12-byte Initialization Vector is prepended to cipher
     * 16-byte Authentication Tag is appended to cipher
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    AES128_GCM = 1,
    /**
     * AES 256-bit encryption with Galois-Counter-Mode
     * 12-byte Initialization Vector is prepended to cipher
     * 16-byte Authentication Tag is appended to cipher
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    AES256_GCM = 2,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    XCHACHA20_POLY1305 = 3
}

export abstract class CryptoEncryption {
    public static async generateKey(
        algorithm: CryptoEncryptionAlgorithm = CryptoEncryptionAlgorithm.XCHACHA20_POLY1305
    ): Promise<CryptoSecretKey> {
        throw new CryptoError(CryptoErrorCode.NotYetImplemented);
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
    public static async encrypt(
        plaintext: CoreBuffer,
        secretKey: CryptoSecretKey | CoreBuffer,
        nonce?: CoreBuffer,
        algorithm: CryptoEncryptionAlgorithm = CryptoEncryptionAlgorithm.XCHACHA20_POLY1305
    ): Promise<CryptoCipher> {
        throw new CryptoError(CryptoErrorCode.NotYetImplemented);
    }

    public static async encryptWithCounter(
        plaintext: CoreBuffer,
        secretKey: CryptoSecretKey | CoreBuffer,
        nonce: CoreBuffer,
        counter: number,
        algorithm: CryptoEncryptionAlgorithm = CryptoEncryptionAlgorithm.XCHACHA20_POLY1305
    ): Promise<CryptoCipher> {
        throw new CryptoError(CryptoErrorCode.NotYetImplemented);
    }

    public static async decrypt(
        cipher: CryptoCipher,
        secretKey: CryptoSecretKey | CoreBuffer,
        nonce?: CoreBuffer,
        algorithm: CryptoEncryptionAlgorithm = CryptoEncryptionAlgorithm.XCHACHA20_POLY1305
    ): Promise<CoreBuffer> {
        throw new CryptoError(CryptoErrorCode.NotYetImplemented);
    }

    public static async decryptWithCounter(
        cipher: CryptoCipher,
        secretKey: CryptoSecretKey | CoreBuffer,
        nonce: CoreBuffer,
        counter: number,
        algorithm: CryptoEncryptionAlgorithm = CryptoEncryptionAlgorithm.XCHACHA20_POLY1305
    ): Promise<CoreBuffer> {
        if (secretKey instanceof CryptoSecretKey) {
            CryptoValidation.checkNonceForAlgorithm(nonce, secretKey.algorithm);
        } else if (secretKey instanceof CoreBuffer) {
            CryptoValidation.checkEncryptionAlgorithm(algorithm);
            CryptoValidation.checkNonceForAlgorithm(nonce, algorithm);
        } else {
            throw new CryptoError(
                CryptoErrorCode.EncryptionWrongSecretKey,
                "Secret key must either be a CoreBuffer or a CryptoSecretKey object."
            );
        }
        CryptoValidation.checkCounter(counter);

        const publicnonce = this._addCounter(nonce.buffer, counter);

        return await this.decrypt(cipher, secretKey, publicnonce);
    }

    public static createNonce(algorithm: CryptoEncryptionAlgorithm): CoreBuffer {
        CryptoValidation.checkEncryptionAlgorithm(algorithm);

        let nonceLength;
        switch (algorithm) {
            case CryptoEncryptionAlgorithm.AES128_GCM:
            case CryptoEncryptionAlgorithm.AES256_GCM:
                nonceLength = 12;
                break;
            case CryptoEncryptionAlgorithm.XCHACHA20_POLY1305:
                nonceLength = 24;
                break;
            default:
                throw new CryptoError(
                    CryptoErrorCode.EncryptionWrongAlgorithm,
                    "Encryption algorithm is not supported."
                );
        }
        return CoreBuffer.random(nonceLength);
    }

    /**
     * Creates a new CoreBuffer object and increases it by the counter
     *
     * @param nonce
     * @param counter
     */
    private static _addCounter(nonce: Uint8Array | CoreBuffer, counter: number): CoreBuffer {
        let buffer;
        if (nonce instanceof Uint8Array) {
            buffer = new CoreBuffer(nonce);
        } else if (nonce instanceof CoreBuffer) {
            buffer = nonce;
        } else {
            throw new CryptoError(CryptoErrorCode.EncryptionWrongNonce);
        }

        const clone = buffer.clone().add(counter);

        return clone;
    }
}
