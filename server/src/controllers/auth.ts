import { NextFunction, Request, Response } from "express";
import { prismaCLient } from "..";
import { hashSync, compareSync, compare } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { BadRequest } from "../exceptions/BadRequest";
import { ErrorCode } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/Validation";
import { signUpSchema } from "../schema/users";
import { NotFoundException } from "../exceptions/NotFound";
//-----------------------------------------------------------
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  signUpSchema.parse(req.body);
  const { email, password, name } = req.body;
  let user = await prismaCLient.user.findFirst({ where: { email } });
  if (user) {
    new BadRequest("User Already Exists !!!", ErrorCode.USER_ALREADY_EXISTS);
  }
  user = await prismaCLient.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
    },
  });
  res.json(user);
};
//-----------------------------------------------------------
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let user = await prismaCLient.user.findFirst({ where: { email } });
  if (!user) {
    throw new NotFoundException(
      "User Is Not Found !!!",
      ErrorCode.USER_NOT_FOUND
    );
  }
  if (!compareSync(password, user.password)) {
    throw new BadRequest(
      "Incorrect Password !!!",
      ErrorCode.INCORRECT_PASSWORD
    );
  }
  const token = jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRET!
  );
  res.json({ user, token });
};
//-----------------------------------------------------------
