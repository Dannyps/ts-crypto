import { CoreBuffer } from "../CoreBuffer";
import { CryptoCipher } from "./CryptoCipher";
import { CryptoSecretKey } from "./CryptoSecretKey";
/**
 * The symmetric encryption algorithm to use.
 */
export declare const enum CryptoEncryptionAlgorithm {
    /**
     * AES 128-bit encryption with Galois-Counter-Mode
     * 12-byte Initialization Vector is prepended to cipher
     * 16-byte Authentication Tag is appended to cipher
     */
    AES128_GCM = 1,
    /**
     * AES 256-bit encryption with Galois-Counter-Mode
     * 12-byte Initialization Vector is prepended to cipher
     * 16-byte Authentication Tag is appended to cipher
     */
    AES256_GCM = 2,
    XCHACHA20_POLY1305 = 3
}
export declare abstract class CryptoEncryption {
    static generateKey(algorithm?: CryptoEncryptionAlgorithm): Promise<CryptoSecretKey>;
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
    static encrypt(plaintext: CoreBuffer, secretKey: CryptoSecretKey | CoreBuffer, nonce?: CoreBuffer, algorithm?: CryptoEncryptionAlgorithm): Promise<CryptoCipher>;
    static encryptWithCounter(plaintext: CoreBuffer, secretKey: CryptoSecretKey | CoreBuffer, nonce: CoreBuffer, counter: number, algorithm?: CryptoEncryptionAlgorithm): Promise<CryptoCipher>;
    static decrypt(cipher: CryptoCipher, secretKey: CryptoSecretKey | CoreBuffer, nonce?: CoreBuffer, algorithm?: CryptoEncryptionAlgorithm): Promise<CoreBuffer>;
    static decryptWithCounter(cipher: CryptoCipher, secretKey: CryptoSecretKey | CoreBuffer, nonce: CoreBuffer, counter: number, algorithm?: CryptoEncryptionAlgorithm): Promise<CoreBuffer>;
    static createNonce(algorithm: CryptoEncryptionAlgorithm): CoreBuffer;
    /**
     * Creates a new CoreBuffer object and increases it by the counter
     *
     * @param nonce
     * @param counter
     */
    private static _addCounter;
}
