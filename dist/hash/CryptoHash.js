"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoHash = void 0;
const __1 = require("..");
const CoreBuffer_1 = require("../CoreBuffer");
class CryptoHash {
    /**
     * Hashes the given content with the specified algorithm and compares it to the given hash. Returns
     * a Promise object of the match (which can be true or false).
     *
     * @param content The IBuffer object to be hashed and verified (IS)
     * @param hash The IBuffer object of an already existing hash which acts as the verification (SHOULD BE)
     * @param algorithm The [[CryptoHashAlgorithm]] to be used as the hash algorithm
     * @returns A Promise object, resolved by true if the content matches to the hash, false otherwise
     */
    static async verify(content, hash, algorithm) {
        const hashBuffer = await this.hash(content, algorithm);
        const buffer = new CoreBuffer_1.CoreBuffer(hashBuffer);
        if (buffer.equals(hash)) {
            return true;
        }
        return false;
    }
    /**
     * Hashes the given content with the specified algorithm and returns the hash as a [[Buffer]] object.
     *
     * @param content The IBuffer object to be hashed and verified (IS)
     * @param algorithm The [[CryptoHashAlgorithm]] to be used as the hash algorithm
     * @returns A Promise object, resolving to true if the content matches to the hash, false otherwise
     */
    static async hash(content, algorithm) {
        let hashBuffer;
        switch (algorithm) {
            case 1 /* CryptoHashAlgorithm.SHA256 */:
                throw new __1.CryptoError(__1.CryptoErrorCode.NotYetImplemented);
                break;
            case 2 /* CryptoHashAlgorithm.SHA512 */:
                throw new __1.CryptoError(__1.CryptoErrorCode.NotYetImplemented);
                break;
            default:
                throw new Error("This hash algorithm is not supported.");
        }
        return new CoreBuffer_1.CoreBuffer(hashBuffer);
    }
    /**
     * Helper function which either creates an SHA-256 hash of the given content and returns it
     * as a hex string (when leaving the hash parameter unset) or verifies an already existing
     * SHA-256 hash when the hash parameter is set. Please be advised that the helper functions
     * use utf-8 encoded strings as input encoding and hex as output encoding, rather than the
     * IBuffer objects used in the [[hash]] and [[verify]] methods.
     *
     * @param content The content as string which should should be hashed (IS)
     * @param hash The optional SHA-256 hash of the content (SHOULD BE)
     * @returns A Promise object, either resolving to the SHA-256 hash of the given string (if the
     * hash parameter is omitted. If the hash parameter is given, the Promise is resolving to either
     * true or false, depending if the hashes match or not).
     */
    static async sha256(content, hash) {
        const bufferContent = CoreBuffer_1.CoreBuffer.fromString(content, CoreBuffer_1.Encoding.Utf8);
        if (hash) {
            const bufferHash = CoreBuffer_1.CoreBuffer.fromString(hash, CoreBuffer_1.Encoding.Hex);
            return await this.verify(bufferContent, bufferHash, 1 /* CryptoHashAlgorithm.SHA256 */);
        }
        const created = await this.hash(bufferContent, 1 /* CryptoHashAlgorithm.SHA256 */);
        return created.toString(CoreBuffer_1.Encoding.Hex);
    }
    /**
     * Helper function which either creates an SHA-512 hash of the given content and returns it
     * as a hex string (when leaving the hash parameter unset) or verifies an already existing
     * SHA-512 hash when the hash parameter is set. Please be advised that the helper functions
     * use utf-8 encoded strings as input encoding and hex as output encoding, rather than the
     * IBuffer objects used in the [[hash]] and [[verify]] methods.
     *
     * @param content The content as string which should should be hashed (IS)
     * @param hash The optional SHA-512 hash of the content (SHOULD BE)
     * @returns A Promise object, either resolving to the SHA-512 hash of the given string (if the
     * hash parameter is omitted. If the hash parameter is given, the Promise is resolving to either
     * true or false, depending if the hashes match or not).
     */
    static async sha512(content, hash) {
        const bufferContent = CoreBuffer_1.CoreBuffer.fromString(content, CoreBuffer_1.Encoding.Utf8);
        if (hash) {
            const bufferHash = CoreBuffer_1.CoreBuffer.fromString(hash, CoreBuffer_1.Encoding.Hex);
            return await this.verify(bufferContent, bufferHash, 2 /* CryptoHashAlgorithm.SHA512 */);
        }
        const created = await this.hash(bufferContent, 2 /* CryptoHashAlgorithm.SHA512 */);
        return created.toString(CoreBuffer_1.Encoding.Hex);
    }
}
exports.CryptoHash = CryptoHash;
//# sourceMappingURL=CryptoHash.js.map