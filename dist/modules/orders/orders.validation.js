import { z } from "zod";
const paymentMethodEnum = z.enum(["Cash On Delivery", "ONLINE"]);
const createOrderSchema = z
    .object({
    address: z.string().min(5, "Address must be at least 5 characters long"),
    paymentMethod: paymentMethodEnum.optional(),
    items: z
        .array(z.object({
        medicineId: z.string().uuid("Invalid medicine ID"),
        quantity: z.number().int().positive().max(100),
        price: z.number().positive(),
    }))
        .min(1, "Order must have at least one item"),
})
    .strict();
const updateStatusSchema = z.object({
    status: z.enum(["PLACED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELED"]),
});
export const OrderValidation = {
    createOrderSchema,
    updateStatusSchema,
};
//# sourceMappingURL=orders.validation.js.map