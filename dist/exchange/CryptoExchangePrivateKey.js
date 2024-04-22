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
exports.CryptoExchangePrivateKey = void 0;
const ts_serval_1 = require("@js-soft/ts-serval");
const CoreBuffer_1 = require("../CoreBuffer");
const CryptoError_1 = require("../CryptoError");
const CryptoErrorCode_1 = require("../CryptoErrorCode");
const CryptoPrivateKey_1 = require("../CryptoPrivateKey");
const CryptoExchangeValidation_1 = require("./CryptoExchangeValidation");
let CryptoExchangePrivateKey = class CryptoExchangePrivateKey extends CryptoPrivateKey_1.CryptoPrivateKey {
    toJSON(verbose = true) {
        return {
            prv: this.privateKey.toBase64URL(),
            alg: this.algorithm,
            "@type": verbose ? "CryptoExchangePrivateKey" : undefined
        };
    }
    clear() {
        this.privateKey.clear();
    }
    toBase64(verbose = true) {
        return CoreBuffer_1.CoreBuffer.utf8_base64(this.serialize(verbose));
    }
    async toPublicKey() {
        throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.NotYetImplemented);
    }
    static from(value) {
        return this.fromAny(value);
    }
    static preFrom(value) {
        if (value.alg) {
            value = {
                algorithm: value.alg,
                privateKey: CoreBuffer_1.CoreBuffer.fromBase64URL(value.prv)
            };
        }
        CryptoExchangeValidation_1.CryptoExchangeValidation.checkExchangeAlgorithm(value.algorithm);
        CryptoExchangeValidation_1.CryptoExchangeValidation.checkExchangePrivateKey(value.privateKey, value.algorithm, "privateKey");
        return value;
    }
    static fromJSON(value) {
        return this.fromAny(value);
    }
    static fromBase64(value) {
        return this.deserialize(CoreBuffer_1.CoreBuffer.base64_utf8(value));
    }
};
exports.CryptoExchangePrivateKey = CryptoExchangePrivateKey;
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", Number)
], CryptoExchangePrivateKey.prototype, "algorithm", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", CoreBuffer_1.CoreBuffer)
], CryptoExchangePrivateKey.prototype, "privateKey", void 0);
exports.CryptoExchangePrivateKey = CryptoExchangePrivateKey = __decorate([
    (0, ts_serval_1.type)("CryptoExchangePrivateKey")
], CryptoExchangePrivateKey);
//# sourceMappingURL=CryptoExchangePrivateKey.js.map