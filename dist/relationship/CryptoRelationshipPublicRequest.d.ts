import { ISerializable, ISerialized } from "@js-soft/ts-serval";
import { CoreBuffer, IClearable, ICoreBuffer } from "../CoreBuffer";
import { CryptoSerializable } from "../CryptoSerializable";
import { CryptoExchangePublicKey, ICryptoExchangePublicKey, ICryptoExchangePublicKeySerialized } from "../exchange/CryptoExchangePublicKey";
import { CryptoSignaturePublicKey, ICryptoSignaturePublicKey, ICryptoSignaturePublicKeySerialized } from "../signature/CryptoSignaturePublicKey";
export interface ICryptoRelationshipPublicRequestSerialized extends ISerialized {
    id?: string;
    exc: ICryptoExchangePublicKeySerialized;
    sig: ICryptoSignaturePublicKeySerialized;
    eph: ICryptoExchangePublicKeySerialized;
    nnc: string;
}
export interface ICryptoRelationshipPublicRequest extends ISerializable {
    id?: string;
    exchangeKey: ICryptoExchangePublicKey;
    signatureKey: ICryptoSignaturePublicKey;
    ephemeralKey: ICryptoExchangePublicKey;
    nonce: ICoreBuffer;
}
export declare class CryptoRelationshipPublicRequest extends CryptoSerializable implements ICryptoRelationshipPublicRequest, IClearable {
    id?: string;
    signatureKey: CryptoSignaturePublicKey;
    exchangeKey: CryptoExchangePublicKey;
    ephemeralKey: CryptoExchangePublicKey;
    nonce: CoreBuffer;
    toJSON(verbose?: boolean): ICryptoRelationshipPublicRequestSerialized;
    clear(): void;
    static from(value: CryptoRelationshipPublicRequest | ICryptoRelationshipPublicRequest): CryptoRelationshipPublicRequest;
    protected static preFrom(value: any): any;
    static fromJSON(value: ICryptoRelationshipPublicRequestSerialized): CryptoRelationshipPublicRequest;
    static fromBase64(value: string): CryptoRelationshipPublicRequest;
}
