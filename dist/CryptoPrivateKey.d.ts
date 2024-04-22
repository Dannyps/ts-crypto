import { CoreBuffer, Encoding, ICoreBuffer } from "./CoreBuffer";
import { CryptoSerializable } from "./CryptoSerializable";
import { CryptoExchangeAlgorithm } from "./exchange/CryptoExchange";
import { CryptoSignatureAlgorithm } from "./signature/CryptoSignatureAlgorithm";
export interface ICryptoPrivateKey {
    privateKey: ICoreBuffer;
    algorithm: CryptoExchangeAlgorithm | CryptoSignatureAlgorithm;
    toString(): string;
    toPEM(): string;
}
export interface ICryptoPrivateKeyStatic {
    new (): ICryptoPrivateKey;
    fromPEM(pem: string, algorithm: CryptoExchangeAlgorithm | CryptoSignatureAlgorithm): Promise<ICryptoPrivateKey>;
    fromString(value: string, algorithm: CryptoExchangeAlgorithm | CryptoSignatureAlgorithm, encoding: Encoding): Promise<ICryptoPrivateKey>;
    fromNativeKey(key: any, algorithm: CryptoExchangeAlgorithm | CryptoSignatureAlgorithm): Promise<ICryptoPrivateKey>;
}
export declare class CryptoPrivateKey extends CryptoSerializable implements ICryptoPrivateKey {
    algorithm: CryptoExchangeAlgorithm | CryptoSignatureAlgorithm;
    privateKey: CoreBuffer;
    toPEM(): string;
    toString(): string;
    protected static stripPEM(pem: string): string;
    static fromString(value: string, algorithm: CryptoExchangeAlgorithm | CryptoSignatureAlgorithm, encoding?: Encoding): CryptoPrivateKey;
    static fromObject(value: any, algorithm: CryptoExchangeAlgorithm | CryptoSignatureAlgorithm): CryptoPrivateKey;
    static fromPEM(pem: string, algorithm: CryptoExchangeAlgorithm | CryptoSignatureAlgorithm): CryptoPrivateKey;
    static from(value: any): CryptoPrivateKey;
    static fromBase64(value: string): CryptoPrivateKey;
}
