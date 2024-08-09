import { isHttpError, type HttpError } from "http-errors";
import { sendResponse } from "../lib/utils";
import type { Request, Response } from "express";

/**
 * Error handler middleware.
 */
function errorHandler(err: HttpError, _: Request, res: Response) {
  console.error(err.stack ?? err);

  let statusCode = 500;

  if (isHttpError(err)) {
    statusCode = err.status;
  }

  sendResponse(
    res,
    statusCode,
    err.message || "Internal Server Error",
    null,
    err.name
  );
}

export default errorHandler;
