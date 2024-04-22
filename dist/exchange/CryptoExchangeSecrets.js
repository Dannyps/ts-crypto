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
exports.CryptoExchangeSecrets = void 0;
const ts_serval_1 = require("@js-soft/ts-serval");
const CoreBuffer_1 = require("../CoreBuffer");
const CryptoSerializable_1 = require("../CryptoSerializable");
let CryptoExchangeSecrets = class CryptoExchangeSecrets extends CryptoSerializable_1.CryptoSerializable {
    toJSON(verbose = true) {
        return {
            rx: this.receivingKey.toBase64URL(),
            tx: this.transmissionKey.toBase64URL(),
            alg: this.algorithm,
            "@type": verbose ? "CryptoExchangeSecrets" : undefined
        };
    }
    clear() {
        this.receivingKey.clear();
        this.transmissionKey.clear();
    }
    serialize(verbose = true) {
        return JSON.stringify(this.toJSON(verbose));
    }
    toBase64(verbose = true) {
        return CoreBuffer_1.CoreBuffer.utf8_base64(this.serialize(verbose));
    }
    static from(value) {
        return this.fromAny(value);
    }
    static preFrom(value) {
        if (value.rx) {
            value = {
                algorithm: value.alg,
                receivingKey: value.rx,
                transmissionKey: value.tx
            };
        }
        return value;
    }
    static fromJSON(value) {
        return this.fromAny(value);
    }
    static fromBase64(value) {
        return Promise.resolve(this.deserialize(CoreBuffer_1.CoreBuffer.base64_utf8(value)));
    }
};
exports.CryptoExchangeSecrets = CryptoExchangeSecrets;
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", Number)
], CryptoExchangeSecrets.prototype, "algorithm", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", CoreBuffer_1.CoreBuffer)
], CryptoExchangeSecrets.prototype, "receivingKey", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", CoreBuffer_1.CoreBuffer)
], CryptoExchangeSecrets.prototype, "transmissionKey", void 0);
exports.CryptoExchangeSecrets = CryptoExchangeSecrets = __decorate([
    (0, ts_serval_1.type)("CryptoExchangeSecrets")
], CryptoExchangeSecrets);
//# sourceMappingURL=CryptoExchangeSecrets.js.map