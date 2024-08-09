import type { Response } from "express";

interface ResponseData<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string | object;
}

function sendResponse<T>(
  res: Response,
  statusCode: number,
  message?: string,
  data?: T,
  error?: string | object
): void {
  const success = statusCode >= 200 && statusCode < 300;

  const responsePayload: ResponseData<T> = {
    success,
    message,
    data,
    error,
  };

  res.status(statusCode).json(responsePayload);
}

export { sendResponse };
