import React, { useState, useEffect } from "react";
import { useGetCartsQuery } from "../slices/cartApiSlice";
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormControl, Button } from "react-bootstrap";
import "./app.css";
import { useCartOperation } from "../utils/changeCartItems";
import { BASE_URL } from "../constants";
import { setQtys, setTotal } from "../slices/cartSlice";

const Cart = ({ onClose }) => {
  const userId = useSelector((state) => state.auth.userInfo._id) || null;
  const { data, error, isLoading } = useGetCartsQuery({
    id: userId,
  });
  console.log(data);

  const [input, setInput] = useState("");

  const [discount, setDiscount] = useState(() => {
    // 尝试从localStorage中读取存储的discount值
    const savedDiscount = localStorage.getItem("discount");
    return savedDiscount !== null ? JSON.parse(savedDiscount) : 10;
  });
  const taxRate = 0.1;
  const dispatch = useDispatch();

  const { qtys, subtotal, tax, total } = useMemo(() => {
    const qtys = data?.cartItems?.reduce((pre, cur) => pre + cur.qty, 0);
    dispatch(setQtys(qtys));
    const subtotal = data?.cartItems?.reduce(
      (pre, cur) => pre + cur.price * cur.qty,
      0
    );
    const tax = subtotal * taxRate;
    let total = subtotal + tax - discount;
    total = total > 0 ? total : 0;
    dispatch(setTotal(subtotal));
    return { qtys, subtotal, tax, total };
  }, [data, discount, dispatch]);

  // 当变化时，将其保存到localStorage
  useEffect(() => {
    localStorage.setItem("discount", JSON.stringify(discount));
    localStorage.setItem("qtys", JSON.stringify(qtys));
    localStorage.setItem("total", JSON.stringify(total));
  }, [discount, qtys, total]);

  const handleApply = () => {
    const coupon = parseInt(input);
    console.log(coupon);
    if (isNaN(coupon)) {
      setDiscount(0);
      return;
    }
    setDiscount(coupon);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleApply();
    }
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const {
    handleCheckout,
    handleRemove,
    debouncedHandleAdd,
    debouncedHandleMinus,
  } = useCartOperation();

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error</p>
      ) : (
        <div className="cart-container">
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
            <div className="p-5 cart-body">Cart is empty</div>
          ) : (
            <div className="p-5 cart-body">
              <div className="cart-items">
                {data.cartItems?.map((item) => (
                  <div key={item._id} className="row py-3">
                    <img
                      src={`${BASE_URL}${item.image}`}
                      alt="..."
                      className="col-4"
                    />
                    <div className="col-8">
                      <div className="row">
                        <h5 className="col-8">{item.name}</h5>
                        <p className="col-4">${item.price}</p>
                      </div>
                      <div className="row">
                        {item.qty > 0 ? (
                          <div className="col-8 d-flex justify-content-between align-items-center">
                            <Button
                              onClick={() =>
                                debouncedHandleMinus(
                                  userId,
                                  { _id: item.id, price: item.price },
                                  item.qty
                                )
                              }
                            >
                              -
                            </Button>
                            <FormControl
                              type="text"
                              value={item.qty}
                              readOnly
                            />
                            <Button
                              onClick={() =>
                                debouncedHandleAdd(
                                  userId,
                                  {
                                    _id: item.id,
                                    price: item.price,
                                    inStock: item.inStock,
                                  },
                                  item.qty
                                )
                              }
                            >
                              +
                            </Button>
                          </div>
                        ) : (
                          <div className="col-8 d-flex justify-content-between align-items-center">
                            <Button
                              variant="secondary"
                              style={{ fontSize: "13px" }}
                              className=" mx-1"
                            >
                              Out of Stock
                            </Button>
                          </div>
                        )}

                        <Button
                          className="nav-link active btn btn-link col-4 "
                          onClick={() => handleRemove(userId, item.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="apply-discount my-3">
                <p>Apply discount code</p>
                <div className="row justify-content-between">
                  <input
                    id="coupon"
                    className="col-8"
                    type="text"
                    placeholder="20 DOLLAR OFF"
                    onKeyDown={handleKey}
                    onChange={handleInput}
                  />
                  <Button className="col-3" onClick={handleApply}>
                    Apply
                  </Button>
                </div>
              </div>
              <div className="totals py-2">
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                <p>Tax: ${tax.toFixed(2)}</p>
                <p>Discount: -${discount.toFixed(2)}</p>
                <p>Estimated total: ${total.toFixed(2)}</p>
              </div>
              <div className="row">
                <button className="btn btn-primary" onClick={handleCheckout}>
                  Continue to checkout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
    // <>
    //   {isLoading ? (
    //     <p>loading</p>
    //   ) : error ? (
    //     <p>Error</p>
    //   ) : (
    //     <div className="cart-container ">
    //       <div className="row justify-content-between bg-primary m-0">
    //         <div className="col-6">
    //           <h2>
    //             Cart (<small>{qtys}</small>)
    //           </h2>
    //         </div>
    //         <div className="col-2 my-auto">
    //           <button className="btn" onClick={onClose}>
    //             X
    //           </button>
    //         </div>
    //       </div>
    //       {data.cartItems?.length === 0 ? (
    //         <div className="p-5 cart-body">Cart is empty</div>
    //       ) : (
    //         <div className="p-5 cart-body">
    //           <div>
    //             {data.cartItems
    //               ?.filter((item) => item.qty > 0)
    //               .map((item) => (
    //                 <div key={item._id} className="row py-3">
    //                   <img src={item.image} alt="..." className="col-4" />
    //                   <div className="col-8">
    //                     <div className="row">
    //                       <h5 className="col-8">{item.name}</h5>
    //                       <p className="col-4">${item.price}</p>
    //                     </div>
    //                     <div className="row">
    //                       <div
    //                         className="col-6"
    //                         style={{
    //                           display: "flex",
    //                           justifyContent: "space-between",
    //                         }}
    //                       >
    //                         <Button
    //                           onClick={() =>
    //                             handleMinus(userId, item.id, item.qty)
    //                           }
    //                         >
    //                           -
    //                         </Button>
    //                         <FormControl
    //                           type="text"
    //                           value={item.qty}
    //                           readOnly
    //                         />
    //                         <Button
    //                           onClick={() =>
    //                             handleAdd(userId, item.id, item.qty)
    //                           }
    //                         >
    //                           +
    //                         </Button>
    //                       </div>
    //                       <Button
    //                         className="col-6"
    //                         onClick={() => handleRemove(userId, item.id)}
    //                       >
    //                         remove
    //                       </Button>
    //                     </div>
    //                   </div>
    //                 </div>
    //               ))}
    //             <p>Apply discount code</p>
    //             <div className="row justify-content-between ">
    //               <input
    //                 id="coupon"
    //                 className="col-8"
    //                 type="text"
    //                 placeholder="20 DOLLAR OFF"
    //                 onKeyDown={handleKey}
    //                 onChange={handleInput}
    //               />
    //               <Button className="col-3" onClick={handleApply}>
    //                 Apply
    //               </Button>
    //             </div>
    //           </div>
    //           <div className="py-2 ">
    //             <p>Subtotal: ${subtotal.toFixed(2)}</p>
    //             <p>Tax: ${tax.toFixed(2)}</p>
    //             <p>Discount: -${discount.toFixed(2)}</p>
    //             <p>Estimated total: ${total.toFixed(2)}</p>
    //           </div>
    //           <div className="row">
    //             <button className="btn btn-primary " onClick={handleCheckout}>
    //               Continue to checkout
    //             </button>
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   )}
    // </>
  );
};

export default Cart;
