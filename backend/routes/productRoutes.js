import express from "express";
import {
  getKey,
  paymentProcessing,
  paymentVerification,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/payment/process").post(paymentProcessing);

router.route("/getkey").get(getKey);

router.route("/paymentverify").post(paymentVerification);

export default router;
