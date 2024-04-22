import { ISerializable, ISerialized, Serializable } from "@js-soft/ts-serval";
import { CoreBuffer, IClearable, ICoreBuffer } from "../CoreBuffer";
import { CryptoEncryptionAlgorithm } from "../encryption/CryptoEncryption";
import { CryptoPublicState } from "./CryptoPublicState";
import { CryptoStateType } from "./CryptoStateType";
export interface ICryptoPrivateStateSerialized extends ISerialized {
    key: string;
    nnc: string;
    cnt: number;
    alg: number;
    id?: string;
    typ: number;
}
export interface ICryptoPrivateState extends ISerializable {
    secretKey: ICoreBuffer;
    nonce: ICoreBuffer;
    counter: number;
    algorithm: CryptoEncryptionAlgorithm;
    id?: string;
    stateType: CryptoStateType;
}
export declare class CryptoPrivateState extends Serializable implements ICryptoPrivateState, IClearable {
    id?: string;
    nonce: CoreBuffer;
    counter: number;
    secretKey: CoreBuffer;
    algorithm: CryptoEncryptionAlgorithm;
    stateType: CryptoStateType;
    protected setCounter(value: number): void;
    clear(): void;
    toString(): string;
    toPublicState(): CryptoPublicState;
    toJSON(verbose?: boolean): ICryptoPrivateStateSerialized;
    protected static preFrom(value: any): any;
    static from(obj: CryptoPrivateState | ICryptoPrivateState): CryptoPrivateState;
    static fromJSON(value: ICryptoPrivateStateSerialized): CryptoPrivateState;
}
