import React, { useState } from "react";
import { Card, Button, FormControl } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useCreateCartItemMutation,
  useGetItemQuery,
} from "../slices/cartSlice";
import "./Product.css";
import { useCartOperation } from "../utils/changeCartItems";
import { BASE_URL } from "../constants";

const Product = ({ product }) => {
  const userInfo = useSelector((state) => state.auth.userInfo) || null;
  const navigate = useNavigate();
  const [createCartItem] = useCreateCartItemMutation();
  const { data } = useGetItemQuery({
    userId: userInfo?._id,
    itemId: product._id,
  });
  // console.log(data);

  const { handleAdd, handleMinus, handleChange } = useCartOperation();

  const handleClick = async (newItem) => {
    if (!userInfo) {
      window.alert("Please log in to add items to cart");
      navigate("/login");
      return;
    }
    try {
      console.log(userInfo._id);
      await createCartItem({
        userId: userInfo._id,
        newItem: {
          name: newItem.name,
          qty: 1,
          image: newItem.images[0],
          price: newItem.price,
          id: newItem._id,
        },
      }).unwrap();
      console.log(`Item with id ${newItem._id} is added`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="card-hover my-3 p-3 rounded">
      <Card.Img
        variant="top"
        src={`${BASE_URL}${product.images[0]}`}
        className="product-image"
      />
      <Card.Body>
        <Link to={`/products/${product._id}`}>
          <Card.Title className="product-name">{product.name}</Card.Title>
        </Link>
        <Card.Text as="h4" className="product-price">
          ${product.price}
        </Card.Text>

        <Card.Text className="product-category">{product.category}</Card.Text>
        <div className="d-flex">
          {product.inStock > 0 && !data?.item?.qty ? (
            <Button variant="primary" onClick={() => handleClick(product)}>
              Add to Cart
            </Button>
          ) : product.inStock > 0 ? (
            <div style={{ display: "flex", flex: 0.5 }}>
              <Button
                onClick={() =>
                  handleMinus(userInfo._id, product._id, data.item.qty)
                }
              >
                -
              </Button>
              <FormControl
                type="text"
                value={data.item.qty}
                onChange={(e) => handleChange(userInfo._id, product._id, e)}
              />
              <Button
                onClick={() =>
                  handleAdd(
                    userInfo._id,
                    product._id,
                    data.item.qty,
                    product.inStock
                  )
                }
              >
                +
              </Button>
            </div>
          ) : (
            <Card.Subtitle>Out of Stock</Card.Subtitle>
          )}
          {userInfo &&
          userInfo.isVendor === true &&
          userInfo._id.toString() === product.vendor.toString() ? (
            <Button variant="primary" className="mr-2">
              Edit product
            </Button>
          ) : null}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;
