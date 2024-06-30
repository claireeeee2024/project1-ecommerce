import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/product.js";
import Cart from "./models/cartModel.js";
import { connectDB } from "./config/db.js";
import { v4 as uuidv4 } from "uuid";
dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    const createdUsers = await User.insertMany(users);
    const vendorUser = createdUsers[0]._id;

    const createdProducts = products.map((product) => ({
      ...product,
      vendor: vendorUser,
    }));

    await Product.insertMany(createdProducts);

    // const sampleCarts = carts.map((cart) => ({
    //   user: createdUsers[cart.userIndex]._id,
    //   cartItems: cart.cartItems.map((item) => ({
    //     ...item,
    //     name: createdProducts[item.productIndex].name,
    //     image: createdProducts[item.productIndex].images[0],
    //     price: createdProducts[item.productIndex].price,
    //     id: uuidv4(),
      
    //   })),
    // }));

    // await Cart.insertMany(sampleCarts);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
