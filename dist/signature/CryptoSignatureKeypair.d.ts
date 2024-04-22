import { ISerializable, ISerialized } from "@js-soft/ts-serval";
import { IClearable } from "../CoreBuffer";
import { CryptoSerializable } from "../CryptoSerializable";
import { CryptoSignaturePrivateKey, ICryptoSignaturePrivateKey, ICryptoSignaturePrivateKeySerialized } from "./CryptoSignaturePrivateKey";
import { CryptoSignaturePublicKey, ICryptoSignaturePublicKey, ICryptoSignaturePublicKeySerialized } from "./CryptoSignaturePublicKey";
export interface ICryptoSignatureKeypairSerialized extends ISerialized {
    pub: ICryptoSignaturePublicKeySerialized;
    prv: ICryptoSignaturePrivateKeySerialized;
}
export interface ICryptoSignatureKeypair extends ISerializable {
    publicKey: ICryptoSignaturePublicKey;
    privateKey: ICryptoSignaturePrivateKey;
}
export declare class CryptoSignatureKeypair extends CryptoSerializable implements ICryptoSignatureKeypair, IClearable {
    publicKey: CryptoSignaturePublicKey;
    privateKey: CryptoSignaturePrivateKey;
    toJSON(verbose?: boolean): ICryptoSignatureKeypairSerialized;
    clear(): void;
    static from(value: CryptoSignatureKeypair | ICryptoSignatureKeypair): CryptoSignatureKeypair;
    protected static preFrom(value: any): any;
    static fromJSON(value: ICryptoSignatureKeypairSerialized): CryptoSignatureKeypair;
    static fromBase64(value: string): CryptoSignatureKeypair;
}
