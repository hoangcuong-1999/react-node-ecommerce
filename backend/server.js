const express = require("express");
const data = require("./data");
const env = require("dotenv");
const mongoose = require("mongoose");
const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter");
const orderRouter = require("./routers/orderRouter");
const contactRouter = require("./routers/contactRouter");
const profileRouter = require("./routers/profileRouter");
const adminRouter = require("./routers/adminRouter");
const categoryRouter = require("./routers/categoryRouter");
const brandRouter = require("./routers/brandRouter");
const path = require("path");
const ratingRouter = require("./routers/ratingRouter");
const mailRouter = require("./routers/mailRouter");
// const cors = require("cors");

const app = express();

env.config();

// set the view engine to ejs
app.set("view engine", "ejs");

app.get("/ejs", function (req, res) {
  res.render("index");
});

app.use(express.static("assets"));

// app.use(cors());
// cors option demo
// const option = {
//   origin: "http://localhost:3000",
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// Database connnection
mongoose.connect("mongodb://localhost:27017/nien_luan_nghanh", {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // loading mailRouter
app.use("/api/email", mailRouter);
// Loading ratingRouter
app.use("/api/ratings", ratingRouter);
// Loading adminRouter
app.use("/api/admin", adminRouter);
// Loading profileRouter
app.use("/api/profiles", profileRouter);
// Loading orderRouter
app.use("/api/orders", orderRouter);
// Loading userRouter
app.use("/api/users", userRouter);
// Loading productRouter
app.use("/api/products", productRouter);
// Loading contactRouter
app.use("/api/contacts", contactRouter);
// Loadig categoryRouter
app.use("/api/categories", categoryRouter);
// Loadig brandRouter
app.use("/api/brands", brandRouter);

app.get("/", (req, res) => {
  res.send({ message: "Welcome Bro" });
});

// Serve static resources
// const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(path.resolve(), "/uploads")));

// Paypal CLIENT_ID API
app.get("/api/paypal/client-id", (req, res) => {
  res.send(process.env.CLIENT_ID);
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
