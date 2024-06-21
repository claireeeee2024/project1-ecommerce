import express from "express";
import {
  getCartItems,
  createCartItem,
  updateCartItem,
  deleteCartItem,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/:id", getCartItems);
router.post("/", createCartItem);
router.put("/", updateCartItem);
router.delete("/", deleteCartItem);

export default router;
