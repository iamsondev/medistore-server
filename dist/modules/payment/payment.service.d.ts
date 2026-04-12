export declare const paymentService: {
    createCheckoutSession: (orderId: string, userId: string) => Promise<import("stripe/cjs/lib.js").Response<import("stripe/cjs/resources/Checkout/Sessions.js").Session>>;
    verifyPayment: (sessionId: string) => Promise<{
        success: boolean;
        orderId: string;
    } | {
        success: boolean;
        orderId?: undefined;
    }>;
    createPaymentIntent: (amount: number) => Promise<{
        clientSecret: string;
    }>;
};
//# sourceMappingURL=payment.service.d.ts.map