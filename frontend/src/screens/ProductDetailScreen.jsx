import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useGetProductByIdQuery } from "../slices/productApiSlice";
import { set } from "mongoose";

const ProductDetailScreen = () => {
  const { id } = useParams();
  const [img, setImg] = useState(null);

  const { data, error, isLoading } = useGetProductByIdQuery(id);
  console.log(data);
  //   const img = `/${data.images[0]}`;
  useEffect(() => {
    setImg("/" + data?.images[0]);
  }, [data]);

  if (!data) return <Loader />;

  return (
    <Container>
      <h2 className="my-3">Product Detail</h2>
      <Row className="bg-white py-3 my-auto">
        <Col md={6} className="px-3">
          <img src={img} alt="..." style={{ width: "100%" }} />
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
