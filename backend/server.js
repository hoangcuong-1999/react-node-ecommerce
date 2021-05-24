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
const authRouter = require("./routers/authRouter");
// const cors = require("cors");

const app = express();

env.config();

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

// loading authRouter
app.use("/api/auth", authRouter);
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
app.use("/views", express.static(path.join(path.resolve(), "/views")));

// Paypal CLIENT_ID API
app.get("/api/paypal/client-id", (req, res) => {
  res.send(process.env.CLIENT_ID);
});

//---------------------------------------------------------------------------------

// const nodemailer = require("nodemailer");
// const ejs = require("ejs");

// transporter.verify((err, success) => {
//   err
//     ? console.log(err)
//     : console.log(`=== Server is ready to take messages: ${success} ===`);
// });

// const { checkMailType } = require("./utils");

// app.post("/send-mail", checkMailType, (req, res) => {
//   if (req.mailObj) {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: process.env.EMAIL,
//         pass: process.env.WORD,
//         clientId: process.env.OAUTH_CLIENTID,
//         clientSecret: process.env.OAUTH_CLIENT_SECRET,
//         refreshToken: process.env.OAUTH_REFRESH_TOKEN,
//       },
//     });
//     ejs.renderFile(
//       __dirname + `/views/${req.mailObj.content}`,
//       {},
//       function (err, data) {
//         if (err) {
//           res.send({ error: err.message });
//         } else {
//           let mailOptions = {
//             from: process.env.EMAIL,
//             to: req.body.email,
//             subject: req.mailObj.subject,
//             html: data,
//           };
//           transporter.sendMail(mailOptions, (err, info) => {
//             if (err) {
//               res.send({ msg: "fail" });
//             } else {
//               res.send({ msg: "success" });
//             }
//           });
//         }
//       }
//     );
//   }
// });

//---------------------------------------------------------------------------------

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
