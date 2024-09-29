import { NextFunction, Request, Response } from 'express';
import { THTTPError } from '../types/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (error: THTTPError, _: Request, res: Response, __: NextFunction) => {
    res.status(error.statusCode).json(error);
}