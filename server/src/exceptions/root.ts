export class HttpException extends Error {
  message: string;
  statusCode: number;
  errorCode: ErrorCode;
  errors: any;

  constructor(
    message: string,
    statusCode: number,
    errorCode: ErrorCode,
    error: any
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.errors = error;
  }
}

export enum ErrorCode {
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXISTS = 1002,
  INCORRECT_PASSWORD = 1003,
  UNPROCESSABLE_ENTITY = 2001,
  INTERNAL_EXCEPTION = 3001,
  UNAUTHORIZED = 5001,
  PRODUCT_NOT_FOUND = 6001,
}
