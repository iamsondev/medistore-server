import { Request, Response } from "express";
export declare const OrderController: {
    createOrder: (req: Request, res: Response) => Promise<void>;
    getMyOrders: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getOrderById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getSellerOrders: (req: Request, res: Response) => Promise<void>;
    updateOrderStatus: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=orders.controller.d.ts.map