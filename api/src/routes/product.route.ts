import { Router } from "express";
import { GetProducts } from "../controllers/product.controller";
import asyncErrorHandler from "../lib/async-error-handler";

const productRouter = Router();

productRouter.get("", asyncErrorHandler(GetProducts));

export default productRouter;
