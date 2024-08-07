import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  cartItems: [
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      inStock: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      id: { type: String, required: true },
    },
  ],
  totalQuantity: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
});
const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
