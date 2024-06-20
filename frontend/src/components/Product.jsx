import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Product.css";
import { useCreateCartItemMutation } from "../slices/cartSlice";

const Product = ({ product }) => {
  const [createCartItem] = useCreateCartItemMutation();

  const userId = "60c72b2f9b1d8c30d8f8e6e6";
  const handleClick = async (userId, newItem) => {
    try {
      await createCartItem({
        userId,
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
        {product.inStock > 0 ? (
          <Button
            variant="primary"
            onClick={() => handleClick(userId, product)}
          >
            Add to Cart
          </Button>
        ) : (
          <Card.Subtitle>Out of Stock</Card.Subtitle>
        )}
      </Card.Body>
    </Card>
  );
};

export default Product;
