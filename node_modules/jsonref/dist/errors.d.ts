export declare class RetrieverError extends Error {
    uri: string;
    originalError: Error;
    constructor(uri: string, originalError: Error);
}
export declare class ParserError extends Error {
    scope: string;
    errors?: Error[] | undefined;
    constructor(scope: string, type: string, errors?: Error[] | undefined);
}
export declare class RebaserError extends Error {
    scope: string;
    errors?: Error[] | undefined;
    constructor(scope: string, type: string, errors?: Error[] | undefined);
}
