import { CoreBuffer } from "../CoreBuffer";
import { CryptoHashAlgorithm } from "../hash/CryptoHash";
import { CryptoSignature } from "./CryptoSignature";
import { CryptoSignatureAlgorithm } from "./CryptoSignatureAlgorithm";
import { CryptoSignatureKeypair } from "./CryptoSignatureKeypair";
import { CryptoSignaturePrivateKey } from "./CryptoSignaturePrivateKey";
import { CryptoSignaturePublicKey } from "./CryptoSignaturePublicKey";
export declare class CryptoSignatures {
    static privateKeyToPublicKey(privateKey: CryptoSignaturePrivateKey): Promise<CryptoSignaturePublicKey>;
    /**
     * Generates a keypair for the specified elliptic algorithm
     * @param algorithm
     */
    static generateKeypair(algorithm?: CryptoSignatureAlgorithm): Promise<CryptoSignatureKeypair>;
    static sign(content: CoreBuffer, privateKey: CryptoSignaturePrivateKey | CoreBuffer, algorithm?: CryptoHashAlgorithm, keyId?: string, id?: string): Promise<CryptoSignature>;
    static verify(content: CoreBuffer, signature: CryptoSignature, publicKey: CryptoSignaturePublicKey | CoreBuffer): Promise<boolean>;
    private static getArrayOfPublicKey;
}
