import express, { Application, Request, Response } from "express";
import { categoriesRouter } from "./modules/categories/categories.router";

const app: Application = express();
app.use(express.json());
app.use("/categories", categoriesRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, 2026");
});

export default app;
