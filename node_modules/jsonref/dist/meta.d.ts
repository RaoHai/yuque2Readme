export interface Registry {
    [uri: string]: any;
}
export interface Options {
    scope: string;
    registry?: Registry;
    refs?: Set<string>;
}
export interface Meta {
    registry: Registry;
    refs: Set<string>;
    scope: string;
    root: any;
    parent?: any;
    derefd?: boolean;
}
export declare const LII_RE: RegExp;
export declare function normalizeUri(input: string, scope?: string): string;
export declare function isRef(obj: any): boolean;
export declare function isAnnotated(obj: any): boolean;
export declare function isDerefd(obj: any): boolean;
export declare function getMeta(obj: any): Meta;
export declare function getKey(obj: any): string | number | undefined;
export declare function getById(obj: any, id: string): any;
export declare function annotate(obj: any, options: Options): any;
export declare function missingRefs(obj: any): string[];
export declare function normalize(obj: any): any;
