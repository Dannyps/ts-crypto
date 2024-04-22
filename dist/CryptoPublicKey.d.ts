import { CoreBuffer, Encoding, ICoreBuffer } from "./CoreBuffer";
import { CryptoSerializable } from "./CryptoSerializable";
import { CryptoExchangeAlgorithm } from "./exchange/CryptoExchange";
import { CryptoSignatureAlgorithm } from "./signature/CryptoSignatureAlgorithm";
export interface ICryptoPublicKey {
    publicKey: ICoreBuffer;
    algorithm: CryptoExchangeAlgorithm | CryptoSignatureAlgorithm;
    toString(): string;
    toPEM(): string;
    toJSON(): Object;
}
export interface ICryptoPublicKeyStatic {
    new (): ICryptoPublicKey;
    fromPEM(pem: string, algorithm: CryptoExchangeAlgorithm | CryptoSignatureAlgorithm): Promise<CryptoPublicKey>;
    fromString(value: string, algorithm: CryptoExchangeAlgorithm | CryptoSignatureAlgorithm, encoding: Encoding): Promise<CryptoPublicKey>;
    fromNativeKey(key: any, algorithm: CryptoExchangeAlgorithm | CryptoSignatureAlgorithm): Promise<CryptoPublicKey>;
}
export declare class CryptoPublicKey extends CryptoSerializable implements ICryptoPublicKey {
    algorithm: CryptoExchangeAlgorithm | CryptoSignatureAlgorithm;
    publicKey: CoreBuffer;
    toString(): string;
    toPEM(): string;
    protected static stripPEM(pem: string): string;
    static fromPEM(pem: string, algorithm: CryptoExchangeAlgorithm | CryptoSignatureAlgorithm): CryptoPublicKey;
    static fromString(value: string, algorithm: CryptoExchangeAlgorithm | CryptoSignatureAlgorithm, encoding?: Encoding): CryptoPublicKey;
    static fromObject(value: any, algorithm: CryptoExchangeAlgorithm | CryptoSignatureAlgorithm): CryptoPublicKey;
    static from(value: any): CryptoPublicKey;
    static fromBase64(value: string): CryptoPublicKey;
}
