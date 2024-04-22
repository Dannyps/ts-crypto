import { ISerializable, Serializable } from "@js-soft/ts-serval";
export declare abstract class CryptoSerializable extends Serializable implements ISerializable {
    serialize(verbose?: boolean): string;
    toBase64(verbose?: boolean): string;
}
