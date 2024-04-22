import { CoreBuffer } from "../CoreBuffer";
import { CryptoError } from "../CryptoError";
import { CryptoValidation } from "../CryptoValidation";
import { CryptoSignatureAlgorithm } from "./CryptoSignatureAlgorithm";
export declare class CryptoSignatureValidation extends CryptoValidation {
    static readonly PRIVATE_KEY_MIN_BYTES = 20;
    static readonly PRIVATE_KEY_MAX_BYTES = 80;
    static readonly PUBLIC_KEY_MIN_BYTES = 20;
    static readonly PUBLIC_KEY_MAX_BYTES = 80;
    static readonly SIGNATURE_MIN_BYTES = 20;
    static readonly SIGNATURE_MAX_BYTES = 100;
    static checkSignatureAlgorithm(algorithm: number, throwError?: boolean): CryptoError | undefined;
    static checkSignaturePrivateKeyAsString(key: string, propertyName?: string, throwError?: boolean): CryptoError | undefined;
    static checkSignaturePrivateKeyAsBuffer(buffer: CoreBuffer, propertyName?: string, throwError?: boolean): CryptoError | undefined;
    static checkSignaturePrivateKey(privateKey: string | CoreBuffer, propertyName?: string, throwError?: boolean): CryptoError | undefined;
    static checkSignaturePublicKeyAsString(key: string, algorithm: CryptoSignatureAlgorithm, propertyName?: string, throwError?: boolean): CryptoError | undefined;
    static checkSignaturePublicKeyAsBuffer(buffer: CoreBuffer, algorithm: CryptoSignatureAlgorithm, propertyName?: string, throwError?: boolean): CryptoError | undefined;
    static checkSignaturePublicKey(publicKey: string | CoreBuffer, algorithm: CryptoSignatureAlgorithm, propertyName?: string, throwError?: boolean): CryptoError | undefined;
    static checkSignatureAsString(signature: string, throwError?: boolean): CryptoError | undefined;
    static checkSignatureAsBuffer(signature: CoreBuffer, throwError?: boolean): CryptoError | undefined;
    static checkSignature(signature: string | CoreBuffer, throwError?: boolean): CryptoError | undefined;
    static checkSignaturePublicKeyId(keyId: string, throwError?: boolean): CryptoError | undefined;
    static checkSignatureKeyId(keyId: string, throwError?: boolean): CryptoError | undefined;
    static checkSignatureId(id: string, throwError?: boolean): CryptoError | undefined;
}
