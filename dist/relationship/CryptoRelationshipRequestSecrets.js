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
var CryptoRelationshipRequestSecrets_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoRelationshipRequestSecrets = void 0;
const ts_serval_1 = require("@js-soft/ts-serval");
const CoreBuffer_1 = require("../CoreBuffer");
const CryptoDerivation_1 = require("../CryptoDerivation");
const CryptoSerializable_1 = require("../CryptoSerializable");
const CryptoEncryption_1 = require("../encryption/CryptoEncryption");
const CryptoSecretKey_1 = require("../encryption/CryptoSecretKey");
const CryptoExchange_1 = require("../exchange/CryptoExchange");
const CryptoExchangeKeypair_1 = require("../exchange/CryptoExchangeKeypair");
const CryptoExchangePublicKey_1 = require("../exchange/CryptoExchangePublicKey");
const CryptoRandom_1 = require("../random/CryptoRandom");
const CryptoSignatureKeypair_1 = require("../signature/CryptoSignatureKeypair");
const CryptoSignaturePublicKey_1 = require("../signature/CryptoSignaturePublicKey");
const CryptoSignatures_1 = require("../signature/CryptoSignatures");
const CryptoRelationshipPublicRequest_1 = require("./CryptoRelationshipPublicRequest");
let CryptoRelationshipRequestSecrets = CryptoRelationshipRequestSecrets_1 = class CryptoRelationshipRequestSecrets extends CryptoSerializable_1.CryptoSerializable {
    static from(value) {
        return this.fromAny(value);
    }
    async sign(content, algorithm = 1 /* CryptoHashAlgorithm.SHA256 */) {
        return await CryptoSignatures_1.CryptoSignatures.sign(content, this.signatureKeypair.privateKey, algorithm);
    }
    async verifyOwn(content, signature) {
        return await CryptoSignatures_1.CryptoSignatures.verify(content, signature, this.signatureKeypair.publicKey);
    }
    async verifyPeerIdentity(content, signature) {
        return await CryptoSignatures_1.CryptoSignatures.verify(content, signature, this.peerIdentityKey);
    }
    async encryptRequest(content) {
        return await CryptoEncryption_1.CryptoEncryption.encrypt(content, this.secretKey);
    }
    async decryptRequest(cipher) {
        return await CryptoEncryption_1.CryptoEncryption.decrypt(cipher, this.secretKey);
    }
    toPublicRequest() {
        return CryptoRelationshipPublicRequest_1.CryptoRelationshipPublicRequest.from({
            id: this.id,
            exchangeKey: this.exchangeKeypair.publicKey,
            signatureKey: this.signatureKeypair.publicKey,
            ephemeralKey: this.ephemeralKeypair.publicKey,
            nonce: this.nonce
        });
    }
    static async fromPeer(peerExchangeKey, peerIdentityKey) {
        const [exchangeKeypair, ephemeralKeypair, signatureKeypair, nonce] = await Promise.all([
            CryptoExchange_1.CryptoExchange.generateKeypair(),
            CryptoExchange_1.CryptoExchange.generateKeypair(),
            CryptoSignatures_1.CryptoSignatures.generateKeypair(),
            CryptoRandom_1.CryptoRandom.bytes(24)
        ]);
        const masterKey = await CryptoExchange_1.CryptoExchange.deriveRequestor(ephemeralKeypair, peerExchangeKey);
        const secretKey = await CryptoDerivation_1.CryptoDerivation.deriveKeyFromBase(masterKey.transmissionKey, 1, "REQTMP01");
        return CryptoRelationshipRequestSecrets_1.from({
            exchangeKeypair: exchangeKeypair,
            ephemeralKeypair: ephemeralKeypair,
            signatureKeypair: signatureKeypair,
            peerExchangeKey: peerExchangeKey,
            peerIdentityKey: peerIdentityKey,
            secretKey: secretKey,
            nonce: nonce
        });
    }
};
exports.CryptoRelationshipRequestSecrets = CryptoRelationshipRequestSecrets;
__decorate([
    (0, ts_serval_1.validate)({ nullable: true }),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", String)
], CryptoRelationshipRequestSecrets.prototype, "id", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)({ alias: "exc" }),
    __metadata("design:type", CryptoExchangeKeypair_1.CryptoExchangeKeypair)
], CryptoRelationshipRequestSecrets.prototype, "exchangeKeypair", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)({ alias: "eph" }),
    __metadata("design:type", CryptoExchangeKeypair_1.CryptoExchangeKeypair)
], CryptoRelationshipRequestSecrets.prototype, "ephemeralKeypair", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)({ alias: "sig" }),
    __metadata("design:type", CryptoSignatureKeypair_1.CryptoSignatureKeypair)
], CryptoRelationshipRequestSecrets.prototype, "signatureKeypair", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)({ alias: "pik" }),
    __metadata("design:type", CryptoSignaturePublicKey_1.CryptoSignaturePublicKey)
], CryptoRelationshipRequestSecrets.prototype, "peerIdentityKey", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)({ alias: "pxk" }),
    __metadata("design:type", CryptoExchangePublicKey_1.CryptoExchangePublicKey)
], CryptoRelationshipRequestSecrets.prototype, "peerExchangeKey", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)({ alias: "key" }),
    __metadata("design:type", CryptoSecretKey_1.CryptoSecretKey)
], CryptoRelationshipRequestSecrets.prototype, "secretKey", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)({ alias: "nnc" }),
    __metadata("design:type", CoreBuffer_1.CoreBuffer)
], CryptoRelationshipRequestSecrets.prototype, "nonce", void 0);
exports.CryptoRelationshipRequestSecrets = CryptoRelationshipRequestSecrets = CryptoRelationshipRequestSecrets_1 = __decorate([
    (0, ts_serval_1.type)("CryptoRelationshipRequestSecrets")
], CryptoRelationshipRequestSecrets);
//# sourceMappingURL=CryptoRelationshipRequestSecrets.js.map