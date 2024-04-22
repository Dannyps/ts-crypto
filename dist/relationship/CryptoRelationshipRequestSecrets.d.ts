import { ISerializable } from "@js-soft/ts-serval";
import { CoreBuffer, ICoreBuffer } from "../CoreBuffer";
import { CryptoSerializable } from "../CryptoSerializable";
import { CryptoCipher } from "../encryption/CryptoCipher";
import { CryptoSecretKey, ICryptoSecretKey } from "../encryption/CryptoSecretKey";
import { CryptoExchangeKeypair, ICryptoExchangeKeypair } from "../exchange/CryptoExchangeKeypair";
import { CryptoExchangePublicKey, ICryptoExchangePublicKey } from "../exchange/CryptoExchangePublicKey";
import { CryptoHashAlgorithm } from "../hash/CryptoHash";
import { CryptoSignature } from "../signature/CryptoSignature";
import { CryptoSignatureKeypair, ICryptoSignatureKeypair } from "../signature/CryptoSignatureKeypair";
import { CryptoSignaturePublicKey, ICryptoSignaturePublicKey } from "../signature/CryptoSignaturePublicKey";
import { CryptoRelationshipPublicRequest } from "./CryptoRelationshipPublicRequest";
export interface ICryptoRelationshipRequestSecrets extends ISerializable {
    id?: string;
    exchangeKeypair: ICryptoExchangeKeypair;
    signatureKeypair: ICryptoSignatureKeypair;
    ephemeralKeypair: ICryptoExchangeKeypair;
    peerIdentityKey: ICryptoSignaturePublicKey;
    peerExchangeKey: ICryptoExchangePublicKey;
    secretKey: ICryptoSecretKey;
    nonce: ICoreBuffer;
}
export declare class CryptoRelationshipRequestSecrets extends CryptoSerializable implements ICryptoRelationshipRequestSecrets {
    id?: string;
    exchangeKeypair: CryptoExchangeKeypair;
    ephemeralKeypair: CryptoExchangeKeypair;
    signatureKeypair: CryptoSignatureKeypair;
    peerIdentityKey: CryptoSignaturePublicKey;
    peerExchangeKey: CryptoExchangePublicKey;
    secretKey: CryptoSecretKey;
    nonce: CoreBuffer;
    static from(value: ICryptoRelationshipRequestSecrets): CryptoRelationshipRequestSecrets;
    sign(content: CoreBuffer, algorithm?: CryptoHashAlgorithm): Promise<CryptoSignature>;
    verifyOwn(content: CoreBuffer, signature: CryptoSignature): Promise<boolean>;
    verifyPeerIdentity(content: CoreBuffer, signature: CryptoSignature): Promise<boolean>;
    encryptRequest(content: CoreBuffer): Promise<CryptoCipher>;
    decryptRequest(cipher: CryptoCipher): Promise<CoreBuffer>;
    toPublicRequest(): CryptoRelationshipPublicRequest;
    static fromPeer(peerExchangeKey: CryptoExchangePublicKey, peerIdentityKey: CryptoSignaturePublicKey): Promise<CryptoRelationshipRequestSecrets>;
}
