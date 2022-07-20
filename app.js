require("dotenv").config();
require('express-async-errors')

//async errors

const express = require("express");
const app = express();

const connectDB = require("./final/db/connect");

const productsRouter = require('./final/routes/products')

const notFoundMiddleware = require("./final/middleware/not-found");
const errorMiddleware = require("./final/middleware/error-handler");

//middleware

app.use(express.json());

//routes

app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">Products Routes</a>');
});

app.use('/api/v1/products', productsRouter)

//product route

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    //Connect DB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on the port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
