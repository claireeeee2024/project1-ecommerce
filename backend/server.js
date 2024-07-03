import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { connectDB } from "./config/db.js";
import cartRouter from "./routes/cartRoute.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import timeout from "connect-timeout";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const PORT = process.env.PORT || 8080;
connectDB();

const app = express();

app.use(timeout("2s")); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//add routers here
app.use("/api/users", userRoutes);
app.use("/api/carts", cartRouter);
app.use("/api/products", productRouter);
app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  console.log(path.resolve(__dirname, "frontend", "build", "index.html"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`Server running on port ${PORT}`));
