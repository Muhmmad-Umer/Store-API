require("dotenv").config();
//async errors

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//Middleware
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">Products Route</a>');
});
app.use("/api/v1/products",productsRouter);
// Products route

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening at port ${port}...`));
  } catch (error) {}
};

start();
