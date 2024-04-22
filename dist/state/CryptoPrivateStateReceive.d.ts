import { CoreBuffer } from "../CoreBuffer";
import { CryptoCipher } from "../encryption/CryptoCipher";
import { CryptoPrivateState, ICryptoPrivateState, ICryptoPrivateStateSerialized } from "./CryptoPrivateState";
import { CryptoPublicState } from "./CryptoPublicState";
export declare class CryptoPrivateStateReceive extends CryptoPrivateState {
    toJSON(): ICryptoPrivateStateSerialized;
    decrypt(cipher: CryptoCipher, omitCounterCheck?: boolean): Promise<CoreBuffer>;
    static fromNonce(nonce: CoreBuffer, secretKey: CoreBuffer, counter?: number): CryptoPrivateStateReceive;
    static fromPublicState(publicState: CryptoPublicState, secretKey: CoreBuffer, counter?: number): CryptoPrivateStateReceive;
    protected static preFrom(value: any): any;
    static from(obj: CryptoPrivateState | ICryptoPrivateState): CryptoPrivateStateReceive;
    static fromJSON(value: ICryptoPrivateStateSerialized): CryptoPrivateStateReceive;
}
