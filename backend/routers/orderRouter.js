const express = require("express");
const { isAuth, isAdmin } = require("../utils");
const Order = require("../models/orderModel");
const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const { db } = require("../models/orderModel");
const Axios = require("axios");

const orderRouter = express.Router();

//=== Get all orders
orderRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const orders = await Order.find({});
      res.status(200).send(orders);
    } catch (error) {
      res.status(500).send({ message: "Internal server error!" });
    }
  })
);

//=== Place order
orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.cartItems.length === 0) {
      return res.status(400).send({ message: "There is no item in cart" });
    }

    const newOrder = new Order({
      cartItems: req.body.cartItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: "Pay In Cash",
      cartTotal: req.body.cartTotal,
      user: req.user._id,
    });

    const createdOrder = await newOrder.save();

    //Reduce countInStock from Product model response for bought qty
    createdOrder.cartItems.forEach(async (item) => {
      const pro = await Product.findById(item.product);
      pro.countInStock = pro.countInStock - Number(item.qty);
      await pro.save();
    });

    const email = req.user.email;
    await Axios.post(
      `http://localhost:5000/send-mail?type=${status.toLowerCase()}`,
      { email }
    );

    res.status(201).send({ message: "New order created", order: createdOrder });
  })
);

//=== Cancle order
orderRouter.put(
  "/cancle",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const order = await Order.findById(req.body.orderId);
      if (order) {
        // Set status to Cancled
        order.status = "Cancled";
        // Return qty back to products collection
        order.cartItems.forEach(async (item) => {
          const product = await Product.findById(item.product);
          product.countInStock = product.countInStock + item.qty;
          await product.save();
        });
        const cancledOrder = await order.save();
        res.status(200).send(cancledOrder);
      } else {
        res.status(404).send({ message: "Order not found" });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
);

orderRouter.post(
  "/order-by-paypal",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.cartItems.length === 0) {
      return res.status(400).send({ message: "There is no item in cart" });
    }

    const newOrder = new Order({
      cartItems: req.body.cartItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: "Paypal",
      cartTotal: req.body.cartTotal,
      user: req.user._id,
      isPaid: true,
      paidAt: Date.now(),
    });

    const createdOrder = await newOrder.save();
    res.status(201).send({ message: "New order created", order: createdOrder });
  })
);

//=== My order list
orderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    // Find all orders that related to req.user (user's token)
    try {
      const myOrder = await Order.find({ user: req.user });
      // Không cần check empty array ở đây. Ta sẽ check bên client, tùy số lượng phần tử trong array ta sẽ conditional rendering component
      res.status(200).send(myOrder);
    } catch (error) {
      // This error in catch block is from query error
      res.status(500).send({ message: "Internal server error!" });
    }
  })
);

//=== Order details
orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    // Find specific order base on _id
    try {
      const order = await Order.findById(req.params.id);
      // successfully query but ther's no order item
      // Lỗi not found này sẽ rơi vào khối catch của API call bên front ????????????????????? => YES
      if (!order) return res.status(404).send({ message: "Order Not Found" });
      // else
      res.status(200).send(order);
    } catch (error) {
      // This error in catch block is from query error
      res.status(500).send({ message: "Internal Server Error" });
    }
  })
);

//== Handling order status
orderRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { status } = req.body;
    try {
      const order = await Order.findById(req.params.id).populate("user");
      order.status = status;
      const editedOrder = await order.save();

      // Send email
      if (status !== "CancledByAdmin") {
        const email = order.user.email;
        await Axios.post(
          `http://localhost:5000/send-mail?type=${status.toLowerCase()}`,
          { email }
        );
      }

      res.send(editedOrder);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
);
module.exports = orderRouter;

//=== Delete order
orderRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const deletedOrder = await Order.findByIdAndDelete(req.params.id);
      res.status(200).send(deletedOrder);
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  })
);
