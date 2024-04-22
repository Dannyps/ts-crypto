import { ISerialized } from "@js-soft/ts-serval";
import { CoreBuffer, IClearable } from "../CoreBuffer";
import { CryptoPublicKey } from "../CryptoPublicKey";
import { CryptoExchangeAlgorithm } from "./CryptoExchange";
export interface ICryptoExchangePublicKeySerialized extends ISerialized {
    alg: number;
    pub: string;
}
export interface ICryptoExchangePublicKey {
    algorithm: CryptoExchangeAlgorithm;
    publicKey: CoreBuffer;
}
export declare class CryptoExchangePublicKey extends CryptoPublicKey implements ICryptoExchangePublicKey, IClearable {
    algorithm: CryptoExchangeAlgorithm;
    publicKey: CoreBuffer;
    toJSON(verbose?: boolean): ICryptoExchangePublicKeySerialized;
    clear(): void;
    protected static preFrom(value: any): any;
    static from(value: CryptoExchangePublicKey | ICryptoExchangePublicKey): CryptoExchangePublicKey;
    static fromJSON(value: ICryptoExchangePublicKeySerialized): CryptoExchangePublicKey;
    static fromBase64(value: string): CryptoExchangePublicKey;
}
