import { ISerializable, ISerialized } from "@js-soft/ts-serval";
import { IClearable, ICoreBuffer } from "../CoreBuffer";
import { CryptoPrivateKey } from "../CryptoPrivateKey";
import { CryptoSignatureAlgorithm } from "./CryptoSignatureAlgorithm";
import { CryptoSignaturePublicKey } from "./CryptoSignaturePublicKey";
export interface ICryptoSignaturePrivateKeySerialized extends ISerialized {
    alg: number;
    prv: string;
    id?: string;
}
export interface ICryptoSignaturePrivateKey extends ISerializable {
    algorithm: CryptoSignatureAlgorithm;
    privateKey: ICoreBuffer;
    id?: string;
}
export declare class CryptoSignaturePrivateKey extends CryptoPrivateKey implements ICryptoSignaturePrivateKey, IClearable {
    algorithm: CryptoSignatureAlgorithm;
    id?: string;
    toJSON(verbose?: boolean): ICryptoSignaturePrivateKeySerialized;
    clear(): void;
    toBase64(verbose?: boolean): string;
    toPublicKey(): Promise<CryptoSignaturePublicKey>;
    static from(value: CryptoSignaturePrivateKey | ICryptoSignaturePrivateKey): CryptoSignaturePrivateKey;
    static preFrom(value: any): any;
    static fromJSON(value: ICryptoSignaturePrivateKeySerialized): CryptoSignaturePrivateKey;
    static fromBase64(value: string): CryptoSignaturePrivateKey;
}
