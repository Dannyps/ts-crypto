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
exports.CryptoExchangePublicKey = void 0;
const ts_serval_1 = require("@js-soft/ts-serval");
const CoreBuffer_1 = require("../CoreBuffer");
const CryptoPublicKey_1 = require("../CryptoPublicKey");
const CryptoExchangeValidation_1 = require("./CryptoExchangeValidation");
let CryptoExchangePublicKey = class CryptoExchangePublicKey extends CryptoPublicKey_1.CryptoPublicKey {
    toJSON(verbose = true) {
        return {
            "@type": verbose ? "CryptoExchangePublicKey" : undefined,
            pub: this.publicKey.toBase64URL(),
            alg: this.algorithm
        };
    }
    clear() {
        this.publicKey.clear();
    }
    static preFrom(value) {
        if (value.alg) {
            value = {
                algorithm: value.alg,
                publicKey: value.pub
            };
        }
        CryptoExchangeValidation_1.CryptoExchangeValidation.checkExchangeAlgorithm(value.algorithm);
        CryptoExchangeValidation_1.CryptoExchangeValidation.checkExchangePublicKey(value.publicKey, value.algorithm);
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
exports.CryptoExchangePublicKey = CryptoExchangePublicKey;
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", Number)
], CryptoExchangePublicKey.prototype, "algorithm", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", CoreBuffer_1.CoreBuffer)
], CryptoExchangePublicKey.prototype, "publicKey", void 0);
exports.CryptoExchangePublicKey = CryptoExchangePublicKey = __decorate([
    (0, ts_serval_1.type)("CryptoExchangePublicKey")
], CryptoExchangePublicKey);
//# sourceMappingURL=CryptoExchangePublicKey.js.map