import { Request, Response } from "express";
import { AddressSchema } from "../schema/users";
import { NotFoundException } from "../exceptions/NotFound";
import { ErrorCode } from "../exceptions/root";
import { User } from "@prisma/client";
import { prismaCLient } from "..";
//-----------------------------------------------------------
export const addAddress = async (req: Request, res: Response) => {
  //AddressSchema.parse(req.body);
  let user: User;
  try {
    user = await prismaCLient.user.findFirstOrThrow({
      where: {
        id: req.body.userId,
      },
    });
  } catch (err) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  delete req.body.user;
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  const address = await prismaCLient.address.create({
    data: {
      ...req.body,
      userId: user.id,
    },
  });
  res.json(address);
};
//-----------------------------------------------------------
export const deleteAddress = async (req: Request, res: Response) => {};
//-----------------------------------------------------------
export const listAddress = async (req: Request, res: Response) => {};
//-----------------------------------------------------------
