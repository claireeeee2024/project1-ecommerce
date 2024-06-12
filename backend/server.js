import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import cartRouter from "./routes/cartRoute.js";

dotenv.config();

const port = process.env.PORT || 8000;

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//add routers here
app.use("/cart", cartRouter);

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

app.listen(port, () => console.log(`Server running on port ${port}`));
