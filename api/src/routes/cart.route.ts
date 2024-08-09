import { Router } from "express";
import {
  AddToCart,
  ClearCart,
  DeleteCartItem,
  GetAllCartItems,
} from "../controllers/cart.controller";
import asyncErrorHandler from "../lib/async-error-handler";

const cartRouter = Router();

cartRouter
  .route("")
  .get(asyncErrorHandler(GetAllCartItems))
  .post(asyncErrorHandler(AddToCart))
  .delete(asyncErrorHandler(ClearCart));

cartRouter.delete("/:productId", asyncErrorHandler(DeleteCartItem));

export default cartRouter;
