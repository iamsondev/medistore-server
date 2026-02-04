import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from "../lib/auth";

export enum userRole {
  CUSTOMER = "CUSTOMER",
  SELLER = "SELLER",
  ADMIN = "ADMIN",
}
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: string;
        emailVerified: boolean;
      };
    }
  }
}

const auth = (...roles: userRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await betterAuth.api.getSession({
        headers: req.headers as any,
      });

      if (!session) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized",
        });
      }
      if (!session?.user.emailVerified) {
        return res.status(403).json({
          success: false,
          message: "Email verification required, please verify the email",
        });
      }
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role as userRole,
        emailVerified: session.user.emailVerified,
      };
      if (roles.length && !roles.includes(req.user.role as userRole)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden!! you don't have permission top access",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
export default auth;
