import { ISerializable, ISerialized } from "@js-soft/ts-serval";
import { CoreBuffer, IClearable, ICoreBuffer } from "../CoreBuffer";
import { CryptoPrivateKey } from "../CryptoPrivateKey";
import { CryptoExchangeAlgorithm } from "./CryptoExchange";
import { CryptoExchangePublicKey } from "./CryptoExchangePublicKey";
export interface ICryptoExchangePrivateKeySerialized extends ISerialized {
    alg: number;
    prv: string;
}
export interface ICryptoExchangePrivateKey extends ISerializable {
    algorithm: CryptoExchangeAlgorithm;
    privateKey: ICoreBuffer;
}
export declare class CryptoExchangePrivateKey extends CryptoPrivateKey implements ICryptoExchangePrivateKey, IClearable {
    algorithm: CryptoExchangeAlgorithm;
    privateKey: CoreBuffer;
    toJSON(verbose?: boolean): ICryptoExchangePrivateKeySerialized;
    clear(): void;
    toBase64(verbose?: boolean): string;
    toPublicKey(): Promise<CryptoExchangePublicKey>;
    static from(value: CryptoExchangePrivateKey | ICryptoExchangePrivateKey): CryptoExchangePrivateKey;
    protected static preFrom(value: any): any;
    static fromJSON(value: ICryptoExchangePrivateKeySerialized): CryptoExchangePrivateKey;
    static fromBase64(value: string): CryptoExchangePrivateKey;
}
