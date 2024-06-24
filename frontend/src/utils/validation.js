export const validateEmail = (email) => {
  if (!email) {
    return "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    return "Email is invalid";
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password) {
    return "Password is required";
  } else if (password.length < 6) {
    return "Password must be at least 6 characters";
  }
  return null;
};

export const validateForm = (email, password) => {
  const errors = {};
  errors.email = validateEmail(email);
  errors.password = validatePassword(password);
  return errors;
};

export const validateProductForm = (
  name,
  description,
  category,
  price,
  inStock,
  image
) => {
  const errors = {};

  if (!name) errors.name = "Product name is required.";
  if (!description) errors.description = "Product description is required.";
  if (!category) errors.category = "Category is required.";
  if (!price || price <= 0) errors.price = "Valid price is required.";
  if (inStock <= 0)
    errors.inStock = "In stock quantity should be greater than 0.";
  if (!image) errors.image = "Product image is required.";

  if (image) {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(image.type)) {
      errors.image = "Only JPEG, PNG, and WEBP images are allowed.";
    }

    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (image.size > maxSizeInBytes) {
      errors.image = "Image size should be less than 5MB.";
    }
  }

  return errors;
};
