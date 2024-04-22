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
exports.CryptoSignatureKeypair = void 0;
const ts_serval_1 = require("@js-soft/ts-serval");
const CoreBuffer_1 = require("../CoreBuffer");
const CryptoError_1 = require("../CryptoError");
const CryptoErrorCode_1 = require("../CryptoErrorCode");
const CryptoSerializable_1 = require("../CryptoSerializable");
const CryptoSignaturePrivateKey_1 = require("./CryptoSignaturePrivateKey");
const CryptoSignaturePublicKey_1 = require("./CryptoSignaturePublicKey");
let CryptoSignatureKeypair = class CryptoSignatureKeypair extends CryptoSerializable_1.CryptoSerializable {
    toJSON(verbose = true) {
        return {
            pub: this.publicKey.toJSON(false),
            prv: this.privateKey.toJSON(false),
            "@type": verbose ? "CryptoSignatureKeypair" : undefined
        };
    }
    clear() {
        this.publicKey.clear();
        this.privateKey.clear();
    }
    static from(value) {
        return this.fromAny(value);
    }
    static preFrom(value) {
        if (value.pub) {
            value = {
                publicKey: value.pub,
                privateKey: value.prv
            };
        }
        if (value.privateKey.algorithm !== value.publicKey.algorithm) {
            throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.SignatureWrongAlgorithm, "Algorithms of private and public key do not match.");
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
exports.CryptoSignatureKeypair = CryptoSignatureKeypair;
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", CryptoSignaturePublicKey_1.CryptoSignaturePublicKey)
], CryptoSignatureKeypair.prototype, "publicKey", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", CryptoSignaturePrivateKey_1.CryptoSignaturePrivateKey)
], CryptoSignatureKeypair.prototype, "privateKey", void 0);
exports.CryptoSignatureKeypair = CryptoSignatureKeypair = __decorate([
    (0, ts_serval_1.type)("CryptoSignatureKeypair")
], CryptoSignatureKeypair);
//# sourceMappingURL=CryptoSignatureKeypair.js.map