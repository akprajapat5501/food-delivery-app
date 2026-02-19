import express from "express"
import authMiddleware from "../middlewares/auth.js"
import { listOrders, orderVerify, placeOrder, updateStatus, userOrders } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", orderVerify)
orderRouter.post("/userorders", authMiddleware, userOrders)
orderRouter.get("/list", listOrders)
orderRouter.post("/status", updateStatus)

export default orderRouter;