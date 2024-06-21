import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { connectDB } from "./config/db.js";
import cartRouter from "./routes/cartRoute.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const PORT = process.env.PORT || 8000;
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
//add routers here
app.use("/api/users", userRoutes);
app.use("/carts", cartRouter);
app.use("/api/products", productRouter);

const dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(dirname, "/frontend/build")));
  console.log(path.resolve(dirname, "frontend", "build", "index.html"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`Server running on port ${PORT}`));
