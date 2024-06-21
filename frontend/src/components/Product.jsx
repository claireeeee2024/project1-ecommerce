import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useCreateCartItemMutation } from "../slices/cartSlice";
import './Product.css';

const Product = ({ product }) => {
    const userInfo = useSelector((state) => state.auth.userInfo) || null;
    const [createCartItem] = useCreateCartItemMutation();
    const navigate = useNavigate();
    
    const handleClick = async (newItem) => {
        if (!userInfo) {
          window.alert("Please log in to add items to cart");
            navigate("/login");
          return;
        }

        try {
          await createCartItem({
            userId: userInfo._id,
            newItem: {
              name: newItem.name,
              qty: 1,
              image: newItem.images[0],
              price: newItem.price,
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
        src={product.images[0]}
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
        {product.inStock > 0 ? (
          <Button
            variant="primary"
            onClick={() => handleClick(product)}
          >
            Add to Cart
          </Button>
        ) : (
          <Card.Subtitle>Out of Stock</Card.Subtitle>
        )}
        {userInfo && userInfo.isVendor === true ? (
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
