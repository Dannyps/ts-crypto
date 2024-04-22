"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoSignaturePublicKey = void 0;
const ts_serval_1 = require("@js-soft/ts-serval");
const CoreBuffer_1 = require("../CoreBuffer");
const CryptoPublicKey_1 = require("../CryptoPublicKey");
const CryptoSignatureValidation_1 = require("./CryptoSignatureValidation");
let CryptoSignaturePublicKey = class CryptoSignaturePublicKey extends CryptoPublicKey_1.CryptoPublicKey {
    toJSON(verbose = true) {
        return {
            pub: this.publicKey.toBase64URL(),
            alg: this.algorithm,
            "@type": verbose ? "CryptoSignaturePublicKey" : undefined
        };
    }
    clear() {
        this.publicKey.clear();
    }
    toBase64(verbose = true) {
        return CoreBuffer_1.CoreBuffer.utf8_base64(this.serialize(verbose));
    }
    static from(value) {
        return this.fromAny(value);
    }
    static preFrom(value) {
        if (value.pub) {
            value = {
                algorithm: value.alg,
                publicKey: value.pub
            };
        }
        CryptoSignatureValidation_1.CryptoSignatureValidation.checkSignatureAlgorithm(value.algorithm);
        CryptoSignatureValidation_1.CryptoSignatureValidation.checkSignaturePublicKey(value.publicKey, value.algorithm, "publicKey");
        return value;
    }
    static fromJSON(value) {
        return this.fromAny(value);
    }
    static fromBase64(value) {
        return this.deserialize(CoreBuffer_1.CoreBuffer.base64_utf8(value));
    }
};
exports.CryptoSignaturePublicKey = CryptoSignaturePublicKey;
exports.CryptoSignaturePublicKey = CryptoSignaturePublicKey = __decorate([
    (0, ts_serval_1.type)("CryptoSignaturePublicKey")
], CryptoSignaturePublicKey);
//# sourceMappingURL=CryptoSignaturePublicKey.js.map