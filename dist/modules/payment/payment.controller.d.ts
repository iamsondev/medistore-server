import { Request, Response } from "express";
export declare const paymentController: {
    checkout: (req: Request, res: Response) => Promise<void>;
    verify: (req: Request, res: Response) => Promise<void>;
    createPaymentIntent: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=payment.controller.d.ts.map