import express, { Application } from "express";
import { categoriesRouter } from "./modules/categories/categories.router";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";

const app: Application = express();
app.use(
  cors({
    origin: process.env.API_URL || "http://localhost:5000",
    credentials: true,
  }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());
app.use("/categories", categoriesRouter);
app.get("/", (req, res) => {
  res.send("Hello, 2026");
});

export default app;
