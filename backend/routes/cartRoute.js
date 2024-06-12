import express from "express";
import mongoose from "mongoose";
import Cart from "../models/cartModel.js";

const router = express.Router();

//return all the items in this user's cart
router.get("/", async (req, res) => {
  const { userId } = req.query;

  try {
    // 查找用户的购物车
    console.log(userId);
    const cart = await Cart.findOne({
      _id: new mongoose.Types.ObjectId(userId),
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ cartItems: cart.cartItems });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//add a new item into this cart
router.post("/add", async (req, res) => {
  try {
    // console.log(req.body);
    const { userId, newItem } = req.body;
    const cart = await Cart.findOne({
      user: new mongoose.Types.ObjectId(userId),
    });
    // console.log(cart);
    if (cart) {
      cart.cartItems.push(newItem);
      await cart.save();
      res.status(200).json({ cart });
    } else {
      const newCart = new Cart({ user: userId, cartItems: [newItem] });
      await newCart.save();
      res.status(200).json({ newCart });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//change the existing item quatity
router.put("/change", async (req, res) => {});

//remove the item from this user's cart
router.delete("/", async (req, res) => {
  let { userId, itemId } = req.body;

  if (!userId || !itemId) {
    return res
      .status(400)
      .json({ message: "User ID and Item ID are required" });
  }

  try {
    const cart = await Cart.findOne({
      user: new mongoose.Types.ObjectId(userId),
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    itemId = new mongoose.Types.ObjectId(itemId);

    const updatedCartItems = cart.cartItems.filter(
      (item) => item._id !== itemId
    );

    cart.cartItems = updatedCartItems;
    await cart.save();

    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
