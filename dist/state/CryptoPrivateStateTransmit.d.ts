import { CoreBuffer } from "../CoreBuffer";
import { CryptoCipher } from "../encryption/CryptoCipher";
import { CryptoEncryptionAlgorithm } from "../encryption/CryptoEncryption";
import { CryptoPrivateState, ICryptoPrivateState, ICryptoPrivateStateSerialized } from "./CryptoPrivateState";
export declare class CryptoPrivateStateTransmit extends CryptoPrivateState {
    toJSON(): ICryptoPrivateStateSerialized;
    encrypt(plaintext: CoreBuffer): Promise<CryptoCipher>;
    decrypt(cipher: CryptoCipher): Promise<CoreBuffer>;
    static generate(secretKey?: CoreBuffer, id?: string, algorithm?: CryptoEncryptionAlgorithm): CryptoPrivateStateTransmit;
    static from(obj: CryptoPrivateState | ICryptoPrivateState): CryptoPrivateStateTransmit;
    protected static preFrom(value: any): any;
    static fromJSON(value: ICryptoPrivateStateSerialized): CryptoPrivateStateTransmit;
}
