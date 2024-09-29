/* eslint-disable no-console */
import { Request, Response } from 'express';
import { THTTPResponse } from '../types/types';
import { EApplicationEnvironment } from '../constant/application';
import config from '../config/config';

/**
 * This fucntion is used to formate the response.
 * @param req: Request object
 * @param res: Response object
 * @param responseStatusCode: Response status code
 * @param responseMessage: Response message
 * @param data: Response data
 */
export default (req: Request, res: Response, responseStatusCode: number, responseMessage: string, data: unknown = null): void => {
    const response: THTTPResponse = {
        success: true,
        statusCode: responseStatusCode,
        message: responseMessage,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.url
        },
        data: data
    }

    // Log
    console.info('CONTROLLER_RESPONSE', {
        meta: response
    })

    // Check env
    if (config.ENV === EApplicationEnvironment.PRODUCTION) {
        delete response.request.ip;
    }

    res.status(responseStatusCode).json(response);
}