import { Request, Response } from "express";
import { prismaCLient } from "..";
import { createProductSchema } from "../schema/products";
import { NotFoundException } from "../exceptions/NotFound";
import { ErrorCode } from "../exceptions/root";
//-----------------------------------------------------------
export const createProduct = async (req: Request, res: Response) => {
  createProductSchema.parse(req.body);
  const { user, ...restOfBody } = req.body;
  const product = await prismaCLient.product.create({
    data: {
      ...restOfBody,
      tags: req.body.tags.join(","),
    },
  });
  console.log("I am here and the req body is : ", req.body);
  res.json(product);
};
//-----------------------------------------------------------
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { user, ...restOfBody } = req.body;
    const product = restOfBody;
    if (product.tags) {
      product.tags = product.tags.join(",");
    }
    const updatedProduct = await prismaCLient.product.update({
      where: {
        id: +req.params.id,
      },
      data: product,
    });
    res.status(201).json(updatedProduct);
  } catch (err) {
    throw new NotFoundException(
      "Product is not found !!",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }
};
//-----------------------------------------------------------
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await prismaCLient.product.delete({
      where: {
        id: +req.params.id,
      },
    });
    res.status(204).json({ success: true });
  } catch (err) {
    throw new NotFoundException(
      "Product is not found !!",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }
};
//-----------------------------------------------------------
export const listProducts = async (req: Request, res: Response) => {
  const count = await prismaCLient.product.count(); // for pagination
  const products = await prismaCLient.product.findMany({
    skip: +req.query.skip! || 0,
    take: 5,
  });
  res.json({
    count,
    data: products,
  });
};
//-----------------------------------------------------------
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await prismaCLient.product.findFirstOrThrow({
      where: {
        id: +req.params.id,
      },
    });
    res.json(product);
  } catch (err) {
    throw new NotFoundException(
      "Product is not found !!",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }
};
//-----------------------------------------------------------
