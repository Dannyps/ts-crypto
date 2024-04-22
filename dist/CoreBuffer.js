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
var CoreBuffer_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreBuffer = exports.Encoding = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const ts_serval_1 = require("@js-soft/ts-serval");
const BaseX_1 = require("./BaseX");
const CryptoError_1 = require("./CryptoError");
const CryptoErrorCode_1 = require("./CryptoErrorCode");
/**
 * Supported string encoding types.
 */
var Encoding;
(function (Encoding) {
    /** String is ASCII encoded, values 0-127 equal values 128-255 */
    Encoding["Ascii"] = "ascii";
    /** String is Base64 encoded */
    Encoding["Base64"] = "base64";
    Encoding["Base64_NoPadding"] = "base64_nopadding";
    /** String is Base64 encoded */
    Encoding["Base64_UrlSafe_NoPadding"] = "base64_urlsafe_nopadding";
    /** String contains comma-separated decimal values (0-255) */
    Encoding["Csv"] = "csv";
    /** String contains hexadecimal encoded-bytes AB => 171 */
    Encoding["Hex"] = "hex";
    /** String is PEM encoded with Base64 buffer content and pre- and succeeding labels */
    Encoding["Pem"] = "pem";
    /** String is Latin1 encoded */
    Encoding["Latin1"] = "latin1";
    /** String is UTF-8 encoded */
    Encoding["Utf8"] = "utf8";
})(Encoding || (exports.Encoding = Encoding = {}));
let CoreBuffer = CoreBuffer_1 = class CoreBuffer extends ts_serval_1.Serializable {
    constructor(value = []) {
        super();
        if (value instanceof ArrayBuffer) {
            this._buffer = new Uint8Array(value, 0, value.byteLength);
        }
        else if (value instanceof Uint8Array) {
            this._buffer = value;
        }
        else if (value instanceof Array) {
            this._buffer = Uint8Array.from(value);
        }
        else if (value instanceof CoreBuffer_1) {
            this._buffer = value.buffer;
        }
        else if (typeof value === "string") {
            this._buffer = CoreBuffer_1.urlSafeBase64WithNoPaddingToBuffer(value).buffer;
        }
        else {
            throw new Error(`Value is of type object but not an Array/ArrayBuffer/Buffer or Uint8Array! Value: ${value}`);
        }
    }
    get buffer() {
        return this._buffer;
    }
    get length() {
        return this._buffer.length;
    }
    clone() {
        const clone = new Uint8Array(this.buffer);
        return new CoreBuffer_1(clone);
    }
    equals(compare) {
        if (this.buffer.byteLength !== compare.buffer.byteLength)
            return false;
        for (let i = 0, l = this.buffer.byteLength; i < l; i++) {
            if (this.buffer[i] !== compare.buffer[i])
                return false;
        }
        return true;
    }
    bufferToCSV() {
        return Array.from(this._buffer).toString();
    }
    bufferToLatin1() {
        return Array.prototype.map
            .call(this._buffer, function (byte) {
            return String.fromCharCode(byte);
        })
            .join("");
    }
    bufferToHex() {
        throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.NotYetImplemented);
    }
    bufferToBase64() {
        throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.NotYetImplemented);
    }
    bufferToBase64NoPadding() {
        throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.NotYetImplemented);
    }
    bufferToBase64URL() {
        throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.NotYetImplemented);
    }
    bufferToAscii() {
        throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.NotYetImplemented);
    }
    bufferToUTF8() {
        throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.NotYetImplemented);
    }
    bufferToPem(label) {
        if (!label)
            label = "PUBLIC KEY";
        const base64Cert = this.bufferToBase64();
        let pemCert = `-----BEGIN ${label}-----\r\n`;
        let nextIndex = 0;
        while (nextIndex < base64Cert.length) {
            if (nextIndex + 64 <= base64Cert.length) {
                pemCert += `${base64Cert.substr(nextIndex, 64)}\r\n`;
            }
            else {
                pemCert += `${base64Cert.substr(nextIndex)}\r\n`;
            }
            nextIndex += 64;
        }
        pemCert += `-----END ${label}-----\r\n`;
        return pemCert;
    }
    toBase64() {
        return this.toString(Encoding.Base64);
    }
    toBase58() {
        const b58 = new BaseX_1.BaseX("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
        return b58.encode(this);
    }
    toBase64URL() {
        return this.toString(Encoding.Base64_UrlSafe_NoPadding);
    }
    toUtf8() {
        return this.toString(Encoding.Utf8);
    }
    clear() {
        throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.NotYetImplemented);
        return this;
    }
    toString(encoding = Encoding.Base64, label) {
        let str;
        switch (`${encoding}`.toLowerCase()) {
            case Encoding.Csv:
                str = this.bufferToCSV();
                break;
            case Encoding.Utf8:
                str = this.bufferToUTF8();
                break;
            case Encoding.Latin1:
                str = this.bufferToLatin1();
                break;
            case Encoding.Ascii:
                str = this.bufferToAscii();
                break;
            case Encoding.Hex:
                str = this.bufferToHex();
                break;
            case Encoding.Base64:
                str = this.bufferToBase64();
                break;
            case Encoding.Base64_NoPadding:
                str = this.bufferToBase64NoPadding();
                break;
            case Encoding.Base64_UrlSafe_NoPadding:
                str = this.bufferToBase64URL();
                break;
            case Encoding.Pem:
                str = this.bufferToPem(label);
                break;
            default:
                throw new Error(`Encoding ${encoding} not supported.`);
        }
        return str;
    }
    toArray() {
        return Array.from(this._buffer);
    }
    append(buffer) {
        const tmp = new Uint8Array(this._buffer.byteLength + buffer.buffer.byteLength);
        tmp.set(new Uint8Array(this._buffer), 0);
        tmp.set(new Uint8Array(buffer.buffer), this._buffer.byteLength);
        this._buffer = tmp;
        return this;
    }
    prepend(buffer) {
        const tmp = new Uint8Array(this._buffer.byteLength + buffer.buffer.byteLength);
        tmp.set(new Uint8Array(buffer.buffer), 0);
        tmp.set(new Uint8Array(this._buffer), buffer.buffer.byteLength);
        this._buffer = tmp;
        return this;
    }
    toJSON() {
        return this.serialize();
    }
    serialize() {
        return this.toBase64URL();
    }
    add(value) {
        // Create a 4*8-bit representation out of the 64bit "float"
        const intBuffer = new Uint32Array([value]);
        const counterBuffer = new Uint8Array(intBuffer.buffer);
        // Create a n*8-bit representation, fill it with the 8*8-bit in order to add it to the actual nonce
        const counterBufferCorrectLength = new Uint8Array(this.buffer.byteLength);
        counterBufferCorrectLength.set(counterBuffer, this.buffer.byteLength - counterBuffer.byteLength);
        const sum = this.buffer;
        throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.NotYetImplemented);
        try {
            // Sum up both arrays
        }
        catch (e) {
            throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.BufferAdd, `${e}`);
        }
        finally {
            intBuffer.fill(0);
            counterBuffer.fill(0);
            counterBufferCorrectLength.fill(0);
        }
        return this;
    }
    static fromBase58(value) {
        const b58 = new BaseX_1.BaseX("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
        return b58.decode(value);
    }
    static from(value) {
        return this.fromAny(value);
    }
    static hexToBuffer(hex) {
        throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.NotYetImplemented);
    }
    static latin1ToBuffer(str) {
        const buf = new Uint8Array(str.length);
        for (let i = 0, strLen = str.length; i < strLen; i++) {
            buf[i] = str.charCodeAt(i);
        }
        return new CoreBuffer_1(buf);
    }
    static asciiToBuffer(str) {
        const buf = new Uint8Array(str.length);
        for (let i = 0, strLen = str.length; i < strLen; i++) {
            buf[i] = str.charCodeAt(i);
        }
        return new CoreBuffer_1(buf);
    }
    static base64ToBuffer(base64) {
        throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.NotYetImplemented);
    }
    static base64NoPaddingToBuffer(base64) {
        throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.NotYetImplemented);
    }
    static urlSafeBase64WithNoPaddingToBuffer(base64) {
        throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.NotYetImplemented);
    }
    static utf8ToBuffer(utf8) {
        throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.NotYetImplemented);
    }
    static pemToBuffer(pem) {
        pem = pem.replace(/-----BEGIN [\w ]* KEY-----/, "");
        pem = pem.replace(/-----END [\w ]* KEY-----/, "");
        pem = pem.replace(/----- BEGIN [\w ]* KEY -----/, "");
        pem = pem.replace(/----- END [\w ]* KEY -----/, "");
        pem = pem.replace(/(?:\r\n|\r|\n)/g, "");
        return this.base64ToBuffer(pem);
    }
    static fromBase64(value) {
        return this.fromString(value, Encoding.Base64);
    }
    static fromBase64URL(value) {
        return this.fromString(value, Encoding.Base64_UrlSafe_NoPadding);
    }
    static fromUtf8(value) {
        return this.fromString(value, Encoding.Utf8);
    }
    static fromString(value, encoding) {
        let buffer;
        if (typeof value === "string") {
            switch (`${encoding}`.toLowerCase()) {
                case Encoding.Csv:
                    const strbuf = `${value}`.split(",");
                    const str = [];
                    for (let i = 0, strLen = strbuf.length; i < strLen; i++) {
                        str.push(String.fromCharCode(parseInt(strbuf[i])));
                    }
                    buffer = this.latin1ToBuffer(str.join(""));
                    break;
                case Encoding.Latin1:
                    buffer = this.latin1ToBuffer(value);
                    break;
                case Encoding.Ascii:
                    buffer = this.asciiToBuffer(value);
                    break;
                case Encoding.Utf8:
                    buffer = this.utf8ToBuffer(value);
                    break;
                case Encoding.Hex:
                    buffer = this.hexToBuffer(value);
                    break;
                case Encoding.Base64:
                    buffer = this.base64ToBuffer(value);
                    break;
                case Encoding.Base64_NoPadding:
                    buffer = this.base64NoPaddingToBuffer(value);
                    break;
                case Encoding.Base64_UrlSafe_NoPadding:
                    buffer = this.urlSafeBase64WithNoPaddingToBuffer(value);
                    break;
                case Encoding.Pem:
                    buffer = this.pemToBuffer(value);
                    break;
                default:
                    throw new Error(`Encoding ${encoding} not supported.`);
            }
            return buffer;
        }
        throw new Error("Value is not of type string!");
    }
    static base64_json(value) {
        return JSON.parse(this.base64_utf8(value));
    }
    static json_base64(value) {
        return this.utf8_base64(JSON.stringify(value));
    }
    static utf8_base64(value) {
        return CoreBuffer_1.fromUtf8(value).toBase64URL();
    }
    static base64_utf8(value) {
        return CoreBuffer_1.fromBase64URL(value).toUtf8();
    }
    static fromObject(value) {
        return new CoreBuffer_1(value);
    }
    static random(length) {
        throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.NotYetImplemented);
    }
};
exports.CoreBuffer = CoreBuffer;
exports.CoreBuffer = CoreBuffer = CoreBuffer_1 = __decorate([
    (0, ts_serval_1.type)("CoreBuffer"),
    __metadata("design:paramtypes", [Object])
], CoreBuffer);
//# sourceMappingURL=CoreBuffer.js.map