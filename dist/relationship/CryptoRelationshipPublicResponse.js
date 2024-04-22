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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoRelationshipPublicResponse = void 0;
const ts_serval_1 = require("@js-soft/ts-serval");
const CoreBuffer_1 = require("../CoreBuffer");
const CryptoSerializable_1 = require("../CryptoSerializable");
const CryptoExchangePublicKey_1 = require("../exchange/CryptoExchangePublicKey");
const CryptoSignaturePublicKey_1 = require("../signature/CryptoSignaturePublicKey");
const CryptoSignatures_1 = require("../signature/CryptoSignatures");
const CryptoPublicState_1 = require("../state/CryptoPublicState");
let CryptoRelationshipPublicResponse = class CryptoRelationshipPublicResponse extends CryptoSerializable_1.CryptoSerializable {
    toJSON(verbose = true) {
        return {
            exc: this.exchangeKey.toJSON(false),
            sig: this.signatureKey.toJSON(false),
            sta: this.state.toJSON(false),
            id: this.id,
            "@type": verbose ? "CryptoRelationshipPublicResponse" : undefined
        };
    }
    clear() {
        this.exchangeKey.clear();
        this.signatureKey.clear();
        this.state.clear();
    }
    async verify(content, signature) {
        return await CryptoSignatures_1.CryptoSignatures.verify(content, signature, this.signatureKey);
    }
    static from(value) {
        return this.fromAny(value);
    }
    static preFrom(value) {
        if (value.exc) {
            value = {
                exchangeKey: value.exc,
                signatureKey: value.sig,
                state: value.sta,
                id: value.id
            };
        }
        return value;
    }
    static fromJSON(value) {
        return this.fromAny(value);
    }
    static fromBase64(value) {
        return this.deserialize(CoreBuffer_1.CoreBuffer.base64_utf8(value));
    }
};
exports.CryptoRelationshipPublicResponse = CryptoRelationshipPublicResponse;
__decorate([
    (0, ts_serval_1.validate)({ nullable: true }),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", String)
], CryptoRelationshipPublicResponse.prototype, "id", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", CryptoSignaturePublicKey_1.CryptoSignaturePublicKey)
], CryptoRelationshipPublicResponse.prototype, "signatureKey", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", CryptoExchangePublicKey_1.CryptoExchangePublicKey)
], CryptoRelationshipPublicResponse.prototype, "exchangeKey", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", CryptoPublicState_1.CryptoPublicState)
], CryptoRelationshipPublicResponse.prototype, "state", void 0);
exports.CryptoRelationshipPublicResponse = CryptoRelationshipPublicResponse = __decorate([
    (0, ts_serval_1.type)("CryptoRelationshipPublicResponse")
], CryptoRelationshipPublicResponse);
//# sourceMappingURL=CryptoRelationshipPublicResponse.js.map