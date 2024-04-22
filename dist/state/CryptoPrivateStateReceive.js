"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CryptoPrivateStateReceive_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoPrivateStateReceive = void 0;
const ts_serval_1 = require("@js-soft/ts-serval");
const CryptoError_1 = require("../CryptoError");
const CryptoErrorCode_1 = require("../CryptoErrorCode");
const CryptoValidation_1 = require("../CryptoValidation");
const CryptoEncryption_1 = require("../encryption/CryptoEncryption");
const CryptoPrivateState_1 = require("./CryptoPrivateState");
const CryptoStateType_1 = require("./CryptoStateType");
let CryptoPrivateStateReceive = CryptoPrivateStateReceive_1 = class CryptoPrivateStateReceive extends CryptoPrivateState_1.CryptoPrivateState {
    toJSON() {
        const obj = super.toJSON();
        obj["@type"] = "CryptoPrivateStateReceive";
        return obj;
    }
    async decrypt(cipher, omitCounterCheck = false) {
        let plaintext;
        CryptoValidation_1.CryptoValidation.checkCounter(cipher.counter);
        if (typeof cipher.counter === "undefined")
            throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.Unknown);
        if (omitCounterCheck) {
            plaintext = await CryptoEncryption_1.CryptoEncryption.decryptWithCounter(cipher, this.secretKey, this.nonce, cipher.counter);
        }
        else {
            if (this.counter !== cipher.counter) {
                throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.StateWrongOrder, `The current message seems to be out of order. The in order number would be ${this.counter} and message is ${cipher.counter}.`);
            }
            plaintext = await CryptoEncryption_1.CryptoEncryption.decryptWithCounter(cipher, this.secretKey, this.nonce, this.counter);
            const newCounter = this.counter + 1;
            this.setCounter(newCounter);
        }
        return plaintext;
    }
    static fromNonce(nonce, secretKey, counter = 0) {
        return CryptoPrivateStateReceive_1.from({
            nonce: nonce.clone(),
            counter,
            secretKey,
            algorithm: 3 /* CryptoEncryptionAlgorithm.XCHACHA20_POLY1305 */,
            stateType: CryptoStateType_1.CryptoStateType.Receive
        });
    }
    static fromPublicState(publicState, secretKey, counter = 0) {
        return CryptoPrivateStateReceive_1.from({
            nonce: publicState.nonce.clone(),
            counter,
            secretKey,
            algorithm: publicState.algorithm,
            id: publicState.id,
            stateType: CryptoStateType_1.CryptoStateType.Receive
        });
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
    static from(obj) {
        return this.fromAny(obj);
    }
    static fromJSON(value) {
        return this.fromAny(value);
    }
};
exports.CryptoPrivateStateReceive = CryptoPrivateStateReceive;
exports.CryptoPrivateStateReceive = CryptoPrivateStateReceive = CryptoPrivateStateReceive_1 = __decorate([
    (0, ts_serval_1.type)("CryptoPrivateStateReceive")
], CryptoPrivateStateReceive);
//# sourceMappingURL=CryptoPrivateStateReceive.js.map