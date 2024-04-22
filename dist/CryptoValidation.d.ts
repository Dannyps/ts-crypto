import { CoreBuffer } from "./CoreBuffer";
import { CryptoError } from "./CryptoError";
import { CryptoEncryptionAlgorithm } from "./encryption/CryptoEncryption";
export declare class CryptoValidation {
    static checkObject(value: any, propertyName?: string, throwError?: boolean): CryptoError | undefined;
    static checkBufferAsStringOrBuffer(buffer: CoreBuffer | string, minBytes?: number, maxBytes?: number, propertyName?: string, throwError?: boolean): CryptoError | undefined;
    static checkBuffer(buffer: CoreBuffer, minBytes?: number, maxBytes?: number, propertyName?: string, throwError?: boolean): CryptoError | undefined;
    static checkSerializedBuffer(serializedBuffer: string, minBytes?: number, maxBytes?: number, propertyName?: string, throwError?: boolean): CryptoError | undefined;
    static checkEncryptionAlgorithm(algorithm: number, throwError?: boolean): CryptoError | undefined;
    static checkHashAlgorithm(algorithm: number, throwError?: boolean): CryptoError | undefined;
    static checkStateType(type?: number, throwError?: boolean): CryptoError | undefined;
    static checkId(id: string, minLength?: number, maxLength?: number, throwError?: boolean): CryptoError | undefined;
    static checkSerializedSecretKeyForAlgorithm(key: string, algorithm: CryptoEncryptionAlgorithm, throwError?: boolean): CryptoError | undefined;
    static checkSecretKeyForAlgorithm(key?: CoreBuffer | string, algorithm?: CryptoEncryptionAlgorithm, throwError?: boolean): CryptoError | undefined;
    static checkNonceAsString(nonce: string, algorithm: CryptoEncryptionAlgorithm, propertyName?: string, throwError?: boolean): CryptoError | undefined;
    static checkNonceAsBuffer(nonce: CoreBuffer, algorithm: CryptoEncryptionAlgorithm, propertyName?: string, throwError?: boolean): CryptoError | undefined;
    static checkNonce(nonce: string | CoreBuffer, algorithm: CryptoEncryptionAlgorithm, propertyName?: string, throwError?: boolean): CryptoError | undefined;
    static checkNonceForAlgorithm(nonce: CoreBuffer, algorithm: CryptoEncryptionAlgorithm, throwError?: boolean): CryptoError | undefined;
    static checkCounter(counter?: number, throwError?: boolean): CryptoError | undefined;
}
