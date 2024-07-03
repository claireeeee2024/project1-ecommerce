import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetItemQuery } from "../slices/cartApiSlice";
import "./Product.css";
import { useCartOperation } from "../utils/changeCartItems";
import { BASE_URL } from "../constants";

const Product = ({ product }) => {
  const userInfo = useSelector((state) => state.auth.userInfo) || null;
  const { data } = useGetItemQuery(
    {
      userId: userInfo?._id,
      itemId: product._id,
    },
    { skip: !userInfo }
  );

  const { debouncedHandleAdd, debouncedHandleMinus, debounceHandleCreate } =
    useCartOperation();

  return (
    <Card className="card-hover my-3 p-3 h-90 rounded">
      <Card.Img
        variant="top"
        src={`${BASE_URL}${product.images[0]}`}
        style={{ width: "100%", height: "200px", objectFit: "contain" }}
        className="product-image"
      />
      <Card.Body>
        <Link to={`/products/${product._id}`}>
          <Card.Subtitle className="product-name small-text">
            {product.name}
          </Card.Subtitle>
        </Link>
        <Card.Text as="h4" className="product-price">
          ${product.price}
        </Card.Text>

        {/* <Card.Text className="product-category">{product.category}</Card.Text> */}
        <div className="d-flex justify-content-between">
          {(product.inStock > 0 && !data?.item?.qty) || !userInfo ? (
            <Button
              variant="primary"
              className="flex-grow-1 mx-1 mb-1"
              onClick={() => debounceHandleCreate(userInfo, product)}
            >
              Add
            </Button>
          ) : product.inStock > 0 ? (
            <div
              style={{ display: "flex", flex: 1 }}
              className="small-buttons mb-1 "
            >
              <Button
                className="flex-shrink-0"
                onClick={() =>
                  debouncedHandleMinus(userInfo._id, product, data.item.qty)
                }
              >
                -
              </Button>
              <Form.Control
                type="text"
                value={data.item.qty}
                style={{ fontSize: "0.65rem" }}
                textalign="center"
                readOnly
              />
              <Button
                className="mr-1"
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
              style={{ fontSize: "12px" }}
              className="flex-grow-1"
            >
              Out of Stock
            </Button>
          )}
          {userInfo &&
          userInfo.isVendor === true &&
          userInfo._id.toString() === product.vendor.toString() ? (
            <Link
              to={`/products/edit/${product._id}`}
              className="btn btn-outline-dark mx-1 mb-1 flex-grow"
            >
              Edit product
            </Link>
          ) : null}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;
