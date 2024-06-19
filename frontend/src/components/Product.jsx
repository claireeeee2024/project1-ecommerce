import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Product.css';

const Product = ({ product }) => {
  return (
    <Card className="card-hover my-3 p-3 rounded" >
      <Card.Img variant="top" src={product.images[0]} className="product-image" />
      <Card.Body >
        <Link to={`/products/${product._id}`}>
        
        <Card.Title className="product-name">
          {product.name}
        </Card.Title>
        </Link>
        <Card.Text as='h4' className="product-price">
          ${product.price}
        </Card.Text>
        
        <Card.Text className="product-category">{product.category}</Card.Text>
        {product.inStock > 0 ? (
          <Button variant="primary">
            Add to Cart
          </Button>
        ) : (
          <Card.Subtitle>
            Out of Stock
          </Card.Subtitle>
        )}
      </Card.Body>
    </Card>
  );
};

export default Product;