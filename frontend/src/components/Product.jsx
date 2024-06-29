import React from "react";
import { Card, Button, Form } from "react-bootstrap";
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
  const { data } = useGetItemQuery(
    {
      userId: userInfo?._id,
      itemId: product._id,
    },
    { skip: !userInfo }
  );
  // console.log(data);

  const {
    handleAdd,
    handleMinus,
    handleChange,
    debouncedHandleAdd,
    debouncedHandleMinus,
  } = useCartOperation();

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
        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
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
        <div className="d-flex justify-content-between">
          {product.inStock > 0 && !data?.item?.qty ? (
            <Button variant="primary"  className="flex-grow-1 mx-1"  onClick={() => handleClick(product)}>
              Add
            </Button>
          ) : product.inStock > 0 ? (
            <div style={{ display: "flex", flex: 0.5 }}>
              <Button
                onClick={() =>
                  debouncedHandleMinus(userInfo._id, product._id, data.item.qty)
                }
              >
                -
              </Button>
              <Form.Control
                type="text"
                value={data.item.qty}
                onChange={(e) => handleChange(userInfo._id, product._id, e)}
              />
              <Button className="mr-2"
                onClick={() =>
                  debouncedHandleAdd(
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
            <Link 
              to={`/products/edit/${product._id}`}
              className="btn btn-primary flex-grow-1 mx-1"
            >
              Edit product
            </Link>
          ) : null}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;
