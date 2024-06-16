import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./app.css";

const Cart = ({ onClose }) => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { items } = cart;

  const handleCheckout = () => {
    navigate("/checkout");
    onClose();
  };
  return (
    <div className="cart-container">
      <div>
        <h2>Cart {items.length}</h2>
        <button onClick={onClose}>X</button>
      </div>
      <div>
        {items.map((item) => (
          <div key={item.id}>
            <img src={item.image} alt="..." />
            <div>
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <div>
                <button>-</button>
                <span>{item.quantity}</span>
                <button>+</button>
              </div>
              <button>remove</button>
            </div>
          </div>
        ))}
        <p>Apply discount code</p>
        <div>
          <input type="text" placeholder="20 DOLLAR OFF" />
          <button>Apply</button>
        </div>
      </div>
      <div>
        <p>Subtotal: ${cart.total}</p>
        <p>Tax: ${cart.tax}</p>
        <p>Discount: -${cart.discount}</p>
        <p>Estimated total: ${cart.total + cart.tax - cart.discount}</p>
      </div>
      <button onClick={handleCheckout}>Continue to checkout</button>
    </div>
  );
};

export default Cart;
