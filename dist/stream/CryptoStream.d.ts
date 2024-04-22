import { CoreBuffer, ICoreBuffer } from "../CoreBuffer";
import { CryptoStreamAddress } from "./CryptoStreamAddress";
import { CryptoStreamHeader } from "./CryptoStreamHeader";
import { CryptoStreamState } from "./CryptoStreamState";
export interface ICryptoStream {
}
export interface ICryptoStreamStatic {
    new (): ICryptoStream;
}
export declare class CryptoStream implements ICryptoStream {
    static initServer(key: CoreBuffer): Promise<CryptoStreamState>;
    static initClient(header: CryptoStreamHeader, key: CoreBuffer): Promise<CryptoStreamAddress>;
    static encrypt(message: ICoreBuffer, stream: CryptoStreamAddress): Promise<CoreBuffer>;
    static decrypt(cipher: ICoreBuffer, stream: CryptoStreamAddress): Promise<CoreBuffer>;
    protected static getState(address: number): Promise<CoreBuffer>;
    protected static setState(address: number, state: CoreBuffer): Promise<void>;
}
