import express, { Application } from "express";
import { categoriesRouter } from "./modules/categories/categories.router";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { medicinesRouter } from "./modules/medicines/medicines.router";
import { OrdersRouter } from "./modules/orders/orders.route";
import { ReviewsRouter } from "./modules/reviews/reviews.router";
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app: Application = express();
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:5000",
    credentials: true,
  }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());

app.use("/categories", categoriesRouter);
app.use("/api/medicines", medicinesRouter);
app.use("/api/orders", OrdersRouter);
app.use("/api/reviews", ReviewsRouter);
app.get("/", (req, res) => {
  res.send("Hello, 2026");
});
app.use(globalErrorHandler);

export default app;
