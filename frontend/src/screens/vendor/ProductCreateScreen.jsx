import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productApiSlice";
import Loader from "../../components/Loader";
import { validateProductForm } from "../../utils/validation";

const ProductCreateScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});
  const [uploadProductImage, { isLoading: isUploading, error: uploadError }] =
    useUploadProductImageMutation();
  const [createProduct, { isLoading: isCreating, error: createError }] =
    useCreateProductMutation();

  const navigate = useNavigate();

  const onFileChange = (e) => {
    const file = e.target.files[0];
    try {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } catch (err) {
      console.error("Failed to create object URL:", err);
      setErrors({
        ...errors,
        image: "Failed to load image. Please try again.",
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateProductForm(
      name,
      description,
      category,
      price,
      inStock,
      image
    );
    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image);
      const uploadResponse = await uploadProductImage(formData).unwrap();

      const productData = {
        name,
        description,
        category,
        price,
        inStock,
        images: [uploadResponse.image],
        vendor: userInfo._id,
      };

      await createProduct(productData).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h3 className="my-3">Create Product</h3>
          <Form onSubmit={onSubmit}>
            {createError && (
              <Alert variant="danger">
                {createError.data?.message || "Failed to create product"}
              </Alert>
            )}

            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="description" className="mb-3">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="category" className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    isInvalid={!!errors.category}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.category}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="price" className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    isInvalid={!!errors.price}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.price}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="inStock" className="mb-3">
                  <Form.Label>In Stock Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    value={inStock}
                    onChange={(e) => setInStock(e.target.value)}
                    isInvalid={!!errors.inStock}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.inStock}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="image" className="mb-3">
                  <Form.Label>Add Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={onFileChange}
                    isInvalid={!!errors.image}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.image}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Button
              type="submit"
              variant="primary"
              className="w-100 mt-3"
              disabled={isCreating || isUploading}
            >
              {isCreating || isUploading ? "Processing..." : "Add Product"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductCreateScreen;
