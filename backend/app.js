import express from "express";
import payment from "./routes/productRoutes.js";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://tastykitchensrazorpay.vercel.app", // Adjust this to your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow credentials if needed
  })
);
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", payment);

export default app;
