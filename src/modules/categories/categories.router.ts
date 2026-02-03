import express, { Router } from "express";

const router = express.Router();

router.post("/", (req, res) => {
  res.send("create new post for categories");
});

export const categoriesRouter: Router = router;
