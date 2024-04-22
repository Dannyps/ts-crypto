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
exports.CryptoPublicKey = void 0;
const ts_serval_1 = require("@js-soft/ts-serval");
const CoreBuffer_1 = require("./CoreBuffer");
const CryptoSerializable_1 = require("./CryptoSerializable");
let CryptoPublicKey = class CryptoPublicKey extends CryptoSerializable_1.CryptoSerializable {
    toString() {
        return this.publicKey.toString(CoreBuffer_1.Encoding.Base64_UrlSafe_NoPadding);
    }
    toPEM() {
        return this.publicKey.toString(CoreBuffer_1.Encoding.Pem, "PUBLIC KEY");
    }
    static stripPEM(pem) {
        pem = pem.replace(/-----BEGIN [\w ]* KEY-----/, "");
        pem = pem.replace(/-----END [\w ]* KEY-----/, "");
        pem = pem.replace(/----- BEGIN [\w ]* KEY -----/, "");
        pem = pem.replace(/----- END [\w ]* KEY -----/, "");
        pem = pem.replace(/(?:\r\n|\r|\n)/g, "");
        return pem;
    }
    static fromPEM(pem, algorithm) {
        const value = this.stripPEM(pem);
        return this.fromString(value, algorithm, CoreBuffer_1.Encoding.Base64);
    }
    static fromString(value, algorithm, encoding = CoreBuffer_1.Encoding.Base64_UrlSafe_NoPadding) {
        const buffer = CoreBuffer_1.CoreBuffer.fromString(value, encoding);
        return this.fromAny({ algorithm, publicKey: buffer });
    }
    static fromObject(value, algorithm) {
        const buffer = CoreBuffer_1.CoreBuffer.fromObject(value);
        return this.fromAny({ algorithm, publicKey: buffer });
    }
    static from(value) {
        return this.fromAny(value);
    }
    static fromBase64(value) {
        return this.deserialize(CoreBuffer_1.CoreBuffer.base64_utf8(value));
    }
};
exports.CryptoPublicKey = CryptoPublicKey;
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", Number)
], CryptoPublicKey.prototype, "algorithm", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", CoreBuffer_1.CoreBuffer)
], CryptoPublicKey.prototype, "publicKey", void 0);
exports.CryptoPublicKey = CryptoPublicKey = __decorate([
    (0, ts_serval_1.type)("CryptoPublicKey")
], CryptoPublicKey);
//# sourceMappingURL=CryptoPublicKey.js.map