export class AppError extends Error {
  public statusCode: number;
  public code?: string;

  constructor(message: string | any, statusCode: number, code: string = '') {
    super(message);

    this.statusCode = statusCode;
    this.code = code;

    Error.captureStackTrace(this, this.constructor);
  }
}
