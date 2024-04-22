import { ISerializable, ISerialized } from "@js-soft/ts-serval";
import { CoreBuffer, IClearable, ICoreBuffer } from "../CoreBuffer";
import { CryptoSerializable } from "../CryptoSerializable";
import { CryptoEncryptionAlgorithm } from "./CryptoEncryption";
export interface ICryptoCipherSerialized extends ISerialized {
    alg: number;
    cph: string;
    cnt?: number;
    nnc?: string;
}
export interface ICryptoCipher extends ISerializable {
    algorithm: CryptoEncryptionAlgorithm;
    cipher: ICoreBuffer;
    counter?: number;
    nonce?: ICoreBuffer;
}
export declare class CryptoCipher extends CryptoSerializable implements ICryptoCipher, IClearable {
    static MIN_CIPHER_BYTES: number;
    static MAX_CIPHER_BYTES: number;
    algorithm: CryptoEncryptionAlgorithm;
    cipher: CoreBuffer;
    counter?: number;
    nonce?: CoreBuffer;
    toJSON(verbose?: boolean): ICryptoCipherSerialized;
    clear(): void;
    static from(value: CryptoCipher | ICryptoCipher): CryptoCipher;
    protected static preFrom(value: any): any;
    static fromJSON(value: ICryptoCipherSerialized): CryptoCipher;
    static fromBase64(value: string): CryptoCipher;
}
