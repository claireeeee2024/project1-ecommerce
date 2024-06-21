import Product from "../models/product.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

/**
 * Get all products
 * @route GET /api/products
 * @access Public
 */
export const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Pagination, current page number
  const pageSize = parseInt(req.query.limit) || 10; //  number of products per page
  const skip = (page - 1) * pageSize; // number of products to skip
  const total = await Product.countDocuments(); // total number of products

  const sortOption = req.query.sort || 'createdAt';

  let sortQuery = {createdAt: 1};
  if (sortOption === 'priceLowToHigh') {
    sortQuery = { price: 1 };
  } else if (sortOption === 'priceHighToLow') {
    sortQuery = { price: -1 };
  } else if (sortOption === 'lastAdded') {
    sortQuery = { createdAt: -1 };
  }

  const products = await Product.find()
    .sort(sortQuery)
    .skip(skip)
    .limit(pageSize)

  res.json({
    products,
    currentPage: page,
    pages: Math.ceil(total / pageSize),
    total,
  });
});

/**
 * Get a product by ID
 * @route GET /api/products/:id
 * @access Public
 */

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    return res.status(404).json({ message: "Product not found" });
  }
});

/**
 * Create a product
 * @route POST /api/products
 * @access Private
 */

export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, category, price, inStock, images, vendor } =
    req.body;
  if (
    !name ||
    !description ||
    !category ||
    !price ||
    !inStock ||
    !images ||
    !vendor
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if product already exists
  // const existingProduct = await Product.findOne({ name, description, category, vendor });
  // if (existingProduct) {
  //     res.status(400).json({ message: "Product already exists" });
  // }

  const vendorId = vendor.toString();
  const existingVendor = await User.findById(vendorId);
  if (!existingVendor) {
    return res.status(404).json({ message: "Vendor not found" });
  }

  const product = new Product({
    name,
    description,
    category,
    price,
    inStock,
    images,
    vendor: existingVendor._id,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

/**
 * Update a product
 * @route POST /api/products/:id
 * @access Private
 */

export const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, category, price, inStock, images, vendor } =
    req.body;
  const product = await Product.findById(req.params.id);

  //check product exists
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if(product.vendor.toString() !== vendor.toString()) {
    return res.status(401).json({ message: "You are not allowed to update this product" });
  }

  product.name = name || product.name;
  product.description = description || product.description;
  product.category = category || product.category;
  product.price = Number(price) || product.price;
  product.inStock = Number(inStock) || product.inStock;
  product.images = images || product.images;

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

/**
 * Delete a product
 * @route DELETE /api/products/:id
 * @access Private
 */

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const vendorId = req.user._id.toString();
  
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  if (product.vendor.toString() !== vendorId) {
    return res.status(401).json({ message: "You are not allowed to delete this product" });
  }

  const deleted = await Product.deleteOne({ _id: req.params.id });

  if (deleted.deletedCount === 1) {
    res.status(200).json({ message: "Product deleted successfully" });
  } else {
    res.status(400).json({ message: "Fail delete product" });
  }
});
