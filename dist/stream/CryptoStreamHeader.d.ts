import { ISerializable, Serializable } from "@js-soft/ts-serval";
import { CoreBuffer, ICoreBuffer } from "../CoreBuffer";
export interface ICryptoStreamHeader extends ISerializable {
    header: ICoreBuffer;
}
export interface ICryptoStreamHeaderStatic {
    new (): ICryptoStreamHeader;
    from(obj: ICryptoStreamHeader): Promise<ICryptoStreamHeader>;
    deserialize(content: string): Promise<ICryptoStreamHeader>;
}
export declare class CryptoStreamHeader extends Serializable implements ICryptoStreamHeader {
    header: CoreBuffer;
    toString(): string;
    serialize(): string;
    toJSON(): Object;
    toBase64(): string;
    protected static preFrom(value: any): any;
    static from(obj: ICryptoStreamHeader | CoreBuffer): CryptoStreamHeader;
    static fromBase64(value: string): CryptoStreamHeader;
}
