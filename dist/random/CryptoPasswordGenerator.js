"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoPasswordGenerator = exports.CryptoPasswordRange = void 0;
const CryptoError_1 = require("../CryptoError");
const CryptoErrorCode_1 = require("../CryptoErrorCode");
const CryptoRandom_1 = require("./CryptoRandom");
var CryptoPasswordRange;
(function (CryptoPasswordRange) {
    // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member
    CryptoPasswordRange["Default"] = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789!?-_.:,;#+";
})(CryptoPasswordRange || (exports.CryptoPasswordRange = CryptoPasswordRange = {}));
class CryptoPasswordGenerator {
    static async createPassword(minLength, maxLength = 0, allowedCharacters = `${CryptoPasswordRange.Default}`) {
        if (maxLength <= 0) {
            maxLength = minLength;
        }
        return await CryptoRandom_1.CryptoRandom.stringRandomLength(minLength, maxLength, allowedCharacters);
    }
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
    static async createPasswordWithBitStrength(allowedCharacters = `${CryptoPasswordRange.Default}`, bitStrength = 256, delta = 2) {
        const median = Math.round(bitStrength / Math.log2(allowedCharacters.length));
        if (median < 10) {
            throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.PasswordInsecure, `The bit strength of ${bitStrength} results in a password of less than 10 characters.`);
        }
        const useDelta = Math.floor(delta);
        if (useDelta < 0 || useDelta > median / 10) {
            throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.PasswordInsecure, `The delta ${useDelta} results in a possibly too small password with less than ${median - useDelta} characters.`);
        }
        const minLength = median - useDelta;
        const maxLength = median + useDelta;
        return await CryptoRandom_1.CryptoRandom.stringRandomLength(minLength, maxLength, allowedCharacters);
    }
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
    static async createStrongPassword(minLength = 14, maxLength = 20) {
        if (minLength > maxLength)
            maxLength = minLength;
        if (minLength < 14) {
            throw new CryptoError_1.CryptoError(CryptoErrorCode_1.CryptoErrorCode.PasswordInsecure, "The minimum password length should at least be 14 characters.");
        }
        const specialCharacterBucket = {
            minLength: 1,
            maxLength: 1,
            allowedChars: CryptoRandom_1.CryptoRandomCharacterRange.SpecialCharacters
        };
        const lowercaseBucket = { minLength: 1, maxLength: 1, allowedChars: CryptoRandom_1.CryptoRandomCharacterRange.LowerCaseEase };
        const uppercaseBucket = { minLength: 1, maxLength: 1, allowedChars: CryptoRandom_1.CryptoRandomCharacterRange.UpperCaseEase };
        const numberBucket = { minLength: 1, maxLength: 1, allowedChars: "123456789" };
        const alphanumericBucket = {
            minLength: minLength - 4,
            maxLength: maxLength - 4,
            allowedChars: `${CryptoPasswordRange.Default}`
        };
        const password = await CryptoRandom_1.CryptoRandom.stringWithBuckets([
            specialCharacterBucket,
            lowercaseBucket,
            uppercaseBucket,
            numberBucket,
            alphanumericBucket
        ]);
        return await CryptoRandom_1.CryptoRandom.scramble(password);
    }
    static async createUnitPassword() {
        const number1Bucket = { minLength: 1, maxLength: 1, allowedChars: "123456789" };
        const number2Bucket = { minLength: 0, maxLength: 2, allowedChars: "0123456789" };
        const commaBucket = { minLength: 0, maxLength: 1, allowedChars: "," };
        const number3Bucket = { minLength: 0, maxLength: 1, allowedChars: "0123456789" };
        const number4Bucket = { minLength: 1, maxLength: 1, allowedChars: "123456789" };
        const [randomMetric, unit] = await Promise.all([
            CryptoRandom_1.CryptoRandom.stringWithBuckets([number1Bucket, number2Bucket, commaBucket, number3Bucket, number4Bucket]),
            this.createPassword(1, 0, this.UNITS_GERMAN)
        ]);
        return `${randomMetric} ${unit}`;
    }
    static async createElementPassword() {
        const [element, number] = await Promise.all([
            this.createPassword(1, 0, this.ELEMENTS_GERMAN),
            this.createPassword(1, 0, CryptoRandom_1.CryptoRandomCharacterRange.Digit)
        ]);
        return `${element} ${number}`;
    }
}
exports.CryptoPasswordGenerator = CryptoPasswordGenerator;
CryptoPasswordGenerator.ELEMENTS_GERMAN = [
    "Wasserstoff",
    "Helium",
    "Lithium",
    "Beryllium",
    "Bor",
    "Kohlenstoff",
    "Stickstoff",
    "Sauerstoff",
    "Fluor",
    "Neon",
    "Natrium",
    "Magnesium",
    "Aluminium",
    "Silicium",
    "Phosphor",
    "Schwefel",
    "Chlor",
    "Argon",
    "Kalium",
    "Calcium",
    "Scandium",
    "Titan",
    "Vanadium",
    "Chrom",
    "Mangan",
    "Eisen",
    "Cobalt",
    "Nickel",
    "Kupfer",
    "Zink"
];
CryptoPasswordGenerator.UNITS_GERMAN = [
    "Kelvin",
    "Mol",
    "Candela",
    "Mikrosekunden",
    "Nanosekunden",
    "Millisekunden",
    "Sekunden",
    "Minuten",
    "Stunden",
    "Tage",
    "Wochen",
    "Monate",
    "Jahre",
    "Seemeilen",
    "Astronomische Einheiten",
    "Parsecs",
    "Lichtjahre",
    "Millimeter",
    "Zentimeter",
    "Meter",
    "Kilometer",
    "Quadratmeter",
    "Ar",
    "Hektar",
    "Milliliter",
    "Zentiliter",
    "Liter",
    "Kubikmeter",
    "Barrel",
    "Gramm",
    "Kilogramm",
    "Tonnen",
    "Pfund",
    "Zentner",
    "Knoten",
    "Newton",
    "Pascal",
    "Bar",
    "Joule",
    "Kilojoule",
    "Megajoule",
    "Wattstunden",
    "Kilowattstunden",
    "Megawattstunden",
    "Kalorien",
    "Kilokalorien",
    "Elektronenvolt",
    "Watt",
    "Kilowatt",
    "Megawatt",
    "Voltampere",
    "Ampere",
    "Milliampere",
    "Ohm",
    "Siemens",
    "Coulomb",
    "Amperestunde",
    "Milliamperestunde",
    "Farad",
    "Kelvin",
    "Grad Celsius",
    "Lumen",
    "Lux",
    "Bit",
    "Byte",
    "Kilobyte",
    "Megabyte",
    "Gigabyte",
    "Terabyte",
    "Etabyte"
];
//# sourceMappingURL=CryptoPasswordGenerator.js.map