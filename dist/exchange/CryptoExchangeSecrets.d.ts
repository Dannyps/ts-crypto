import { ISerializable, ISerialized } from "@js-soft/ts-serval";
import { CoreBuffer, IClearable, ICoreBuffer } from "../CoreBuffer";
import { CryptoSerializable } from "../CryptoSerializable";
import { CryptoEncryptionAlgorithm } from "../encryption/CryptoEncryption";
export interface ICryptoExchangeSecretsSerialized extends ISerialized {
    alg: CryptoEncryptionAlgorithm;
    rx: string;
    tx: string;
}
export interface ICryptoExchangeSecrets extends ISerializable {
    algorithm: CryptoEncryptionAlgorithm;
    receivingKey: ICoreBuffer;
    transmissionKey: ICoreBuffer;
}
export declare class CryptoExchangeSecrets extends CryptoSerializable implements ICryptoExchangeSecrets, IClearable {
    algorithm: CryptoEncryptionAlgorithm;
    receivingKey: CoreBuffer;
    transmissionKey: CoreBuffer;
    toJSON(verbose?: boolean): ICryptoExchangeSecretsSerialized;
    clear(): void;
    serialize(verbose?: boolean): string;
    toBase64(verbose?: boolean): string;
    static from(value: CryptoExchangeSecrets | ICryptoExchangeSecrets): CryptoExchangeSecrets;
    static preFrom(value: any): any;
    static fromJSON(value: ICryptoExchangeSecretsSerialized): CryptoExchangeSecrets;
    static fromBase64(value: string): Promise<CryptoExchangeSecrets>;
}
