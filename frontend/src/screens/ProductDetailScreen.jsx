import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import Loader from "../components/Loader";
import { useGetProductByIdQuery } from "../slices/productApiSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  useCreateCartItemMutation,
  useGetItemQuery,
} from "../slices/cartApiSlice";
import { useCartOperation } from "../utils/changeCartItems";
import { BASE_URL } from "../constants";

const ProductDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  //   console.log(id);
  const { data: product, error, isLoading } = useGetProductByIdQuery(id);

  const { userInfo } = useSelector((state) => state.auth);
  const { data } = useGetItemQuery(
    {
      userId: userInfo?._id,
      itemId: id,
    },
    { skip: !userInfo }
  );

  const { debounceHandleCreate, debouncedHandleAdd, debouncedHandleMinus } =
    useCartOperation();

  if (!product) {
    return <Loader />;
  }

  return (
    <Container>
      <h2 className="my-3">Product Detail</h2>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
      <Row>
        <Col>
          <Button
            variant="outline-primary"
            xs={1}
            onClick={() => navigate("/products")}
          >
            Go Back
          </Button>
        </Col>
      </Row>
      <Row className="bg-white py-3 my-auto">
        <Col md={6} className="px-3">
          <img
            src={`${BASE_URL}${product.images[0]}`}
            alt="..."
            style={{ width: "100%" }}
          />
        </Col>
        <Col md={6}>
          <p>{product.category}</p>
          <h2>{product.name}</h2>
          <h2>${product.price}</h2>
          <p>{product.description}</p>
          <div className="d-flex">
            {product.inStock > 0 && !data?.item?.qty ? (
              <Button
                variant="primary"
                style={{ fontSize: "13px" }}
                className="flex-grow-1 mx-1"
                onClick={() => debounceHandleCreate(userInfo, product)}
              >
                Add to Cart
              </Button>
            ) : product.inStock > 0 ? (
              <div className="d-flex ">
                <Button
                  onClick={() =>
                    debouncedHandleMinus(userInfo._id, product, data.item.qty)
                  }
                >
                  -
                </Button>
                <Form.Control
                  type="text"
                  className="text-center mx-2"
                  value={data.item.qty}
                  //   onChange={(e) => handleChange(userInfo._id, product, e)}
                  readOnly
                />
                <Button
                  onClick={() =>
                    debouncedHandleAdd(userInfo._id, product, data.item.qty)
                  }
                >
                  +
                </Button>
              </div>
            ) : (
              <Button
                variant="secondary"
                style={{ fontSize: "13px" }}
                className="flex-grow-1 mx-1"
              >
                Out of Stock
              </Button>
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
        </Col>
      </Row>
      </>
      )}
    </Container>
  );
};

export default ProductDetailScreen;
