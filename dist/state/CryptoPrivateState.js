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
exports.CryptoPrivateState = void 0;
const ts_serval_1 = require("@js-soft/ts-serval");
const CoreBuffer_1 = require("../CoreBuffer");
const CryptoValidation_1 = require("../CryptoValidation");
const CryptoPublicState_1 = require("./CryptoPublicState");
const CryptoStateType_1 = require("./CryptoStateType");
class CryptoPrivateState extends ts_serval_1.Serializable {
    setCounter(value) {
        this.counter = value;
    }
    clear() {
        this.secretKey.clear();
        this.nonce.clear();
    }
    toString() {
        return this.serialize();
    }
    toPublicState() {
        return CryptoPublicState_1.CryptoPublicState.from({
            nonce: this.nonce.clone(),
            algorithm: this.algorithm,
            stateType: this.stateType,
            id: this.id
        });
    }
    toJSON(verbose = true) {
        return {
            nnc: this.nonce.toBase64URL(),
            cnt: this.counter,
            key: this.secretKey.toBase64URL(),
            alg: this.algorithm,
            typ: this.stateType,
            id: this.id,
            "@type": verbose ? "CryptoPrivateState" : undefined
        };
    }
    static preFrom(value) {
        if (value.nnc) {
            value = {
                nonce: value.nnc,
                counter: value.cnt,
                secretKey: value.key,
                algorithm: value.alg,
                stateType: value.typ,
                id: value.id
            };
        }
        CryptoValidation_1.CryptoValidation.checkEncryptionAlgorithm(value.algorithm);
        CryptoValidation_1.CryptoValidation.checkCounter(value.counter);
        CryptoValidation_1.CryptoValidation.checkNonce(value.nonce, value.algorithm);
        CryptoValidation_1.CryptoValidation.checkSecretKeyForAlgorithm(value.secretKey, value.algorithm);
        CryptoValidation_1.CryptoValidation.checkStateType(value.stateType);
        if (value.id) {
            CryptoValidation_1.CryptoValidation.checkId(value.id);
        }
        return value;
    }
    static from(obj) {
        return this.fromAny(obj);
    }
    static fromJSON(value) {
        return this.fromAny(value);
    }
}
exports.CryptoPrivateState = CryptoPrivateState;
__decorate([
    (0, ts_serval_1.validate)({ nullable: true }),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", String)
], CryptoPrivateState.prototype, "id", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", CoreBuffer_1.CoreBuffer)
], CryptoPrivateState.prototype, "nonce", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", Number)
], CryptoPrivateState.prototype, "counter", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", CoreBuffer_1.CoreBuffer)
], CryptoPrivateState.prototype, "secretKey", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", Number)
], CryptoPrivateState.prototype, "algorithm", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", Number)
], CryptoPrivateState.prototype, "stateType", void 0);
//# sourceMappingURL=CryptoPrivateState.js.map