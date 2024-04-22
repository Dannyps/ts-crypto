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
exports.CryptoStreamState = void 0;
const ts_serval_1 = require("@js-soft/ts-serval");
const CryptoStreamAddress_1 = require("./CryptoStreamAddress");
const CryptoStreamHeader_1 = require("./CryptoStreamHeader");
let CryptoStreamState = class CryptoStreamState extends ts_serval_1.Serializable {
    toString() {
        return this.serialize();
    }
    static from(obj) {
        return this.fromAny(obj);
    }
};
exports.CryptoStreamState = CryptoStreamState;
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", CryptoStreamAddress_1.CryptoStreamAddress)
], CryptoStreamState.prototype, "address", void 0);
__decorate([
    (0, ts_serval_1.validate)(),
    (0, ts_serval_1.serialize)(),
    __metadata("design:type", CryptoStreamHeader_1.CryptoStreamHeader)
], CryptoStreamState.prototype, "header", void 0);
exports.CryptoStreamState = CryptoStreamState = __decorate([
    (0, ts_serval_1.type)("CryptoStreamState")
], CryptoStreamState);
//# sourceMappingURL=CryptoStreamState.js.map