import type { NextFunction, Request, Response, RequestHandler } from "express";

const asyncErrorHandler =
  (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export default asyncErrorHandler;
