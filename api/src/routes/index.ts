import { Router } from "express";
import cartRouter from "./cart.route";
import productRouter from "./product.route";

const globalRouter = Router();

globalRouter.use("/cart", cartRouter);
globalRouter.use("/products", productRouter);

export default globalRouter;
