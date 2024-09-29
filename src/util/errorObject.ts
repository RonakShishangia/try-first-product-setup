/* eslint-disable no-console */
import { Request } from 'express';
import { THTTPError } from '../types/types';
import config from '../config/config';
import { EApplicationEnvironment } from '../constant/application';

/**
 * This function is used to declare error response
 * @param err: Error object.
 * @param req: Request object.
 * @param errorStatusCode: Error status code.
 */
// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export default (err: Error | unknown, req: Request, errorStatusCode: number = 500) => {
    const errorObj: THTTPError = {
        success: false,
        statusCode: errorStatusCode,
        message: err instanceof Error ? err.message || 'Something went wrong.' : 'Something went wrong.',
        request: {
            ip: req.ip,
            method: req.method,
            url: req.originalUrl 
        },
        data: null,
        trace: err instanceof Error ? { error: err.stack } : null
    }

    // Log
    console.info('CONTROLLER_ERROR_RESPONSE', {
        meta: errorObj
    })

    // Check env
    if (config.ENV === EApplicationEnvironment.PRODUCTION) {
        delete errorObj.request.ip;
        delete errorObj.trace
    }

    return errorObj;
}