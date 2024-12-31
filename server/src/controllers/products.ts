import { Request, Response } from "express";
import { prismaCLient } from "..";
import { createProductSchema } from "../schema/products";

export const createProduct = async (req: Request, res: Response) => {
  createProductSchema.parse(req.body);
  console.log("I am here and the req body is 1: ", req.body);
  delete req.body.user;
  const product = await prismaCLient.product.create({
    data: {
      ...req.body,
      tags: req.body.tags.join(","),
    },
  });
  console.log("I am here and the req body is : ", req.body);
  res.json(product);
};
