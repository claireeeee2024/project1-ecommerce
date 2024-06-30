import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
  useUpdateProductMutation,
  useGetProductByIdQuery,
} from "../../slices/productApiSlice";
import {
  validateName,
  validateDescription,
  validateCategory,
  validatePrice,
  validateInStock,
  validateImage,
} from "../../utils/validation";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../constants";
import { toast } from "react-toastify";

const ProductForm = () => {
  const { id: productId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    inStock: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const [uploadProductImage, { isLoading: isUploading, error: uploadError }] =
    useUploadProductImageMutation();
  const [createProduct, { isLoading: isCreating, error: createError }] =
    useCreateProductMutation();

  const { data: product, isLoading: isFetching } = useGetProductByIdQuery(
    productId,
    { skip: !productId }
  );
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const navigate = useNavigate();

  const categoryOptions = [
    "Macbook",
    "iPhone",
    "iPad",
    "Airpods",
    "Accessories",
  ];

  useEffect(() => {
    if (product) {
      const { images, ...rest } = product;
      setFormValues(rest);
      if (images && images.length > 0) {
        setImage(images[0]);
        setImagePreview(`${BASE_URL}${images[0]}`);
      }
    }
  }, [product]);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    const error = validateImage(file);
    setErrors((prevErrors) => ({
      ...prevErrors,
      image: error,
    }));
    if (!error) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    let error;
    switch (name) {
      case "name":
        error = validateName(value);
        break;
      case "description":
        error = validateDescription(value);
        break;
      case "category":
        error = validateCategory(value);
        break;
      case "price":
        error = validatePrice(value);
        break;
      case "inStock":
        error = validateInStock(value);
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(imagePreview);
    const { name, description, category, price, inStock } = formValues;
    const formErrors = {
      name: validateName(name),
      description: validateDescription(description),
      category: validateCategory(category),
      price: validatePrice(price),
      inStock: validateInStock(inStock),
      image: validateImage(image),
    };
    setErrors(formErrors);

    if (Object.keys(formErrors).some((key) => formErrors[key])) {
      return;
    }

    try {
      let productData;

      console.log(image);
      if (typeof image === "string") {
        productData = {
          ...formValues,
          image,
          vendor: userInfo._id,
        };
      } else {
        const formData = new FormData();
        formData.append("image", image);
        const uploadResponse = await uploadProductImage(formData).unwrap();

        productData = {
          ...formValues,
          vendor: userInfo._id,
          images: [uploadResponse.image],
        };
      }

      if (productId) {
        const updateData = { ...productData, id: productId };
        await updateProduct(updateData).unwrap();
        toast.success("Product updated successfully!");
      } else {
        await createProduct(productData).unwrap();
        toast.success("Product created successfully!");
      }
      navigate(productId ? `/products/${productId}` : -1);
    } catch (error) {
      toast.error(error.data?.message || "Failed to save product");
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h3 className="my-3">
            {productId ? "Edit Product" : "Create Product"}
          </h3>
          {isFetching ? (
            <Loader />
          ) : (
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleInputChange}
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
                  name="description"
                  value={formValues.description}
                  onChange={handleInputChange}
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
                      as="select"
                      name="category"
                      onChange={handleInputChange}
                      value={formValues.category}
                      isInvalid={!!errors.category}
                    >
                      <option>Choose a category</option>
                      {categoryOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Control>
                    {/* <Form.Control
                      type="text"
                      name="category"
                      value={formValues.category}
                      onChange={handleInputChange}
                      isInvalid={!!errors.category}
                    /> */}
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
                      name="price"
                      value={formValues.price}
                      onChange={handleInputChange}
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
                      name="inStock"
                      value={formValues.inStock}
                      onChange={handleInputChange}
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
                      name="image"
                      onChange={onFileChange}
                      isInvalid={!!errors.image}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.image}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              {imagePreview && (
                <div
                  className="mb-3"
                  style={{ width: "100%", textAlign: "center" }}
                >
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                className="w-100 mt-3"
                disabled={isCreating || isUpdating || isUploading}
              >
                {isCreating || isUploading
                  ? "Processing..."
                  : productId
                  ? "Update Product"
                  : "Add Product"}
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductForm;
