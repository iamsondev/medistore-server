import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import AppError from "../Error/appError";

type TErrorSources = {
  path: string | number;
  message: string;
}[];

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorSources: TErrorSources = [
    { path: "", message: "Something went wrong" },
  ];

  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation Error";
    errorSources = err.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    statusCode = 400;
    message = "Prisma Known Request Error";

    if (err.code === "P2002") {
      message = `Duplicate value for field: ${err.meta?.target}`;
    } else if (err.code === "P2025") {
      statusCode = 404;
      message = "Record not found!";
    }

    errorSources = [{ path: "", message }];
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = "Prisma Validation Error - Invalid data provided!";
    errorSources = [{ path: "", message: err.message }];
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    statusCode = 500;
    message = "Database connection failed! Check your connection string.";
    errorSources = [{ path: "", message: err.message }];
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    statusCode = 500;
    message = "An unknown database error occurred!";
    errorSources = [{ path: "", message: err.message }];
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [{ path: "", message }];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

export default globalErrorHandler;
