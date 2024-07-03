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

export const validateName = (name) => {
  if (!name) {
    return "Product name is required.";
  }
  return null;
};

export const validateDescription = (description) => {
  if (!description) {
    return "Product description is required.";
  }
  return null;
};

export const validateCategory = (category) => {
  if (!category) {
    return "Category is required.";
  }
  return null;
};

export const validatePrice = (price) => {
  if (!price || price < 0) {
    return "Valid price is required.";
  }
  return null;
};

export const validateInStock = (inStock) => {
  // console.log(inStock);
  if (inStock === ""  || inStock < 0) {
    return "Valid quantity is required.";
  }
  return null;
};

export const validateImage = (image) => {
  if (!image && typeof image !== "string") {
    return "Product image is required.";
  }
  if (image instanceof File) {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(image.type)) {
      return "Only JPEG, PNG, and WEBP images are allowed.";
    }
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (image.size > maxSizeInBytes) {
      return "Image size should be less than 5MB.";
    }
  }
  return null;
};
