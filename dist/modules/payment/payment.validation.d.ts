import { z } from "zod";
export declare const PaymentValidation: {
    checkoutSchema: z.ZodObject<{
        orderId: z.ZodString;
    }, z.core.$strip>;
    verifySchema: z.ZodObject<{
        sessionId: z.ZodString;
    }, z.core.$strip>;
};
//# sourceMappingURL=payment.validation.d.ts.map