import Cart from "../models/cartModel.js";
import Product from "../models/product.js";
import asyncHandler from "../middleware/asyncHandler.js";
import mongoose from "mongoose";

// @desc    Get cart total quantity and price
// @route   Get /api/carts/total/:userId
// @access  Public
export const getCartTotal = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({
    user: new mongoose.Types.ObjectId(req.params.userId),
  });
  console.log("cart", cart);
  if (!cart) {
    return res.status(200).json({
      totalQuantity: 0,
      totalPrice: 0,
    });
  } else {
    return res.status(200).json({
      totalQuantity: cart.totalQuantity,
      totalPrice: cart.totalPrice,
    });
  }
});

// @desc    Get all cart items
// @route   Get /api/carts/:userId
// @access  Public
export const getCartItems = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  const cart = await Cart.findOne({
    user: new mongoose.Types.ObjectId(req.params.userId),
  });
  // console.log("cart: ", cart);
  if (!cart) {
    const newCart = new Cart({
      user: req.params.userId,
      cartItems: [],
      totalPrice: 0,
      totalQuantity: 0,
    });
    await newCart.save();
    return res.status(200).json({ cartItems: newCart.cartItems });
  }

  const products = await Product.find();
  let cartItems = cart.cartItems;
  const result = cartItems
    .map((item) => {
      const product = products.find((product) =>
        product._id.equals(new mongoose.Types.ObjectId(item.id))
      );
      if (product) {
        if (product.inStock <= 0) {
          return {
            ...item.toObject(),
            name: product.name,
            price: product.price,
            image: product.images[0],
            inStock: 0,
            qty: 0,
          };
        } else {
          if (product.inStock <= item.qty) {
            return {
              ...item.toObject(),
              name: product.name,
              price: product.price,
              image: product.images[0],
              inStock: product.inStock,
              qty: product.inStock,
            };
          } else {
            return {
              ...item.toObject(),
              name: product.name,
              price: product.price,
              image: product.images[0],
              inStock: product.inStock,
            };
          }
        }
      }
      return null;
    })
    .filter((item) => item !== null);
  console.log("result", result);
  cart.cartItems = result;
  const newTotalPrice = result.reduce(
    (pre, cur) => pre + cur.qty * cur.price,
    0
  );
  const newTotalQuantity = result.reduce((pre, cur) => pre + cur.qty, 0);
  console.log("newTotalP: ", newTotalPrice);
  console.log("newTotalQ: ", newTotalQuantity);
  cart.totalPrice = newTotalPrice;
  cart.totalQuantity = newTotalQuantity;
  await cart.save();
  console.log("cart: ", cart);
  res.status(200).json({ cartItems: result });
});

// @desc    Get cart item bu id
// @route   Get /api/carts/:userId/:itemId
// @access  Public
export const getCartItemById = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({
    user: new mongoose.Types.ObjectId(req.params.userId),
  });
  if (!cart) {
    return res.status(200);
  }
  const item = cart.cartItems.find((item) => item.id === req.params.itemId);
  res.status(200).json({ item });
});

// @desc    Add a new item into the cart
// @route   POST /api/carts/
// @access  Public
export const createCartItem = asyncHandler(async (req, res) => {
  const { userId, newItem } = req.body;
  const cart = await Cart.findOne({
    user: new mongoose.Types.ObjectId(userId),
  });
  //   console.log("cart: ", cart);
  if (!cart) {
    const newCart = new Cart({
      user: userId,
      cartItem: [newItem],
      totalQuantity: 1,
      totalPrice: newItem.price,
    });
    await newCart.save();
    return res.status(201).json({ cartItems: cart.cartItems });
  }
  cart.cartItems.push(newItem);
  cart.totalQuantity += 1;
  cart.totalPrice += newItem.price;
  await cart.save();
  res.status(201).json({ cartItems: cart.cartItems });
});

// @desc    Add or minus the qty of the item
// @route   PUT /api/carts/
// @access  Public
export const updateCartItem = asyncHandler(async (req, res) => {
  let { userId, itemId, operation } = req.body;
  //   console.log("userid: ", userId);
  //   console.log("itemid: ", itemId);
  //   console.log("operation: ", operation);

  const cart = await Cart.findOne({
    user: new mongoose.Types.ObjectId(userId),
  });
  const item = cart.cartItems.find((item) => item.id === itemId);
  if (operation == "ADD") {
    item.qty = item.qty + 1;
    cart.totalQuantity = cart.totalQuantity + 1;
    cart.totalPrice = cart.totalPrice + item.price;
  } else if (operation == "MINUS") {
    item.qty = item.qty - 1;
    cart.totalQuantity = cart.totalQuantity - 1;
    cart.totalPrice = cart.totalPrice - item.price;
  } else {
    item.qty = parseInt(operation) || 1;
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

  //   itemId = new mongoose.Types.ObjectId(itemId);

  const updatedCartItems = cart.cartItems.filter((item) => item.id !== itemId);
  //   console.log("update: ", updatedCartItems);
  cart.cartItems = updatedCartItems;
  cart.totalPrice = cart.cartItems.reduce(
    (pre, cur) => pre + cur.price * cur.qty,
    0
  );
  cart.totalQuantity = cart.cartItems.reduce((pre, cur) => pre + cur.qty, 0);
  await cart.save();

  console.log("successfully delete: " + itemId);

  res.status(200).json({ message: "Item removed from cart", cart });
});
