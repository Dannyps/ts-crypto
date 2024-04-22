"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoPrivateStateTransmit = void 0;
const ts_serval_1 = require("@js-soft/ts-serval");
const CryptoError_1 = require("../CryptoError");
const CryptoErrorCode_1 = require("../CryptoErrorCode");
const CryptoValidation_1 = require("../CryptoValidation");
const CryptoEncryption_1 = require("../encryption/CryptoEncryption");
const CryptoPrivateState_1 = require("./CryptoPrivateState");
const CryptoStateType_1 = require("./CryptoStateType");
let CryptoPrivateStateTransmit = class CryptoPrivateStateTransmit extends CryptoPrivateState_1.CryptoPrivateState {
    toJSON() {
        const obj = super.toJSON();
        obj["@type"] = "CryptoPrivateStateTransmit";
        return obj;
    }
    async encrypt(plaintext) {
        const cipher = await CryptoEncryption_1.CryptoEncryption.encryptWithCounter(plaintext, this.secretKey, this.nonce, this.counter);
        const newCounter = this.counter + 1;
        this.setCounter(newCounter);
        return cipher;
    }
    async decrypt(cipher) {
        CryptoValidation_1.CryptoValidation.checkCounter(cipher.counter);
        if (typeof cipher.counter === "undefined")
            throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.StateWrongCounter);
        const plaintext = await CryptoEncryption_1.CryptoEncryption.decryptWithCounter(cipher, this.secretKey, this.nonce, cipher.counter);
        return plaintext;
    }
    static generate(secretKey, id, algorithm = 3 /* CryptoEncryptionAlgorithm.XCHACHA20_POLY1305 */) {
        CryptoValidation_1.CryptoValidation.checkEncryptionAlgorithm(algorithm);
        CryptoValidation_1.CryptoValidation.checkSecretKeyForAlgorithm(secretKey, algorithm);
        if (typeof secretKey === "undefined")
            throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.StateWrongCounter);
        const nonce = CryptoEncryption_1.CryptoEncryption.createNonce(algorithm);
        const counter = 0;
        return this.from({ nonce, counter, secretKey, algorithm, id, stateType: CryptoStateType_1.CryptoStateType.Transmit });
    }
    static from(obj) {
        return this.fromAny(obj);
    }
    static preFrom(value) {
        value = super.preFrom(value);
        CryptoValidation_1.CryptoValidation.checkBufferAsStringOrBuffer(value.nonce, 0, 24, "nonce");
        CryptoValidation_1.CryptoValidation.checkSecretKeyForAlgorithm(value.secretKey, value.algorithm);
        if (value.stateType) {
            CryptoValidation_1.CryptoValidation.checkStateType(value.stateType);
        }
        return value;
    }
    static fromJSON(value) {
        return this.fromAny(value);
    }
};
exports.CryptoPrivateStateTransmit = CryptoPrivateStateTransmit;
exports.CryptoPrivateStateTransmit = CryptoPrivateStateTransmit = __decorate([
    (0, ts_serval_1.type)("CryptoPrivateStateTransmit")
], CryptoPrivateStateTransmit);
//# sourceMappingURL=CryptoPrivateStateTransmit.js.map