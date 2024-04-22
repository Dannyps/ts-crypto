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
exports.CryptoPublicState = void 0;
const ts_serval_1 = require("@js-soft/ts-serval");
const CoreBuffer_1 = require("../CoreBuffer");
const CryptoValidation_1 = require("../CryptoValidation");
const CryptoStateType_1 = require("./CryptoStateType");
let CryptoPublicState = class CryptoPublicState extends ts_serval_1.Serializable {
    clear() {
        this.nonce.clear();
    }
    toJSON(verbose = true) {
        return {
            "@type": verbose ? "CryptoPublicState" : undefined,
            nnc: this.nonce.toBase64URL(),
            alg: this.algorithm,
            typ: this.stateType,
            id: this.id
        };
    }
    static preFrom(value) {
        if (value.nnc) {
            value = {
                nonce: value.nnc,
                algorithm: value.alg,
                stateType: value.typ,
                id: value.id
            };
        }
        CryptoValidation_1.CryptoValidation.checkEncryptionAlgorithm(value.algorithm);
        CryptoValidation_1.CryptoValidation.checkStateType(value.stateType);
        CryptoValidation_1.CryptoValidation.checkNonce(value.nonce, value.algorithm);
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
exports.CryptoPublicState = CryptoPublicState;
__decorate([
    (0, ts_serval_1.validate)({ nullable: true }),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", String)
], CryptoPublicState.prototype, "id", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", CoreBuffer_1.CoreBuffer)
], CryptoPublicState.prototype, "nonce", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", Number)
], CryptoPublicState.prototype, "algorithm", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", Number)
], CryptoPublicState.prototype, "stateType", void 0);
exports.CryptoPublicState = CryptoPublicState = __decorate([
    (0, ts_serval_1.type)("CryptoPublicState")
], CryptoPublicState);
//# sourceMappingURL=CryptoPublicState.js.map