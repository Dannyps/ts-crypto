export declare enum CryptoPasswordRange {
    Default = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789!?-_.:,;#+"
}
export declare class CryptoPasswordGenerator {
    static readonly ELEMENTS_GERMAN: string[];
    static readonly UNITS_GERMAN: string[];
    static createPassword(minLength: number, maxLength?: number, allowedCharacters?: string | string[]): Promise<string>;
    /**
     * Creates a password with a given bitStrength
     *
     * @param allowedCharacters {string|string[]} - A string or an array of characters to
     * use as the possible characters within this password.
     * Default: CryptoPasswordRange.Default
     * @param bitStrength {number} - The bit strength equivalent of the password.
     * Default: 256
     * @param delta {number} - The number of characters to shorten/lengthen the password
     * in order to receive a dynamic-length password. Default: 2
     */
    static createPasswordWithBitStrength(allowedCharacters?: string | string[], bitStrength?: number, delta?: number): Promise<string>;
    /**
     * Creates a "strong" password out of a scramble of the following character sets:
     *
     * - 1 special character out of RandomCharacterRange.SpecialCharacters
     * - 1 lowercase character out of RandomCharacterRange.LowerCaseEase
     * - 1 uppercase character out of RandomCharacterRange.UpperCaseEase
     * - 1 number out of RandomCharacterRange.DigitEase
     * - A random number of characters (between minLength and maxLength) out of PasswordRange.Default
     *
     * @param minLength
     * @param maxLength
     */
    static createStrongPassword(minLength?: number, maxLength?: number): Promise<string>;
    static createUnitPassword(): Promise<string>;
    static createElementPassword(): Promise<string>;
}
