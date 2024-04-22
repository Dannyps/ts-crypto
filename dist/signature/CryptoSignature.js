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
exports.CryptoSignature = void 0;
const ts_serval_1 = require("@js-soft/ts-serval");
const CoreBuffer_1 = require("../CoreBuffer");
const CryptoSerializable_1 = require("../CryptoSerializable");
const CryptoSignatureValidation_1 = require("./CryptoSignatureValidation");
let CryptoSignature = class CryptoSignature extends CryptoSerializable_1.CryptoSerializable {
    toJSON(verbose = true) {
        const obj = {
            sig: this.signature.toBase64URL(),
            alg: this.algorithm
        };
        if (verbose) {
            obj["@type"] = "CryptoSignature";
        }
        return obj;
    }
    clear() {
        this.signature.clear();
    }
    static from(value) {
        return this.fromAny(value);
    }
    static preFrom(value) {
        if (value.sig) {
            value = {
                signature: value.sig,
                algorithm: value.alg
            };
        }
        CryptoSignatureValidation_1.CryptoSignatureValidation.checkSignature(value.signature);
        CryptoSignatureValidation_1.CryptoSignatureValidation.checkHashAlgorithm(value.algorithm);
        return value;
    }
    static fromJSON(value) {
        return this.fromAny(value);
    }
    static fromBase64(value) {
        return this.deserialize(CoreBuffer_1.CoreBuffer.base64_utf8(value));
    }
};
exports.CryptoSignature = CryptoSignature;
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", CoreBuffer_1.CoreBuffer)
], CryptoSignature.prototype, "signature", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", Number)
], CryptoSignature.prototype, "algorithm", void 0);
__decorate([
    (0, ts_serval_1.validate)({ nullable: true }),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", String)
], CryptoSignature.prototype, "keyId", void 0);
__decorate([
    (0, ts_serval_1.validate)({ nullable: true }),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", String)
], CryptoSignature.prototype, "id", void 0);
exports.CryptoSignature = CryptoSignature = __decorate([
    (0, ts_serval_1.type)("CryptoSignature")
], CryptoSignature);
//# sourceMappingURL=CryptoSignature.js.map