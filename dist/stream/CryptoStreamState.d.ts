import { ISerializable, Serializable } from "@js-soft/ts-serval";
import { CryptoStreamAddress } from "./CryptoStreamAddress";
import { CryptoStreamHeader } from "./CryptoStreamHeader";
export interface ICryptoStreamState extends ISerializable {
    address: CryptoStreamAddress;
    header: CryptoStreamHeader;
}
export interface ICryptoStreamaddressStatic {
    new (): CryptoStreamState;
    from(obj: ICryptoStreamState): Promise<ICryptoStreamState>;
    deserialize(content: string): Promise<ICryptoStreamState>;
}
export declare class CryptoStreamState extends Serializable implements ICryptoStreamState {
    address: CryptoStreamAddress;
    header: CryptoStreamHeader;
    toString(): string;
    static from(obj: ICryptoStreamState): CryptoStreamState;
}
