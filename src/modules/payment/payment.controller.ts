import { Request, Response } from "express";
import { paymentService } from "./payment.service.js";
import { PaymentValidation } from "./payment.validation.js";

const checkout = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { orderId } = PaymentValidation.checkoutSchema.parse(req.body);
    const session = await paymentService.createCheckoutSession(orderId, user.id);

    res.status(200).json({
      success: true,
      message: "Checkout session created",
      data: session.url,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

const verify = async (req: Request, res: Response) => {
  try {
    const { sessionId } = PaymentValidation.verifySchema.parse(req.query);
    const result = await paymentService.verifyPayment(sessionId as string);

    res.status(200).json({
      success: true,
      message: result.success ? "Payment verified" : "Payment failed",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const paymentController = {
  checkout,
  verify,
};

