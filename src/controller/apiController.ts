import { NextFunction, Request, Response } from 'express';
import httpResponse from '../util/httpResponse';
import httpError from '../util/httpError';

export default {
    self: (req: Request, res: Response, next: NextFunction) => {
        try {
            httpResponse(req, res, 200, 'Operation has been succesful')
        } catch (error) {
            httpError(next, error, req, 500)
        }
    }
}