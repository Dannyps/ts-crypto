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
exports.CryptoSecretKey = void 0;
const ts_serval_1 = require("@js-soft/ts-serval");
const CoreBuffer_1 = require("../CoreBuffer");
const CryptoSerializable_1 = require("../CryptoSerializable");
const CryptoValidation_1 = require("../CryptoValidation");
let CryptoSecretKey = class CryptoSecretKey extends CryptoSerializable_1.CryptoSerializable {
    toJSON(verbose = true) {
        return {
            key: this.secretKey.toBase64URL(),
            alg: this.algorithm,
            "@type": verbose ? "CryptoSecretKey" : undefined
        };
    }
    clear() {
        this.secretKey.clear();
    }
    static from(value) {
        return this.fromAny(value);
    }
    static preFrom(value) {
        if (value.alg) {
            value = {
                algorithm: value.alg,
                secretKey: value.key
            };
        }
        CryptoValidation_1.CryptoValidation.checkEncryptionAlgorithm(value.algorithm);
        if (typeof value.secretKey === "string") {
            CryptoValidation_1.CryptoValidation.checkSerializedSecretKeyForAlgorithm(value.secretKey, value.algorithm);
        }
        else {
            CryptoValidation_1.CryptoValidation.checkSecretKeyForAlgorithm(value.secretKey, value.algorithm);
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
exports.CryptoSecretKey = CryptoSecretKey;
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", Number)
], CryptoSecretKey.prototype, "algorithm", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", CoreBuffer_1.CoreBuffer)
], CryptoSecretKey.prototype, "secretKey", void 0);
exports.CryptoSecretKey = CryptoSecretKey = __decorate([
    (0, ts_serval_1.type)("CryptoSecretKey")
], CryptoSecretKey);
//# sourceMappingURL=CryptoSecretKey.js.map