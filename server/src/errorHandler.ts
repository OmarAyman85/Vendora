import { NextFunction, Request, Response } from "express";
import { ErrorCode, HttpException } from "./exceptions/root";
import { InternalException } from "./exceptions/InternalException";
import { ZodError } from "zod";
import { BadRequest } from "./exceptions/BadRequest";

export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error) {
      let exception: HttpException;
      if (error instanceof HttpException) {
        exception = error;
      } else {
        if (error instanceof ZodError)
          exception = new BadRequest(
            "Unprocessable entity!!!",
            ErrorCode.UNPROCESSABLE_ENTITY,
            error
          );
        else
          exception = new InternalException(
            "Something went wrong !",
            error,
            ErrorCode.INTERNAL_EXCEPTION
          );
      }
      next(exception);
    }
  };
};
