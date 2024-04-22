import { ISerializable, ISerialized } from "@js-soft/ts-serval";
import { CoreBuffer, IClearable } from "../CoreBuffer";
import { CryptoSerializable } from "../CryptoSerializable";
import { CryptoExchangePublicKey, ICryptoExchangePublicKey, ICryptoExchangePublicKeySerialized } from "../exchange/CryptoExchangePublicKey";
import { CryptoSignature } from "../signature/CryptoSignature";
import { CryptoSignaturePublicKey, ICryptoSignaturePublicKey, ICryptoSignaturePublicKeySerialized } from "../signature/CryptoSignaturePublicKey";
import { CryptoPublicState, ICryptoPublicState, ICryptoPublicStateSerialized } from "../state/CryptoPublicState";
export interface ICryptoRelationshipPublicResponseSerialized extends ISerialized {
    id?: string;
    exc: ICryptoExchangePublicKeySerialized;
    sig: ICryptoSignaturePublicKeySerialized;
    sta: ICryptoPublicStateSerialized;
}
export interface ICryptoRelationshipPublicResponse extends ISerializable {
    id?: string;
    exchangeKey: ICryptoExchangePublicKey;
    signatureKey: ICryptoSignaturePublicKey;
    state: ICryptoPublicState;
}
export declare class CryptoRelationshipPublicResponse extends CryptoSerializable implements ICryptoRelationshipPublicResponse, IClearable {
    id?: string;
    signatureKey: CryptoSignaturePublicKey;
    exchangeKey: CryptoExchangePublicKey;
    state: CryptoPublicState;
    toJSON(verbose?: boolean): ICryptoRelationshipPublicResponseSerialized;
    clear(): void;
    verify(content: CoreBuffer, signature: CryptoSignature): Promise<boolean>;
    static from(value: CryptoRelationshipPublicResponse | ICryptoRelationshipPublicResponse): CryptoRelationshipPublicResponse;
    protected static preFrom(value: any): any;
    static fromJSON(value: ICryptoRelationshipPublicResponseSerialized): CryptoRelationshipPublicResponse;
    static fromBase64(value: string): CryptoRelationshipPublicResponse;
}
