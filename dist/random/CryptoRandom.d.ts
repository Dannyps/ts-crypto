import { CoreBuffer } from "../CoreBuffer";
export declare enum CryptoRandomCharacterRange {
    Digit = "0123456789",
    DigitEase = "123456789",
    Hex = "0123456789ABCDEF",
    LowerCase = "abcdefghijklmnopqrstuvwxyz",
    LowerCaseEase = "abcdefghijkmnpqrstuvwxyz",
    UpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    UpperCaseEase = "ABCDEFGHJKLMNPQRSTUVWXYZ",
    Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    Alphanumeric = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    AlphanumericEase = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789",
    AlphanumericUpperCaseEase = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789",
    GermanUmlaut = "\u00C4\u00D6\u00DC\u00E4\u00F6\u00FC",
    SpecialCharacters = "!?-_.:,;#+"
}
export interface CryptoRandomCharacterBucket {
    minLength: number;
    maxLength: number;
    allowedChars: string | string[];
}
export declare class CryptoRandom {
    static bytes(length: number): Promise<CoreBuffer>;
    static int(length: number): Promise<number>;
    static array(length: number): Promise<any>;
    static uuid(): string;
    static scramble(input: string): Promise<string>;
    static intBetween(min: number, max: number): Promise<number>;
    static intRandomLength(minLength: number, maxLength: number): Promise<number>;
    static scrambleWithBuckets(buckets: CryptoRandomCharacterBucket[]): Promise<string>;
    static stringWithBuckets(buckets: CryptoRandomCharacterBucket[]): Promise<string>;
    static string(length: number, allowedChars?: string | string[]): Promise<string>;
    static stringRandomLength(minLength: number, maxLength: number, allowedChars?: string | string[]): Promise<string>;
}
