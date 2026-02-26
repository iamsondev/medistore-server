import express, { Application } from "express";
import { categoriesRouter } from "./modules/categories/categories.router.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import cors from "cors";
import { medicinesRouter } from "./modules/medicines/medicines.router.js";
import { OrdersRouter } from "./modules/orders/orders.route.js";
import { ReviewsRouter } from "./modules/reviews/reviews.router.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import notFound from "./middlewares/notFound.js";
import { AdminRouter } from "./modules/admin/admin.router.js";

const app: Application = express();
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:5000",
    credentials: true,
  }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());
app.use("/api/categories", categoriesRouter);
app.use("/api/medicines", medicinesRouter);
app.use("/api/orders", OrdersRouter);
app.use("/api/reviews", ReviewsRouter);
app.use("/api/admin", AdminRouter);
app.get("/", (req, res) => {
  res.send("Hello, 2026");
});
app.use(notFound);
app.use(globalErrorHandler);

export default app;
