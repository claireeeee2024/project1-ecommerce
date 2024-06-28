import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useGetProductByIdQuery } from "../slices/productApiSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useCreateCartItemMutation,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
  useGetItemQuery,
} from "../slices/cartSlice";
import { FormControl, Card } from "react-bootstrap";
import { useCartOperation } from "../utils/changeCartItems";
import { BASE_URL } from "../constants";

const ProductDetailScreen = () => {
  const { id } = useParams();
  const [img, setImg] = useState(null);

  console.log(id);
  const { data: product, error, isLoading } = useGetProductByIdQuery(id);

  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [createCartItem] = useCreateCartItemMutation();
  const [updateCartItem] = useUpdateCartItemMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();
  const { data } = useGetItemQuery(
    {
      userId: userInfo._id,
      itemId: id,
    },
    { skip: !userInfo }
  );

  // console.log(product);
  //   useEffect(() => {
  //     setImg("/" + product?.images[0]);
  //   }, [product]);

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

  if (!product) {
    return <Loader />;
  }

  return (
    <Container>
      <h2 className="my-3">Product Detail</h2>
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
              <Button variant="primary" onClick={() => handleClick(product)}>
                Add to Cart
              </Button>
            ) : product.inStock > 0 ? (
              <div style={{ display: "flex", flex: 0.2 }}>
                <Button
                  onClick={() =>
                    debouncedHandleMinus(
                      userInfo._id,
                      product._id,
                      data.item.qty
                    )
                  }
                >
                  -
                </Button>
                <FormControl
                  type="text"
                  value={data.item.qty}
                  onChange={(e) => handleChange(userInfo._id, product._id, e)}
                />
                <Button
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
              <Button variant="primary" className="mr-2">
                Edit product
              </Button>
            ) : null}
          </div>
          {/* <div className="d-flex flex-md-row justify-content-between">
            <Button
              variant="primary"
              className="mb-2 mb-md-0 flex-fill me-md-2"
            >
              Add To Cart
            </Button>
            <Button
              variant="secondary"
              className="flex-fill"
              href={`/products/edit/${data._id}`}
            >
              Edit
            </Button>
          </div> */}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailScreen;
