import express from "express";
import {
  getCartItems,
  createCartItem,
  updateCartItem,
  deleteCartItem,
  getCartItemById,
  getCartTotal,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/total/:userId", getCartTotal);
router.get("/:userId", getCartItems);
router.post("/", createCartItem);
router.put("/", updateCartItem);
router.delete("/", deleteCartItem);
router.get("/:userId/:itemId", getCartItemById);

export default router;
