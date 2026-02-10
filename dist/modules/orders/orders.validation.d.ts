import { z } from "zod";
export declare const OrderValidation: {
    createOrderSchema: z.ZodObject<{
        address: z.ZodString;
        paymentMethod: z.ZodOptional<z.ZodEnum<{
            "Cash On Delivery": "Cash On Delivery";
            ONLINE: "ONLINE";
        }>>;
        items: z.ZodArray<z.ZodObject<{
            medicineId: z.ZodString;
            quantity: z.ZodNumber;
            price: z.ZodNumber;
        }, z.core.$strip>>;
    }, z.core.$strict>;
    updateStatusSchema: z.ZodObject<{
        status: z.ZodEnum<{
            PLACED: "PLACED";
            PROCESSING: "PROCESSING";
            SHIPPED: "SHIPPED";
            DELIVERED: "DELIVERED";
            CANCELED: "CANCELED";
        }>;
    }, z.core.$strip>;
};
//# sourceMappingURL=orders.validation.d.ts.map