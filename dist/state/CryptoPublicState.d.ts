import { ISerializable, ISerialized, Serializable } from "@js-soft/ts-serval";
import { CoreBuffer, IClearable } from "../CoreBuffer";
import { CryptoEncryptionAlgorithm } from "../encryption/CryptoEncryption";
import { CryptoStateType } from "./CryptoStateType";
export interface ICryptoPublicStateSerialized extends ISerialized {
    nnc: string;
    alg: number;
    id?: string;
    typ: number;
}
export interface ICryptoPublicState extends ISerializable {
    nonce: CoreBuffer;
    algorithm: CryptoEncryptionAlgorithm;
    id?: string;
    stateType: CryptoStateType;
}
export declare class CryptoPublicState extends Serializable implements ICryptoPublicState, IClearable {
    id?: string;
    nonce: CoreBuffer;
    algorithm: CryptoEncryptionAlgorithm;
    stateType: CryptoStateType;
    clear(): void;
    toJSON(verbose?: boolean): ICryptoPublicStateSerialized;
    protected static preFrom(value: any): any;
    static from(value: CryptoPublicState | ICryptoPublicState): CryptoPublicState;
    static fromJSON(value: ICryptoPublicStateSerialized): CryptoPublicState;
    static fromBase64(value: string): CryptoPublicState;
}
