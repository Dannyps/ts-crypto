import { ISerializable, Serializable } from "@js-soft/ts-serval";
export interface ICryptoStreamAddress extends ISerializable {
    address: string;
    toString(): string;
    serialize(): string;
}
export interface ICryptoStreamAddressStatic {
    new (): ICryptoStreamAddress;
    from(obj: ICryptoStreamAddress): Promise<ICryptoStreamAddress>;
    deserialize(content: string): Promise<ICryptoStreamAddress>;
}
export declare class CryptoStreamAddress extends Serializable implements ICryptoStreamAddress {
    address: string;
    toString(): string;
    protected static preFrom(obj: any): any;
    static from(obj: any | string): CryptoStreamAddress;
}
