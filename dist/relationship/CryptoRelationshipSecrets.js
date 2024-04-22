"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CryptoRelationshipSecrets_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoRelationshipSecrets = void 0;
const ts_serval_1 = require("@js-soft/ts-serval");
const CryptoDerivation_1 = require("../CryptoDerivation");
const CryptoError_1 = require("../CryptoError");
const CryptoErrorCode_1 = require("../CryptoErrorCode");
const CryptoSerializable_1 = require("../CryptoSerializable");
const CryptoEncryption_1 = require("../encryption/CryptoEncryption");
const CryptoSecretKey_1 = require("../encryption/CryptoSecretKey");
const CryptoExchange_1 = require("../exchange/CryptoExchange");
const CryptoExchangeKeypair_1 = require("../exchange/CryptoExchangeKeypair");
const CryptoExchangePublicKey_1 = require("../exchange/CryptoExchangePublicKey");
const CryptoSignatureKeypair_1 = require("../signature/CryptoSignatureKeypair");
const CryptoSignaturePublicKey_1 = require("../signature/CryptoSignaturePublicKey");
const CryptoSignatures_1 = require("../signature/CryptoSignatures");
const CryptoPrivateStateReceive_1 = require("../state/CryptoPrivateStateReceive");
const CryptoPrivateStateTransmit_1 = require("../state/CryptoPrivateStateTransmit");
const CryptoStateType_1 = require("../state/CryptoStateType");
const CryptoRelationshipPublicResponse_1 = require("./CryptoRelationshipPublicResponse");
const CryptoRelationshipType_1 = require("./CryptoRelationshipType");
let CryptoRelationshipSecrets = CryptoRelationshipSecrets_1 = class CryptoRelationshipSecrets extends CryptoSerializable_1.CryptoSerializable {
    static from(value) {
        return this.fromAny(value);
    }
    async sign(content, algorithm = 1 /* CryptoHashAlgorithm.SHA256 */) {
        return await CryptoSignatures_1.CryptoSignatures.sign(content, this.signatureKeypair.privateKey, algorithm);
    }
    async verifyOwn(content, signature) {
        return await CryptoSignatures_1.CryptoSignatures.verify(content, signature, this.signatureKeypair.publicKey);
    }
    async verifyPeer(content, signature) {
        return await CryptoSignatures_1.CryptoSignatures.verify(content, signature, this.peerSignatureKey);
    }
    async verifyPeerIdentity(content, signature) {
        if (!this.peerIdentityKey) {
            throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.RelationshipNoPeer, "The peer of this relationship is not set. You have to initialize this relationship with a peer first.");
        }
        return await CryptoSignatures_1.CryptoSignatures.verify(content, signature, this.peerIdentityKey);
    }
    async encrypt(content) {
        return await this.transmitState.encrypt(content);
    }
    async decryptOwn(cipher) {
        return await this.transmitState.decrypt(cipher);
    }
    async decryptPeer(cipher, omitCounterCheck = false) {
        return await this.receiveState.decrypt(cipher, omitCounterCheck);
    }
    async decryptRequest(cipher) {
        return await CryptoEncryption_1.CryptoEncryption.decrypt(cipher, this.requestSecretKey);
    }
    toPublicResponse() {
        return CryptoRelationshipPublicResponse_1.CryptoRelationshipPublicResponse.from({
            exchangeKey: this.exchangeKeypair.publicKey,
            signatureKey: this.signatureKeypair.publicKey,
            state: this.transmitState.toPublicState()
        });
    }
    static async fromRelationshipResponse(response, request) {
        const signatureKeypair = request.signatureKeypair;
        const exchangeKeypair = request.exchangeKeypair;
        const requestSecretKey = request.secretKey;
        const peerExchangeKey = response.exchangeKey;
        const peerPublicTransmitState = response.state;
        const peerSignatureKey = response.signatureKey;
        const peerIdentityKey = request.peerIdentityKey;
        const peerTemplateKey = request.peerExchangeKey;
        const derivedKey = await CryptoExchange_1.CryptoExchange.deriveRequestor(exchangeKeypair, peerExchangeKey);
        const ownType = CryptoRelationshipType_1.CryptoRelationshipType.Requestor;
        const [derivedTx, derivedRx] = await Promise.all([
            CryptoDerivation_1.CryptoDerivation.deriveKeyFromBase(derivedKey.transmissionKey, 1, "RELREQ01"),
            CryptoDerivation_1.CryptoDerivation.deriveKeyFromBase(derivedKey.receivingKey, 1, "RELTEM01")
        ]);
        const [receiveState, transmitState] = await Promise.all([
            CryptoPrivateStateReceive_1.CryptoPrivateStateReceive.fromPublicState(peerPublicTransmitState, derivedRx.secretKey, 0),
            CryptoPrivateStateTransmit_1.CryptoPrivateStateTransmit.from({
                algorithm: 3 /* CryptoEncryptionAlgorithm.XCHACHA20_POLY1305 */,
                counter: 0,
                nonce: request.nonce,
                secretKey: derivedTx.secretKey,
                stateType: CryptoStateType_1.CryptoStateType.Transmit
            })
        ]);
        return CryptoRelationshipSecrets_1.from({
            exchangeKeypair: exchangeKeypair,
            signatureKeypair: signatureKeypair,
            receiveState: receiveState,
            transmitState: transmitState,
            type: ownType,
            peerExchangeKey: peerExchangeKey,
            peerSignatureKey: peerSignatureKey,
            peerTemplateKey: peerTemplateKey,
            peerIdentityKey: peerIdentityKey,
            requestSecretKey: requestSecretKey
        });
    }
    static async fromRelationshipRequest(request, templateExchangeKeypair) {
        return await CryptoRelationshipSecrets_1.fromPeerNonce(request.exchangeKey, request.ephemeralKey, request.signatureKey, request.nonce, templateExchangeKeypair, undefined, CryptoRelationshipType_1.CryptoRelationshipType.Requestor);
    }
    static async fromPeerNonce(peerExchangeKey, peerTemplateKey, peerSignatureKey, peerGeneratedNonce, templateExchangeKeypair, peerIdentityKey, peerType = CryptoRelationshipType_1.CryptoRelationshipType.Requestor) {
        const [signatureKeypair, exchangeKeypair] = await Promise.all([
            CryptoSignatures_1.CryptoSignatures.generateKeypair(),
            CryptoExchange_1.CryptoExchange.generateKeypair()
        ]);
        let derivedKey;
        let ownType;
        switch (peerType) {
            case CryptoRelationshipType_1.CryptoRelationshipType.Requestor:
                derivedKey = await CryptoExchange_1.CryptoExchange.deriveTemplator(exchangeKeypair, peerExchangeKey);
                ownType = CryptoRelationshipType_1.CryptoRelationshipType.Templator;
                break;
            case CryptoRelationshipType_1.CryptoRelationshipType.Templator:
                derivedKey = await CryptoExchange_1.CryptoExchange.deriveRequestor(exchangeKeypair, peerExchangeKey);
                ownType = CryptoRelationshipType_1.CryptoRelationshipType.Requestor;
                break;
            default:
                throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.RelationshipNoRequestorNorTemplator);
        }
        const [derivedTx, derivedRx] = await Promise.all([
            CryptoDerivation_1.CryptoDerivation.deriveKeyFromBase(derivedKey.transmissionKey, 1, "RELTEM01"),
            CryptoDerivation_1.CryptoDerivation.deriveKeyFromBase(derivedKey.receivingKey, 1, "RELREQ01")
        ]);
        const [receiveState, transmitState] = await Promise.all([
            CryptoPrivateStateReceive_1.CryptoPrivateStateReceive.fromNonce(peerGeneratedNonce, derivedRx.secretKey),
            CryptoPrivateStateTransmit_1.CryptoPrivateStateTransmit.generate(derivedTx.secretKey)
        ]);
        const masterKey = await CryptoExchange_1.CryptoExchange.deriveTemplator(templateExchangeKeypair, peerTemplateKey);
        const secretKey = await CryptoDerivation_1.CryptoDerivation.deriveKeyFromBase(masterKey.receivingKey, 1, "REQTMP01");
        return CryptoRelationshipSecrets_1.from({
            exchangeKeypair: exchangeKeypair,
            signatureKeypair: signatureKeypair,
            receiveState: receiveState,
            transmitState: transmitState,
            type: ownType,
            peerExchangeKey: peerExchangeKey,
            peerSignatureKey: peerSignatureKey,
            peerTemplateKey: peerTemplateKey,
            peerIdentityKey: peerIdentityKey,
            requestSecretKey: secretKey
        });
    }
};
exports.CryptoRelationshipSecrets = CryptoRelationshipSecrets;
__decorate([
    (0, ts_serval_1.validate)({ nullable: true }),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", String)
], CryptoRelationshipSecrets.prototype, "id", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)({ alias: "typ" }),
    __metadata("design:type", Number)
], CryptoRelationshipSecrets.prototype, "type", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)({ alias: "exc" }),
    __metadata("design:type", CryptoExchangeKeypair_1.CryptoExchangeKeypair)
], CryptoRelationshipSecrets.prototype, "exchangeKeypair", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)({ alias: "sig" }),
    __metadata("design:type", CryptoSignatureKeypair_1.CryptoSignatureKeypair)
], CryptoRelationshipSecrets.prototype, "signatureKeypair", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)({ alias: "tx" }),
    __metadata("design:type", CryptoPrivateStateTransmit_1.CryptoPrivateStateTransmit)
], CryptoRelationshipSecrets.prototype, "transmitState", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)({ alias: "rx" }),
    __metadata("design:type", CryptoPrivateStateReceive_1.CryptoPrivateStateReceive)
], CryptoRelationshipSecrets.prototype, "receiveState", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)({ alias: "pxk" }),
    __metadata("design:type", CryptoExchangePublicKey_1.CryptoExchangePublicKey)
], CryptoRelationshipSecrets.prototype, "peerExchangeKey", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)({ alias: "psk" }),
    __metadata("design:type", CryptoSignaturePublicKey_1.CryptoSignaturePublicKey)
], CryptoRelationshipSecrets.prototype, "peerSignatureKey", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)({ alias: "ptk" }),
    __metadata("design:type", CryptoExchangePublicKey_1.CryptoExchangePublicKey)
], CryptoRelationshipSecrets.prototype, "peerTemplateKey", void 0);
__decorate([
    (0, ts_serval_1.validate)({ nullable: true }),
    (0, ts_serval_1.serialize)({ alias: "pik" }),
    __metadata("design:type", CryptoSignaturePublicKey_1.CryptoSignaturePublicKey)
], CryptoRelationshipSecrets.prototype, "peerIdentityKey", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)({ alias: "rsk" }),
    __metadata("design:type", CryptoSecretKey_1.CryptoSecretKey)
], CryptoRelationshipSecrets.prototype, "requestSecretKey", void 0);
exports.CryptoRelationshipSecrets = CryptoRelationshipSecrets = CryptoRelationshipSecrets_1 = __decorate([
    (0, ts_serval_1.type)("CryptoRelationshipSecrets")
], CryptoRelationshipSecrets);
//# sourceMappingURL=CryptoRelationshipSecrets.js.map