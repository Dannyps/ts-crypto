import { ICoreBuffer } from "./CoreBuffer";
import { CryptoEncryptionAlgorithm } from "./encryption/CryptoEncryption";
import { CryptoSecretKey } from "./encryption/CryptoSecretKey";
/**
 * The key derivation algorithm to use
 */
export declare const enum CryptoDerivationAlgorithm {
    PBKDF2 = "pbkdf2"
}
export interface ICryptoDerivation {
}
export interface ICryptoDerivationStatic {
    new (): ICryptoDerivation;
    deriveKeyFromMaster(masterKey: ICoreBuffer, iterations: number, keyAlgorithm: CryptoEncryptionAlgorithm, salt?: ICoreBuffer): Promise<CryptoSecretKey>;
    deriveKeyFromBase(baseKey: ICoreBuffer, keyId: number, context: string, keyAlgorithm: CryptoEncryptionAlgorithm): Promise<CryptoSecretKey>;
}
export declare class CryptoDerivation implements ICryptoDerivation {
    static deriveKeyFromMaster(masterKey: ICoreBuffer, iterations: number, keyAlgorithm: CryptoEncryptionAlgorithm, salt?: ICoreBuffer): Promise<CryptoSecretKey>;
    static deriveKeyFromBase(baseKey: ICoreBuffer, keyId: number, context: string, keyAlgorithm?: CryptoEncryptionAlgorithm): Promise<CryptoSecretKey>;
}
