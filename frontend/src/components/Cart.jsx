import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./app.css";

const Cart = ({ onClose }) => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  //   const [items, setItems] = useState(cart.items);
  const { items } = cart;

  const handleCheckout = () => {
    navigate("/checkout");
    onClose();
  };
  return (
    <div className="cart-container ">
      <div className="row justify-content-between bg-primary m-0">
        <div className="col-6">
          <h2>
            Cart (<small>{items.length}</small>)
          </h2>
        </div>
        <div className="col-2 my-auto">
          <button className="btn" onClick={onClose}>
            X
          </button>
        </div>
      </div>
      {items.length === 0 ? (
        <div>Cart is empty</div>
      ) : (
        <div className="p-5">
          <div>
            {items.map((item) => (
              <div key={item.id} className="row py-3">
                <img src={item.image} alt="..." className="col-4" />
                <div className="col-8">
                  <div className="row">
                    <h5 className="col-8">{item.name}</h5>
                    <p className="col-4">${item.price}</p>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <button>-</button>
                      <span>{item.quantity}</span>
                      <button>+</button>
                    </div>
                    <button className="col-6">remove</button>
                  </div>
                </div>
              </div>
            ))}
            <p>Apply discount code</p>
            <div className="row justify-content-between ">
              <input
                className="col-8"
                type="text"
                placeholder="20 DOLLAR OFF"
              />
              <button className="col-3 btn btn-primary">Apply</button>
            </div>
          </div>
          <div className="py-2 ">
            <p>Subtotal: ${cart.total}</p>
            <p>Tax: ${cart.tax}</p>
            <p>Discount: -${cart.discount}</p>
            <p>Estimated total: ${cart.total + cart.tax - cart.discount}</p>
          </div>
          <div className="row">
            <button className="btn btn-primary " onClick={handleCheckout}>
              Continue to checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
