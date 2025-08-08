import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";
import orderRoutes from "./routes/order.routes";
import { errorHandler } from "./middlewares/error.middleware";

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.use(errorHandler);

export default app;
