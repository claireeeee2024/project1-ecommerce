import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCartItems, setCartItems } from "../slices/cartSlice";
const TestScreen = () => {
  const dispatch = useDispatch();
  const handleClick = (item) => {
    dispatch(addCartItems({ ...item }));
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then((res) => res.json())
      .then((info) => {
        setData(info.products);
        console.log("data:", data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return data.map((item, index) => (
    <div style={{ border: "solid" }} key={index}>
      <div>name: {item.name}</div>
      <div>price: {item.price}</div>
      <div>qty: {item.inStock}</div>
      {/* {从redux中检查这个商品是否存在购物车中,如果存在就显示-qty+,如果不存在就显示Add} */}
      <button onClick={() => handleClick(item)}> Add</button>
    </div>
  ));
};

export default TestScreen;