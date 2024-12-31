import { Request, Response } from "express";
import { AddressSchema } from "../schema/users";
import { prismaCLient } from "..";
import { NotFoundException } from "../exceptions/NotFound";
import { ErrorCode } from "../exceptions/root";
//-----------------------------------------------------------
export const addAddress = async (req: Request, res: Response) => {
  AddressSchema.parse(req.body);
  const { user, ...restOfBody } = req.body;
  const address = await prismaCLient.address.create({
    data: {
      ...restOfBody,
      userId: req.body.user.id,
    },
  });
  res.json(address);
};
//-----------------------------------------------------------
export const deleteAddress = async (req: Request, res: Response) => {
  try {
    await prismaCLient.address.delete({
      where: {
        id: +req.params.id,
      },
    });
    res.status(204).json({ success: true });
  } catch (err) {
    throw new NotFoundException(
      "Address Not FOund !!!",
      ErrorCode.ADDRESS_NOT_FOUND
    );
  }
};
//-----------------------------------------------------------
export const listAddress = async (req: Request, res: Response) => {
  const addresses = await prismaCLient.address.findMany({
    where: {
      userId: req.body.user.id,
    },
  });
  res.json(addresses);
};
//-----------------------------------------------------------
