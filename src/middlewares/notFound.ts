import { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found!",
    errorSources: [
      {
        path: req.originalUrl,
        message: "Your requested path is invalid",
      },
    ],
  });
};

export default notFound;
