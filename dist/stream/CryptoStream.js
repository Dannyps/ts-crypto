"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoStream = void 0;
const __1 = require("..");
function staticImplements() {
    return (_constructor) => {
        // No need for an implementation. This decorator is only for compile time. By saying `U extends T`,
        // TypeScript checks whether the constructor implements the given interface.
    };
}
let CryptoStream = class CryptoStream {
    static async initServer(key) {
        throw new __1.CryptoError(__1.CryptoErrorCode.NotYetImplemented);
    }
    static async initClient(header, key) {
        throw new __1.CryptoError(__1.CryptoErrorCode.NotYetImplemented);
    }
    static async encrypt(message, stream) {
        throw new __1.CryptoError(__1.CryptoErrorCode.NotYetImplemented);
    }
    static async decrypt(cipher, stream) {
        throw new __1.CryptoError(__1.CryptoErrorCode.NotYetImplemented);
    }
    static async getState(address) {
        throw new __1.CryptoError(__1.CryptoErrorCode.NotYetImplemented);
    }
    static async setState(address, state) {
        throw new __1.CryptoError(__1.CryptoErrorCode.NotYetImplemented);
    }
};
exports.CryptoStream = CryptoStream;
exports.CryptoStream = CryptoStream = __decorate([
    staticImplements()
], CryptoStream);
//# sourceMappingURL=CryptoStream.js.map