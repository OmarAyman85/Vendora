import { Request, Response, NextFunction } from "express";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1. extract the token from the header
  
  // 2. if token is not present, throw an unauthorized error
  
  // 3. if token is present, verify that token adn extract the payload
  
  // 4. get the user from the payload
  
  // 5. attach the user to the current request object
};

export default authMiddleware;
