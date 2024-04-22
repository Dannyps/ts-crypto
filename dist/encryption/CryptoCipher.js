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
var CryptoCipher_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoCipher = void 0;
const ts_serval_1 = require("@js-soft/ts-serval");
const CoreBuffer_1 = require("../CoreBuffer");
const CryptoError_1 = require("../CryptoError");
const CryptoErrorCode_1 = require("../CryptoErrorCode");
const CryptoSerializable_1 = require("../CryptoSerializable");
const CryptoValidation_1 = require("../CryptoValidation");
let CryptoCipher = CryptoCipher_1 = class CryptoCipher extends CryptoSerializable_1.CryptoSerializable {
    toJSON(verbose = true) {
        return {
            cph: this.cipher.toBase64URL(),
            alg: this.algorithm,
            nnc: this.nonce ? this.nonce.toBase64URL() : undefined,
            cnt: this.counter,
            "@type": verbose ? "CryptoCipher" : undefined
        };
    }
    clear() {
        var _a;
        this.cipher.clear();
        (_a = this.nonce) === null || _a === void 0 ? void 0 : _a.clear();
    }
    static from(value) {
        return this.fromAny(value);
    }
    static preFrom(value) {
        if (value.cph) {
            value = {
                cipher: value.cph,
                algorithm: value.alg,
                nonce: value.nnc,
                counter: value.cnt
            };
        }
        if (!value.nonce && typeof value.counter === "undefined") {
            throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.EncryptionNoNonceNorCounter, "No nonce nor counter property set.");
        }
        if (value.nonce && typeof value.counter !== "undefined") {
            throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.EncryptionNonceAndCounter, "Nonce and counter properties are set.");
        }
        if (typeof value.cipher === "string") {
            CryptoValidation_1.CryptoValidation.checkSerializedBuffer(value.cipher, this.MIN_CIPHER_BYTES, this.MAX_CIPHER_BYTES, "cipher");
        }
        else {
            CryptoValidation_1.CryptoValidation.checkBuffer(value.cipher, CryptoCipher_1.MIN_CIPHER_BYTES, CryptoCipher_1.MAX_CIPHER_BYTES, "cipher");
        }
        CryptoValidation_1.CryptoValidation.checkEncryptionAlgorithm(value.algorithm);
        if (value.counter) {
            CryptoValidation_1.CryptoValidation.checkCounter(value.counter);
        }
        if (value.nonce) {
            CryptoValidation_1.CryptoValidation.checkNonce(value.nonce, value.algorithm);
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
exports.CryptoCipher = CryptoCipher;
CryptoCipher.MIN_CIPHER_BYTES = 2;
CryptoCipher.MAX_CIPHER_BYTES = 100 * 1024 * 1024;
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", Number)
], CryptoCipher.prototype, "algorithm", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", CoreBuffer_1.CoreBuffer)
], CryptoCipher.prototype, "cipher", void 0);
__decorate([
    (0, ts_serval_1.validate)({ nullable: true }),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", Number)
], CryptoCipher.prototype, "counter", void 0);
__decorate([
    (0, ts_serval_1.validate)({ nullable: true }),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", CoreBuffer_1.CoreBuffer)
], CryptoCipher.prototype, "nonce", void 0);
exports.CryptoCipher = CryptoCipher = CryptoCipher_1 = __decorate([
    (0, ts_serval_1.type)("CryptoCipher")
], CryptoCipher);
//# sourceMappingURL=CryptoCipher.js.map