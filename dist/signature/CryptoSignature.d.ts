import { ISerializable, ISerialized } from "@js-soft/ts-serval";
import { CoreBuffer, IClearable } from "../CoreBuffer";
import { CryptoSerializable } from "../CryptoSerializable";
import { CryptoHashAlgorithm } from "../hash/CryptoHash";
export interface ICryptoSignatureSerialized extends ISerialized {
    sig: string;
    alg: number;
    kid?: string;
    id?: string;
}
export interface ICryptoSignature extends ISerializable {
    signature: CoreBuffer;
    algorithm: CryptoHashAlgorithm;
    keyId?: string;
    id?: string;
}
export declare class CryptoSignature extends CryptoSerializable implements ICryptoSignature, IClearable {
    signature: CoreBuffer;
    algorithm: CryptoHashAlgorithm;
    keyId?: string;
    id?: string;
    toJSON(verbose?: boolean): ICryptoSignatureSerialized;
    clear(): void;
    static from(value: CryptoSignature | ICryptoSignature): CryptoSignature;
    static preFrom(value: any): any;
    static fromJSON(value: ICryptoSignatureSerialized): CryptoSignature;
    static fromBase64(value: string): CryptoSignature;
}
