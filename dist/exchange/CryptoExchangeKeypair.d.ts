import { ISerializable, ISerialized } from "@js-soft/ts-serval";
import { IClearable } from "../CoreBuffer";
import { CryptoSerializable } from "../CryptoSerializable";
import { CryptoExchangePrivateKey, ICryptoExchangePrivateKey, ICryptoExchangePrivateKeySerialized } from "./CryptoExchangePrivateKey";
import { CryptoExchangePublicKey, ICryptoExchangePublicKey, ICryptoExchangePublicKeySerialized } from "./CryptoExchangePublicKey";
export interface ICryptoExchangeKeypairSerialized extends ISerialized {
    pub: ICryptoExchangePublicKeySerialized;
    prv: ICryptoExchangePrivateKeySerialized;
}
export interface ICryptoExchangeKeypair extends ISerializable {
    publicKey: ICryptoExchangePublicKey;
    privateKey: ICryptoExchangePrivateKey;
}
export declare class CryptoExchangeKeypair extends CryptoSerializable implements ICryptoExchangeKeypair, IClearable {
    publicKey: CryptoExchangePublicKey;
    privateKey: CryptoExchangePrivateKey;
    toJSON(verbose?: boolean): ICryptoExchangeKeypairSerialized;
    clear(): void;
    protected static preFrom(value: any): any;
    static from(value: CryptoExchangeKeypair | ICryptoExchangeKeypair): CryptoExchangeKeypair;
    static fromJSON(value: ICryptoExchangeKeypairSerialized): CryptoExchangeKeypair;
    static fromBase64(value: string): CryptoExchangeKeypair;
}
