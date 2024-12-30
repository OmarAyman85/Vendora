import { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "../exceptions/Unauthorized";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { prismaCLient } from "..";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1. extract the token from the header
  const token = req.headers.authorization;
  // 2. if token is not present, throw an unauthorized error
  if (!token) {
    return next(
      new UnauthorizedException("Unauthorized !!!", ErrorCode.UNAUTHORIZED)
    );
  }
  try {
    // 3. if token is present, verify that token adn extract the payload
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    // 4. get the user from the payload
    const user = await prismaCLient.user.findFirst({
      where: { id: payload.userId },
    });
    if (!user) {
      next(
        new UnauthorizedException("Unauthorized !!!", ErrorCode.UNAUTHORIZED)
      );
    }
    // 5. attach the user to the current request object
    req.body.user = user;
    next();
  } catch (error) {
    next(new UnauthorizedException("Unauthorized !!!", ErrorCode.UNAUTHORIZED));
  }
};

export default authMiddleware;
