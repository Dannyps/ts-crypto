"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoExchange = void 0;
const CryptoError_1 = require("../CryptoError");
const CryptoErrorCode_1 = require("../CryptoErrorCode");
class CryptoExchange {
    /**
     * Generates a keypair for the specified key exchange algorithm
     *
     * @param algorithm The [[CryptoExchangeAlgorithm]] for which a keypair should be generated. Defaults to ECDH_X25519
     * @returns A Promise resolving into a [[CryptoExchangeKeypair]] object
     */
    static async generateKeypair(algorithm = 3 /* CryptoExchangeAlgorithm.ECDH_X25519 */) {
        throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.NotYetImplemented);
    }
    /**
     * Derives session keys from the given private exchange keypair and the given public
     * exchange keypair of another party. Please ensure, that the server/sender/from entity
     * calls the deriveRequestor method, whereas the counterparty (client/recipient/to entity)
     * needs to call the deriveTemplator method, in order to derive the working keys.
     *
     * The method derives two separate secret keys: One for transmission (transmissionKey) and
     * one for receiving (receivingKey). Please only use the respective keys for their purpose.
     *
     * @param requestorKeypair The [[CryptoExchangeKeypair]] of the sending side
     * @param templatorPublicKey The [[CryptoExchangePublicKey]] of the receiving side
     * @param algorithm The [[CryptoEncryptionAlgorithm]] algorithm for which the secret keys should
     * be generated.
     * @returns A Promise resolving into a [[CryptoExchangeSecrets]] object, containing the shared keys
     * for transmission and receiving.
     */
    static async deriveRequestor(requestorKeypair, templatorPublicKey, algorithm = 3 /* CryptoEncryptionAlgorithm.XCHACHA20_POLY1305 */) {
        throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.NotYetImplemented);
    }
    /**
     * Derives session keys from the given private exchange keypair and the given public
     * exchange keypair of another party. Please ensure, that the server/sender/from entity
     * calls the deriveRequestor method, whereas the counterparty (client/recipient/to entity)
     * needs to call the deriveTemplator method, in order to derive the working keys.
     *
     * The method derives two separate secret keys: One for transmission (transmissionKey) and
     * one for receiving (receivingKey). Please only use the respective keys for their purpose.
     *
     * @param templatorKeypair The [[CryptoExchangeKeypair]] of the receiving side
     * @param requestorPublicKey The [[CryptoExchangePublicKey]] of the sending side
     * @param algorithm The [[CryptoEncryptionAlgorithm]] algorithm for which the secret keys should
     * be generated.
     * @returns A Promise resolving into a [[CryptoExchangeSecrets]] object, containing the shared keys
     * for transmission and receiving.
     */
    static async deriveTemplator(templatorKeypair, requestorPublicKey, algorithm = 3 /* CryptoEncryptionAlgorithm.XCHACHA20_POLY1305 */) {
        throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.NotYetImplemented);
    }
}
exports.CryptoExchange = CryptoExchange;
//# sourceMappingURL=CryptoExchange.js.map