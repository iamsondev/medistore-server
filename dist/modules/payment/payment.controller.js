import { paymentService } from "./payment.service.js";
import { PaymentValidation } from "./payment.validation.js";
const checkout = async (req, res) => {
    try {
        const user = req.user;
        const { orderId } = PaymentValidation.checkoutSchema.parse(req.body);
        const session = await paymentService.createCheckoutSession(orderId, user.id);
        res.status(200).json({
            success: true,
            message: "Checkout session created",
            data: session.url,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
};
const verify = async (req, res) => {
    try {
        const { sessionId } = PaymentValidation.verifySchema.parse(req.query);
        const result = await paymentService.verifyPayment(sessionId);
        res.status(200).json({
            success: true,
            message: result.success ? "Payment verified" : "Payment failed",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
};
const createPaymentIntent = async (req, res) => {
    try {
        const { amount } = req.body;
        const result = await paymentService.createPaymentIntent(amount);
        res.status(200).json({
            success: true,
            message: "Payment intent created",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
};
export const paymentController = {
    checkout,
    verify,
    createPaymentIntent,
};
//# sourceMappingURL=payment.controller.js.map