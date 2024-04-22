import { CoreBuffer } from "./CoreBuffer";
export declare class BaseX {
    constructor(alphabet: string);
    private alphabet;
    private baseMap;
    private base;
    private leader;
    private factor;
    private iFactor;
    private initializeAlphabet;
    encode(source: CoreBuffer): string;
    decode(source: string): CoreBuffer;
}
