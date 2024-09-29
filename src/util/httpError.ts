import { NextFunction, Request } from 'express';
import errorObject from './errorObject';

/**
 * This function is used to formate the error response
 * @param nextFunc: Error function object.
 * @param err: Error object.
 * @param req: Request object.
 * @param errorStatusCode: Error status code.
 */
// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export default (nextFunc: NextFunction, err: Error | unknown, req: Request, errorStatusCode: number = 500): void => {
    const errorObj = errorObject(err, req, errorStatusCode);
    return nextFunc(errorObj);
}