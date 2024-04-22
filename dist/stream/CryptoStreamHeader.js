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
exports.CryptoStreamHeader = void 0;
const ts_serval_1 = require("@js-soft/ts-serval");
const CoreBuffer_1 = require("../CoreBuffer");
let CryptoStreamHeader = class CryptoStreamHeader extends ts_serval_1.Serializable {
    toString() {
        return this.serialize();
    }
    serialize() {
        const obj = this.toJSON();
        return JSON.stringify(obj);
    }
    toJSON() {
        const obj = {
            "@type": "CryptoStreamHeader",
            header: this.header.toBase64()
        };
        return obj;
    }
    toBase64() {
        return this.header.toBase64();
    }
    static preFrom(value) {
        if (value instanceof CoreBuffer_1.CoreBuffer) {
            return { header: value };
        }
        return value;
    }
    static from(obj) {
        return this.fromAny(obj);
    }
    static fromBase64(value) {
        const buffer = CoreBuffer_1.CoreBuffer.fromBase64(value);
        return this.from({ header: buffer });
    }
};
exports.CryptoStreamHeader = CryptoStreamHeader;
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", CoreBuffer_1.CoreBuffer)
], CryptoStreamHeader.prototype, "header", void 0);
exports.CryptoStreamHeader = CryptoStreamHeader = __decorate([
    (0, ts_serval_1.type)("CryptoStreamHeader")
], CryptoStreamHeader);
//# sourceMappingURL=CryptoStreamHeader.js.map