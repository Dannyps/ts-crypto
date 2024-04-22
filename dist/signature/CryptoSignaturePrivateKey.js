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
exports.CryptoSignaturePrivateKey = void 0;
const ts_serval_1 = require("@js-soft/ts-serval");
const CoreBuffer_1 = require("../CoreBuffer");
const CryptoPrivateKey_1 = require("../CryptoPrivateKey");
const CryptoSignatures_1 = require("./CryptoSignatures");
const CryptoSignatureValidation_1 = require("./CryptoSignatureValidation");
let CryptoSignaturePrivateKey = class CryptoSignaturePrivateKey extends CryptoPrivateKey_1.CryptoPrivateKey {
    toJSON(verbose = true) {
        return {
            prv: this.privateKey.toBase64URL(),
            alg: this.algorithm,
            id: this.id,
            "@type": verbose ? "CryptoSignaturePrivateKey" : undefined
        };
    }
    clear() {
        this.privateKey.clear();
    }
    toBase64(verbose = true) {
        return CoreBuffer_1.CoreBuffer.utf8_base64(this.serialize(verbose));
    }
    async toPublicKey() {
        return await CryptoSignatures_1.CryptoSignatures.privateKeyToPublicKey(this);
    }
    static from(value) {
        return this.fromAny(value);
    }
    static preFrom(value) {
        if (value.prv) {
            value = {
                algorithm: value.alg,
                privateKey: value.prv,
                id: value.id
            };
        }
        CryptoSignatureValidation_1.CryptoSignatureValidation.checkSignatureAlgorithm(value.algorithm);
        CryptoSignatureValidation_1.CryptoSignatureValidation.checkSignaturePrivateKey(value.privateKey, "privateKey");
        return value;
    }
    static fromJSON(value) {
        return this.fromAny(value);
    }
    static fromBase64(value) {
        return this.deserialize(CoreBuffer_1.CoreBuffer.base64_utf8(value));
    }
};
exports.CryptoSignaturePrivateKey = CryptoSignaturePrivateKey;
__decorate([
    (0, ts_serval_1.validate)({ nullable: true }),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", String)
], CryptoSignaturePrivateKey.prototype, "id", void 0);
exports.CryptoSignaturePrivateKey = CryptoSignaturePrivateKey = __decorate([
    (0, ts_serval_1.type)("CryptoSignaturePrivateKey")
], CryptoSignaturePrivateKey);
//# sourceMappingURL=CryptoSignaturePrivateKey.js.map