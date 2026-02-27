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
import { fromNodeHeaders } from "better-auth/node";

const app: Application = express();
const corsOptions = {
  origin: [
    "https://medistore-client-bice.vercel.app",
    "http://localhost:3000",
    "http://localhost:5000",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.options("/api/auth/*", cors(corsOptions));

app.all("/api/auth/*splat", async (req, res) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://medistore-client-bice.vercel.app",
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Cookie",
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  return toNodeHandler(auth)(req, res);
});
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
