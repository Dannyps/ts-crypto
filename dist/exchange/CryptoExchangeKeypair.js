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
exports.CryptoExchangeKeypair = void 0;
const ts_serval_1 = require("@js-soft/ts-serval");
const CoreBuffer_1 = require("../CoreBuffer");
const CryptoError_1 = require("../CryptoError");
const CryptoErrorCode_1 = require("../CryptoErrorCode");
const CryptoSerializable_1 = require("../CryptoSerializable");
const CryptoExchangePrivateKey_1 = require("./CryptoExchangePrivateKey");
const CryptoExchangePublicKey_1 = require("./CryptoExchangePublicKey");
let CryptoExchangeKeypair = class CryptoExchangeKeypair extends CryptoSerializable_1.CryptoSerializable {
    toJSON(verbose = true) {
        const obj = {
            pub: this.publicKey.toJSON(false),
            prv: this.privateKey.toJSON(false)
        };
        if (verbose) {
            obj["@type"] = "CryptoExchangeKeypair";
        }
        return obj;
    }
    clear() {
        this.publicKey.clear();
        this.privateKey.clear();
    }
    static preFrom(value) {
        if (value.pub) {
            value = {
                publicKey: value.pub,
                privateKey: value.prv
            };
        }
        if (value.privateKey.algorithm !== value.publicKey.algorithm) {
            throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.ExchangeWrongAlgorithm, "Algorithms of private and public key do not match.");
        }
        return value;
    }
    static from(value) {
        return this.fromAny(value);
    }
    static fromJSON(value) {
        return this.fromAny(value);
    }
    static fromBase64(value) {
        return this.deserialize(CoreBuffer_1.CoreBuffer.base64_utf8(value));
    }
};
exports.CryptoExchangeKeypair = CryptoExchangeKeypair;
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", CryptoExchangePublicKey_1.CryptoExchangePublicKey)
], CryptoExchangeKeypair.prototype, "publicKey", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", CryptoExchangePrivateKey_1.CryptoExchangePrivateKey)
], CryptoExchangeKeypair.prototype, "privateKey", void 0);
exports.CryptoExchangeKeypair = CryptoExchangeKeypair = __decorate([
    (0, ts_serval_1.type)("CryptoExchangeKeypair")
], CryptoExchangeKeypair);
//# sourceMappingURL=CryptoExchangeKeypair.js.map