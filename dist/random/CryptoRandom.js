"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoRandom = exports.CryptoRandomCharacterRange = void 0;
const uuid_1 = require("uuid");
const CryptoError_1 = require("../CryptoError");
const CryptoErrorCode_1 = require("../CryptoErrorCode");
var CryptoRandomCharacterRange;
(function (CryptoRandomCharacterRange) {
    CryptoRandomCharacterRange["Digit"] = "0123456789";
    CryptoRandomCharacterRange["DigitEase"] = "123456789";
    CryptoRandomCharacterRange["Hex"] = "0123456789ABCDEF";
    CryptoRandomCharacterRange["LowerCase"] = "abcdefghijklmnopqrstuvwxyz";
    CryptoRandomCharacterRange["LowerCaseEase"] = "abcdefghijkmnpqrstuvwxyz";
    CryptoRandomCharacterRange["UpperCase"] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    CryptoRandomCharacterRange["UpperCaseEase"] = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    CryptoRandomCharacterRange["Alphabet"] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    CryptoRandomCharacterRange["Alphanumeric"] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    // Without I, l, O, o, 0
    CryptoRandomCharacterRange["AlphanumericEase"] = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789";
    CryptoRandomCharacterRange["AlphanumericUpperCaseEase"] = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";
    CryptoRandomCharacterRange["GermanUmlaut"] = "\u00C4\u00D6\u00DC\u00E4\u00F6\u00FC";
    CryptoRandomCharacterRange["SpecialCharacters"] = "!?-_.:,;#+";
})(CryptoRandomCharacterRange || (exports.CryptoRandomCharacterRange = CryptoRandomCharacterRange = {}));
class CryptoRandom {
    static async bytes(length) {
        throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.NotYetImplemented);
    }
    static async int(length) {
        const useLength = Math.floor(length);
        if (useLength > 21 || useLength <= 0) {
            throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.WrongLength, "The length of the created random buffer must be positive and smaller than 22 digits.");
        }
        return parseInt(await this.string(length, CryptoRandomCharacterRange.Digit));
    }
    static async array(length) {
        return (await CryptoRandom.bytes(length)).toArray();
    }
    static uuid() {
        return (0, uuid_1.v4)();
    }
    static async scramble(input) {
        const out = [];
        const inar = input.split("");
        const length = input.length;
        for (let i = 0; i < length - 1; i++) {
            const charAt = await CryptoRandom.intBetween(0, length - 1 - i);
            out.push(inar.splice(charAt, 1)[0]);
        }
        out.push(inar[0]);
        return out.join("");
    }
    static async intBetween(min, max) {
        if (max <= min)
            throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.WrongParameters, "Max must be larger than min.");
        const diff = max - min + 1;
        const bitLength = Math.abs(Math.ceil(Math.log2(diff)));
        if (bitLength > 32) {
            throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.WrongParameters, "The range between the numbers is too big, 32 bit is the maximum -> 4294967296");
        }
        const byteLength = Math.ceil(bitLength / 8);
        const bitMask = Math.pow(2, bitLength) - 1;
        const randomArray = await this.bytes(byteLength);
        let value = 0;
        let p = (byteLength - 1) * 8;
        for (let i = 0; i < byteLength; i++) {
            value += randomArray.buffer[i] * Math.pow(2, p);
            p -= 8;
        }
        value = value & bitMask;
        if (value >= diff) {
            return await this.intBetween(min, max);
        }
        return min + value;
    }
    static async intRandomLength(minLength, maxLength) {
        if (maxLength > 21) {
            throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.WrongLength, "The length of the created random buffer must be positive and smaller than 22 digits.");
        }
        return parseInt(await this.stringRandomLength(minLength, maxLength, CryptoRandomCharacterRange.Digit));
    }
    static async scrambleWithBuckets(buckets) {
        const mystr = await this.stringWithBuckets(buckets);
        return await this.scramble(mystr);
    }
    static async stringWithBuckets(buckets) {
        const mystr = [];
        for (const bucket of buckets) {
            mystr.push(await this.stringRandomLength(bucket.minLength, bucket.maxLength, bucket.allowedChars));
        }
        return mystr.join("");
    }
    static async string(length, allowedChars = CryptoRandomCharacterRange.Alphanumeric) {
        if (length <= 0)
            return "";
        if (allowedChars.length > 255) {
            throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.WrongParameters, "The allowedCharacter array must not be larger than 255 characters.");
        }
        const ar = [];
        const inputLength = allowedChars.length;
        const random = await this.array(length + 10);
        const max = 255 - (255 % inputLength);
        for (let i = 0; i < length; i++) {
            const nmb = random[i];
            if (nmb > max) {
                // Reject random value to remove bias if we are at the upper (and incomplete end)
                // of possible random values
                continue;
            }
            ar.push(allowedChars[nmb % inputLength]);
        }
        let retStr = ar.join("");
        if (retStr.length < length) {
            retStr += await this.string(length - retStr.length, allowedChars);
        }
        return retStr;
    }
    static async stringRandomLength(minLength, maxLength, allowedChars) {
        if (minLength > maxLength) {
            throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.WrongParameters, "Max must be larger than min.");
        }
        if (minLength < 0)
            throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.WrongParameters, "Min must be positive.");
        const length = maxLength > minLength ? await this.intBetween(minLength, maxLength) : maxLength;
        return await this.string(length, allowedChars);
    }
}
exports.CryptoRandom = CryptoRandom;
//# sourceMappingURL=CryptoRandom.js.map