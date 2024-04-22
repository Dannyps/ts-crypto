import { CoreBuffer } from "../CoreBuffer";
import { CryptoError } from "../CryptoError";
import { CryptoValidation } from "../CryptoValidation";
import { CryptoExchangeAlgorithm } from "./CryptoExchange";
export declare class CryptoExchangeValidation extends CryptoValidation {
    static readonly PRIVATE_KEY_MIN_BYTES = 20;
    static readonly PRIVATE_KEY_MAX_BYTES = 40;
    static readonly PUBLIC_KEY_MIN_BYTES = 20;
    static readonly PUBLIC_KEY_MAX_BYTES = 40;
    static checkExchangeAlgorithm(algorithm: number, throwError?: boolean): CryptoError | undefined;
    static checkExchangePrivateKeyAsString(privateKey: string, algorithm: CryptoExchangeAlgorithm, propertyName?: string, throwError?: boolean): CryptoError | undefined;
    static checkExchangePrivateKeyAsBuffer(privateKey: CoreBuffer, algorithm: CryptoExchangeAlgorithm, propertyName?: string, throwError?: boolean): CryptoError | undefined;
    static checkExchangePrivateKey(privateKey: string | CoreBuffer, algorithm: CryptoExchangeAlgorithm, propertyName?: string, throwError?: boolean): CryptoError | undefined;
    static checkExchangePublicKeyAsString(publicKey: string, algorithm: CryptoExchangeAlgorithm, propertyName?: string, throwError?: boolean): CryptoError | undefined;
    static checkExchangePublicKeyAsBuffer(publicKey: CoreBuffer, algorithm: CryptoExchangeAlgorithm, propertyName?: string, throwError?: boolean): CryptoError | undefined;
    static checkExchangePublicKey(publicKey: string | CoreBuffer, algorithm: CryptoExchangeAlgorithm, propertyName?: string, throwError?: boolean): CryptoError | undefined;
}
