import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

const ProductDetailScreen = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/products/${id}`)
      .then((res) => res.json())
      .then((info) => {
        setData(info);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!data) return <Loader />;

  return (
    <Container>
      <h2 className="my-3">Product Detail</h2>
      <Row className="bg-white py-3 my-auto">
        <Col md={6} className="px-3">
          <img
            src={data.images[0]}
            alt=""
            style={{ width: "100%" }}
          />
        </Col>
        <Col md={6}>
          <p>{data.category}</p>
          <h2>{data.name}</h2>
          <h2>${data.price}</h2>
          <p>{data.description}</p>
          <div className="d-flex flex-md-row justify-content-between">
            <Button
              variant="primary"
              className="mb-2 mb-md-0 flex-fill me-md-2"
            >
              Add To Cart
            </Button>
            <Button variant="secondary" className="flex-fill">
              Edit
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailScreen;
