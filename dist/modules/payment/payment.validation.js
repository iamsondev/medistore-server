import { z } from "zod";
const checkoutSchema = z.object({
    orderId: z.string({
        error: (issue) => issue.input === undefined ? "Order ID is required" : "Invalid Order ID type"
    }).uuid("Invalid Order ID"),
});
const verifySchema = z.object({
    sessionId: z.string({
        error: (issue) => issue.input === undefined ? "Session ID is required" : "Invalid Session ID type"
    }),
});
export const PaymentValidation = {
    checkoutSchema,
    verifySchema,
};
//# sourceMappingURL=payment.validation.js.map