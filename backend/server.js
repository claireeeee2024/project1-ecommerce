import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const port = process.env.PORT || 8000;

//connect mongodb 
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

const app = express();

//add routers here

const dirname = path.resolve()
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(dirname, '/frontend/build')))
    console.log(path.resolve(dirname, 'frontend', 'build', 'index.html'))
    app.get('*', (req, res) => res.sendFile(path.resolve(dirname, 'frontend', 'build', 'index.html')))
}else{
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}


app.listen(port, () => console.log(`Server running on port ${port}`));
