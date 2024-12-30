import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors";
import { signUpSchema } from "./schema/users";
//-----------------------------------------------------------
dotenv.config();
const PORT = process.env.PORT || 5001;
//-----------------------------------------------------------
const app: Express = express();
//-----------------------------------------------------------
app.use(express.json());
//-----------------------------------------------------------
app.use("/", rootRouter);
//-----------------------------------------------------------
export const prismaCLient = new PrismaClient({
  log: ["query"],
});
//-----------------------------------------------------------
app.use(errorMiddleware);
//-----------------------------------------------------------
app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
