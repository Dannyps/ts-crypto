import { CryptoError, CryptoErrorCode } from "..";
import { CoreBuffer, ICoreBuffer } from "../CoreBuffer";
import { CryptoStreamAddress } from "./CryptoStreamAddress";
import { CryptoStreamHeader } from "./CryptoStreamHeader";
import { CryptoStreamState } from "./CryptoStreamState";

export interface ICryptoStream {}

export interface ICryptoStreamStatic {
    new (): ICryptoStream;
}

function staticImplements<T>() {
    return <U extends T>(_constructor: U) => {
        // No need for an implementation. This decorator is only for compile time. By saying `U extends T`,
        // TypeScript checks whether the constructor implements the given interface.
    };
}

@staticImplements<ICryptoStreamStatic>()
export class CryptoStream implements ICryptoStream {
    public static async initServer(key: CoreBuffer): Promise<CryptoStreamState> {
        throw new CryptoError(CryptoErrorCode.NotYetImplemented);
    }

    public static async initClient(header: CryptoStreamHeader, key: CoreBuffer): Promise<CryptoStreamAddress> {
        throw new CryptoError(CryptoErrorCode.NotYetImplemented);
    }

    public static async encrypt(message: ICoreBuffer, stream: CryptoStreamAddress): Promise<CoreBuffer> {
        throw new CryptoError(CryptoErrorCode.NotYetImplemented);
    }

    public static async decrypt(cipher: ICoreBuffer, stream: CryptoStreamAddress): Promise<CoreBuffer> {
        throw new CryptoError(CryptoErrorCode.NotYetImplemented);
    }

    protected static async getState(address: number): Promise<CoreBuffer> {
        throw new CryptoError(CryptoErrorCode.NotYetImplemented);
    }

    protected static async setState(address: number, state: CoreBuffer): Promise<void> {
        throw new CryptoError(CryptoErrorCode.NotYetImplemented);
    }
}
