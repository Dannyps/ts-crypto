import { ISerializable, ISerialized } from "@js-soft/ts-serval";
import { IClearable, ICoreBuffer } from "../CoreBuffer";
import { CryptoPublicKey } from "../CryptoPublicKey";
import { CryptoSignatureAlgorithm } from "./CryptoSignatureAlgorithm";
export interface ICryptoSignaturePublicKeySerialized extends ISerialized {
    alg: number;
    pub: string;
}
export interface ICryptoSignaturePublicKey extends ISerializable {
    algorithm: CryptoSignatureAlgorithm;
    publicKey: ICoreBuffer;
}
export declare class CryptoSignaturePublicKey extends CryptoPublicKey implements ICryptoSignaturePublicKey, IClearable {
    algorithm: CryptoSignatureAlgorithm;
    toJSON(verbose?: boolean): ICryptoSignaturePublicKeySerialized;
    clear(): void;
    toBase64(verbose?: boolean): string;
    static from(value: CryptoSignaturePublicKey | ICryptoSignaturePublicKey): CryptoSignaturePublicKey;
    static preFrom(value: any): any;
    static fromJSON(value: ICryptoSignaturePublicKeySerialized): CryptoSignaturePublicKey;
    static fromBase64(value: string): CryptoSignaturePublicKey;
}
