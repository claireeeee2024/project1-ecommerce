import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteCartItemMutation,
  useGetCartsQuery,
  useUpdateCartItemMutation,
} from "../slices/cartSlice";
import { useMemo } from "react";
import "./app.css";

const Cart = ({ onClose }) => {
  const navigate = useNavigate();
  const userId = "60c72b2f9b1d8c30d8f8e6e6";
  const { data, error, isLoading } = useGetCartsQuery({
    id: userId,
  });
  console.log(data);

  const [deleteCartItem] = useDeleteCartItemMutation();
  const [updateCartItem] = useUpdateCartItemMutation();

  const handleRemove = async (userId, itemId) => {
    try {
      await deleteCartItem({ userId, itemId }).unwrap();
      console.log(`Item with id ${itemId} is deleted`);
    } catch (error) {
      console.error("Failed to delete the item: ", error);
    }
  };

  const handleAdd = async (userId, itemId) => {
    try {
      await updateCartItem({ userId, itemId, operation: "ADD" }).unwrap();
      console.log(`Item with id ${itemId} is added by 1`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMinus = async (userId, itemId, qty) => {
    try {
      //如果点-1点的过快,这里还是会显示出负数
      if (qty <= 1) {
        handleRemove(userId, itemId);
        return;
      }
      await updateCartItem({ userId, itemId, operation: "MINUS" }).unwrap();
      console.log(`Item with id ${itemId} is minused by 1`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
    onClose();
  };

  const discount = 10;
  const taxRate = 0.1;

  const { qtys, subtotal, tax, total } = useMemo(() => {
    const qtys = data?.cartItems?.reduce((pre, cur) => pre + cur.qty, 0);
    const subtotal = data?.cartItems?.reduce(
      (pre, cur) => pre + cur.price * cur.qty,
      0
    );
    const tax = subtotal * taxRate;
    const total = subtotal + tax - discount;
    return { qtys, subtotal, tax, total };
  }, [data]);

  return (
    <>
      {isLoading ? (
        <p>loading</p>
      ) : error ? (
        <p>Error</p>
      ) : (
        <div className="cart-container ">
          <div className="row justify-content-between bg-primary m-0">
            <div className="col-6">
              <h2>
                Cart (<small>{qtys}</small>)
              </h2>
            </div>
            <div className="col-2 my-auto">
              <button className="btn" onClick={onClose}>
                X
              </button>
            </div>
          </div>
          {data.cartItems?.length === 0 ? (
            <div>Cart is empty</div>
          ) : (
            <div className="p-5 cart-body">
              <div>
                {data.cartItems?.map((item) => (
                  <div key={item._id} className="row py-3">
                    <img src={item.image} alt="..." className="col-4" />
                    <div className="col-8">
                      <div className="row">
                        <h5 className="col-8">{item.name}</h5>
                        <p className="col-4">${item.price}</p>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <button
                            onClick={() =>
                              handleMinus(userId, item._id, item.qty)
                            }
                          >
                            -
                          </button>
                          <span>{item.qty}</span>
                          <button onClick={() => handleAdd(userId, item._id)}>
                            +
                          </button>
                        </div>
                        <button
                          className="col-6"
                          onClick={() => handleRemove(userId, item._id)}
                        >
                          remove
                        </button>
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
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                <p>Tax: ${tax.toFixed(2)}</p>
                <p>Discount: -${discount.toFixed(2)}</p>
                <p>Estimated total: ${total.toFixed(2)}</p>
              </div>
              <div className="row">
                <button className="btn btn-primary " onClick={handleCheckout}>
                  Continue to checkout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Cart;
