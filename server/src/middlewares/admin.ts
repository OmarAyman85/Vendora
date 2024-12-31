import { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "../exceptions/Unauthorized";
import { ErrorCode } from "../exceptions/root";

const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.body.user;
  if (user.role == "ADMIN") next();
  else
    next(new UnauthorizedException("Unauthorized !!!", ErrorCode.UNAUTHORIZED));
};

export default adminMiddleware;
