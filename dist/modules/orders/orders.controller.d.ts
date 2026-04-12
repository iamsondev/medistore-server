import { Request, Response } from "express";
export declare const OrderController: {
    createOrder: (req: Request, res: Response) => Promise<void>;
    getMyOrders: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getOrderById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getSellerOrders: (req: Request, res: Response) => Promise<void>;
    updateOrderStatus: (req: Request, res: Response) => Promise<void>;
    getAllOrders: (req: Request, res: Response) => Promise<void>;
    getMyAssignedOrders: (req: Request, res: Response) => Promise<void>;
    getDeliveryHistory: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=orders.controller.d.ts.map