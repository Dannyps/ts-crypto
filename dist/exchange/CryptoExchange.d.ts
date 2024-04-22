import { CryptoEncryptionAlgorithm } from "../encryption/CryptoEncryption";
import { CryptoExchangeKeypair } from "./CryptoExchangeKeypair";
import { CryptoExchangePublicKey } from "./CryptoExchangePublicKey";
import { CryptoExchangeSecrets } from "./CryptoExchangeSecrets";
export declare const enum CryptoExchangeAlgorithm {
    ECDH_P256 = 1,
    ECDH_P521 = 2,
    ECDH_X25519 = 3
}
export declare class CryptoExchange {
    /**
     * Generates a keypair for the specified key exchange algorithm
     *
     * @param algorithm The [[CryptoExchangeAlgorithm]] for which a keypair should be generated. Defaults to ECDH_X25519
     * @returns A Promise resolving into a [[CryptoExchangeKeypair]] object
     */
    static generateKeypair(algorithm?: CryptoExchangeAlgorithm): Promise<CryptoExchangeKeypair>;
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
    static deriveRequestor(requestorKeypair: CryptoExchangeKeypair, templatorPublicKey: CryptoExchangePublicKey, algorithm?: CryptoEncryptionAlgorithm): Promise<CryptoExchangeSecrets>;
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
    static deriveTemplator(templatorKeypair: CryptoExchangeKeypair, requestorPublicKey: CryptoExchangePublicKey, algorithm?: CryptoEncryptionAlgorithm): Promise<CryptoExchangeSecrets>;
}
