import { ISerializable, Serializable } from "@js-soft/ts-serval";
/**
 * Supported string encoding types.
 */
export declare enum Encoding {
    /** String is ASCII encoded, values 0-127 equal values 128-255 */
    Ascii = "ascii",
    /** String is Base64 encoded */
    Base64 = "base64",
    Base64_NoPadding = "base64_nopadding",
    /** String is Base64 encoded */
    Base64_UrlSafe_NoPadding = "base64_urlsafe_nopadding",
    /** String contains comma-separated decimal values (0-255) */
    Csv = "csv",
    /** String contains hexadecimal encoded-bytes AB => 171 */
    Hex = "hex",
    /** String is PEM encoded with Base64 buffer content and pre- and succeeding labels */
    Pem = "pem",
    /** String is Latin1 encoded */
    Latin1 = "latin1",
    /** String is UTF-8 encoded */
    Utf8 = "utf8"
}
export interface ICoreBuffer extends ISerializable, IClearable {
    /** The underlying native Buffer/Uint8Array object */
    readonly buffer: Uint8Array;
    readonly length: number;
    /**
     * Checks if the current buffer equals the given buffer
     *
     * @param compare The buffer to compare to
     */
    equals(compare: ICoreBuffer): boolean;
    toString(encoding: Encoding, label?: string): string;
    toBase64(): string;
    toBase64URL(): string;
    toUtf8(): string;
    toArray(): Number[];
    append(buffer: ICoreBuffer): void;
    prepend(buffer: ICoreBuffer): void;
}
export interface IClearable {
    clear(): void;
}
export interface ICoreBufferStatic {
    new (): ICoreBuffer;
    fromBase64(value: string): ICoreBuffer;
    fromUtf8(value: string): ICoreBuffer;
    fromString(value: string, encoding: Encoding): ICoreBuffer;
    fromObject(value: any): ICoreBuffer;
}
export declare class CoreBuffer extends Serializable implements ICoreBuffer {
    private _buffer;
    constructor(value?: any);
    get buffer(): Uint8Array;
    get length(): number;
    clone(): CoreBuffer;
    equals(compare: ICoreBuffer): boolean;
    private bufferToCSV;
    private bufferToLatin1;
    private bufferToHex;
    private bufferToBase64;
    private bufferToBase64NoPadding;
    private bufferToBase64URL;
    private bufferToAscii;
    private bufferToUTF8;
    private bufferToPem;
    toBase64(): string;
    toBase58(): string;
    toBase64URL(): string;
    toUtf8(): string;
    clear(): this;
    toString(encoding?: Encoding, label?: string): string;
    toArray(): number[];
    append(buffer: ICoreBuffer): this;
    prepend(buffer: ICoreBuffer): this;
    toJSON(): Object;
    serialize(): string;
    add(value: number): this;
    static fromBase58(value: string): CoreBuffer;
    static from(value: any): CoreBuffer;
    private static hexToBuffer;
    private static latin1ToBuffer;
    private static asciiToBuffer;
    private static base64ToBuffer;
    private static base64NoPaddingToBuffer;
    private static urlSafeBase64WithNoPaddingToBuffer;
    private static utf8ToBuffer;
    private static pemToBuffer;
    static fromBase64(value: string): CoreBuffer;
    static fromBase64URL(value: string): CoreBuffer;
    static fromUtf8(value: string): CoreBuffer;
    static fromString(value: string, encoding: Encoding): CoreBuffer;
    static base64_json(value: string): Object;
    static json_base64(value: Object): string;
    static utf8_base64(value: string): string;
    static base64_utf8(value: string): string;
    static fromObject(value: any): CoreBuffer;
    static random(length: number): CoreBuffer;
}
