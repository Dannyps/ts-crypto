"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoSerializable = void 0;
const ts_serval_1 = require("@js-soft/ts-serval");
const CoreBuffer_1 = require("./CoreBuffer");
class CryptoSerializable extends ts_serval_1.Serializable {
    serialize(verbose = true) {
        return JSON.stringify(this.toJSON(verbose));
    }
    toBase64(verbose = true) {
        return CoreBuffer_1.CoreBuffer.utf8_base64(this.serialize(verbose));
    }
}
exports.CryptoSerializable = CryptoSerializable;
//# sourceMappingURL=CryptoSerializable.js.map