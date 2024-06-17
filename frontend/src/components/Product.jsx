import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import './Product.css';

const Product = ({ product }) => {
  return (
    <Card className="card-hover" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.image[0]} className="product-image" />
      <Card.Body>
        <Link to={`/products/${product._id}`}>
        
        <Card.Title className="product-name">
          {product.name}
        </Card.Title>
        <Card.Text className="product-price">
          ${product.price}
        </Card.Text>
        </Link>
        <Card.Text className="product-description">{product.description}</Card.Text>
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