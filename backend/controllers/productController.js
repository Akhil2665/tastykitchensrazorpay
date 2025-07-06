import { instance } from "../server.js";
import crypto from "crypto";

export const paymentProcessing = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
    receipt: "receipt#1",
    payment_capture: 1,
  };
  try {
    const order = await instance.orders.create(options);
    res.status(200).json({
      status: "success",
      message: "Payment processing endpoint hit successfully",
      order,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

export const getKey = async (req, res) => {
  res.status(200).json({
    key: process.env.RAZORPAY_API_KEY,
    message: "Razorpay API key retrieved successfully",
  });
};

export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");
  if (generated_signature !== razorpay_signature) {
    return res.status(400).json({
      status: "error",
      message: "Payment verification failed",
    });
  }
  res.redirect(
    `https://tastykitchensrazorpay.vercel.app/paymentsuccessful/orderplaced?orderref=${razorpay_order_id}&paymentref=${razorpay_payment_id}`
  );
};
