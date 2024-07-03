import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import Loader from "../components/Loader";
import { useGetProductByIdQuery } from "../slices/productApiSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  useCreateCartItemMutation,
  useGetItemQuery,
} from "../slices/cartApiSlice";
import { Form } from "react-bootstrap";
import { useCartOperation } from "../utils/changeCartItems";
import { BASE_URL } from "../constants";
import { setQtys, setTotal } from "../slices/cartSlice";

const ProductDetailScreen = () => {
  const { id } = useParams();

  console.log(id);
  const { data: product, error, isLoading } = useGetProductByIdQuery(id);

  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [createCartItem] = useCreateCartItemMutation();
  const { data } = useGetItemQuery(
    {
      userId: userInfo?._id,
      itemId: id,
    },
    { skip: !userInfo }
  );

  const { handleChange, debouncedHandleAdd, debouncedHandleMinus } =
    useCartOperation();

  const qtys = useSelector((state) => state.cart.qtys);
  const total = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();

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
          inStock: newItem.inStock,
        },
      }).unwrap();
      dispatch(setQtys(qtys + 1));
      dispatch(setTotal(total + newItem.price));
      console.log(`Item with id ${newItem._id} is added`);
    } catch (error) {
      console.error(error);
    }
  };

  if (!product) {
    return <Loader />;
  }

  return (
    <Container>
      <h2 className="my-3">Product Detail</h2>
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
                className="flex-grow-1 mx-1"
                onClick={() => handleClick(product)}
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
                  onChange={(e) => handleChange(userInfo._id, product, e)}
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
    </Container>
  );
};

export default ProductDetailScreen;
