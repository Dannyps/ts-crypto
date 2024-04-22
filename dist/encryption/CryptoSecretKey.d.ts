import { ISerializable, ISerialized } from "@js-soft/ts-serval";
import { CoreBuffer, IClearable, ICoreBuffer } from "../CoreBuffer";
import { CryptoSerializable } from "../CryptoSerializable";
import { CryptoEncryptionAlgorithm } from "./CryptoEncryption";
export interface ICryptoSecretKeySerialized extends ISerialized {
    alg: number;
    key: string;
}
export interface ICryptoSecretKey extends ISerializable {
    algorithm: CryptoEncryptionAlgorithm;
    secretKey: ICoreBuffer;
}
export declare class CryptoSecretKey extends CryptoSerializable implements ICryptoSecretKey, IClearable {
    algorithm: CryptoEncryptionAlgorithm;
    secretKey: CoreBuffer;
    toJSON(verbose?: boolean): ICryptoSecretKeySerialized;
    clear(): void;
    static from(value: CryptoSecretKey | ICryptoSecretKey): CryptoSecretKey;
    protected static preFrom(value: any): any;
    static fromJSON(value: ICryptoSecretKeySerialized): CryptoSecretKey;
    static fromBase64(value: string): CryptoSecretKey;
}
