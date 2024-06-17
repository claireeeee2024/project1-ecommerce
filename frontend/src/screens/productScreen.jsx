import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Product from '../components/Product.jsx';

const ProductScreen = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get('/api/products');
//         setProducts(res.data.products);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }
const Product1 = {
    _id:0,
    name: "Product1",
    inStock: 0,
    price: 1,
    description: "balv",
    image: ["a"],
  };
  
  const Product2 = {
    _id: 1,
    name: "Product2",
    inStock: 1,
    price: 1,
    description: "balv",
    image: ["a"],
  };
  const products = [Product1, Product2];
  return (
    <Container>
      <Row>
        {products.map((product) => (
          <Col key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductScreen;