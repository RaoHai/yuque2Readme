export interface Rebaser {
    (id: string, obj: any): any;
}
/**
 * Rebase JSON $refs properties (only) as specified by the rebase function.
 * It modifies the passed object.
 *
 * @param {string} id - id of the JSON (e.g., name of the schema in case of a JSON schema)
 * @param {*} obj - the JSON object
 * @param {Function} rebaser - the function which changes refs values as required by the specific application
 * @throws error - in case of error rebasing the object
 * @returns {*} a copy of the passed JSON object with rebased $refs, in case of success.
 */
export declare function rebase(id: string, obj: any, rebaser?: Rebaser): any;
