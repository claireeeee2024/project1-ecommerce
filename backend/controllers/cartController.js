import Cart from "../models/cartModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import mongoose from "mongoose";

// @desc    Get all cart items
// @route   Get /api/carts/:id
// @access  Public
export const getCartItems = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  const cart = await Cart.findOne({
    user: new mongoose.Types.ObjectId(req.params.id),
  });
  console.log(cart);
  if (!cart) {
    const newCart = new Cart({ user: req.params.id, cartItems: [] });
    await newCart.save();
    return res.status(200).json({ cartItems: newCart.cartItems });
  }
  res.status(200).json({ cartItems: cart.cartItems });
});

// @desc    Add a new item into the cart
// @route   POST /api/carts/
// @access  Public
export const createCartItem = asyncHandler(async (req, res) => {
  const { userId, newItem } = req.body;
  const cart = await Cart.findOne({
    user: new mongoose.Types.ObjectId(userId),
  });
  if (!cart) {
    const newCart = new Cart({ user: userId, cartItem: [newItem] });
    await newCart.save();
    return res.status(201).json({ cartItems: cart.cartItems });
  }
  cart.cartItems.push(newItem);
  await cart.save();
  res.status(201).json({ cartItems: cart.cartItems });
});

// @desc    Add or minus the qty of the item
// @route   PUT /api/carts/:itemId
// @access  Public
export const updateCartItem = asyncHandler(async (req, res) => {
  let { userId, itemId, operation } = req.body;
  const cart = await Cart.findOne({
    user: new mongoose.Types.ObjectId(userId),
  });
  itemId = new mongoose.Types.ObjectId(itemId);
  const item = cart.cartItems.find((item) => item._id.equals(itemId));
  if (operation == "ADD") {
    item.qty = item.qty + 1;
  } else {
    item.qty = item.qty - 1;
  }
  await cart.save();
  return res.status(201).json({ cart });
});

// @desc    Delete the given item
// @route   DELETE /api/carts/
// @access  Public
export const deleteCartItem = asyncHandler(async (req, res) => {
  let { userId, itemId } = req.body;

  if (!userId || !itemId) {
    return res
      .status(400)
      .json({ message: "User ID and Item ID are required" });
  }

  const cart = await Cart.findOne({
    user: new mongoose.Types.ObjectId(userId),
  });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  itemId = new mongoose.Types.ObjectId(itemId);

  const updatedCartItems = cart.cartItems.filter(
    (item) => !item._id.equals(itemId)
  );
  //   console.log("update: ", updatedCartItems);
  cart.cartItems = updatedCartItems;
  await cart.save();
  //   console.log("successfully delete");

  res.status(200).json({ message: "Item removed from cart", cart });
});
