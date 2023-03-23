const express = require("express");
const { app } = require("./app");
const dotenv = require("dotenv");

const user = require("./routes/user.routes");
const product = require("./routes/product.routes");
const order = require('./routes/order.routes')
const { connectDB } = require("./config/db");
const errorMiddleware = require("./middlewares/Error");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config({
  path: "./config/config.env",
});
connectDB();
const PORT = process.env.PORT;
app.use(express.json());
app.use(
  cors({
    origin:'http://localhost:3000',
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", order);

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});

app.use(errorMiddleware);
