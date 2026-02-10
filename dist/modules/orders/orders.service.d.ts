export declare const orderService: {
    createOrder: (userId: string, payload: {
        address: string;
        items: {
            medicineId: string;
            quantity: number;
            price: number;
        }[];
    }) => Promise<{
        orderItems: {
            id: string;
            price: number;
            quantity: number;
            medicineId: string;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        customerId: string;
        address: string;
        paymentMethod: string;
    }>;
    getMyOrders: (userId: string) => Promise<({
        orderItems: ({
            medicine: {
                name: string;
                id: string;
                image: string;
                description: string;
                createdAt: Date;
                updatedAt: Date;
                price: number;
                stock: number;
                viewCount: number;
                manufacturer: string;
                sellerId: string;
                categoryId: string;
            };
        } & {
            id: string;
            price: number;
            quantity: number;
            medicineId: string;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        customerId: string;
        address: string;
        paymentMethod: string;
    })[]>;
    getOrderById: (orderId: string, userId: string) => Promise<({
        orderItems: ({
            medicine: {
                name: string;
                id: string;
                image: string;
                description: string;
                createdAt: Date;
                updatedAt: Date;
                price: number;
                stock: number;
                viewCount: number;
                manufacturer: string;
                sellerId: string;
                categoryId: string;
            };
        } & {
            id: string;
            price: number;
            quantity: number;
            medicineId: string;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        customerId: string;
        address: string;
        paymentMethod: string;
    }) | null>;
    getSellerOrders: (sellerId: string) => Promise<({
        orderItems: ({
            medicine: {
                name: string;
                id: string;
                image: string;
                description: string;
                createdAt: Date;
                updatedAt: Date;
                price: number;
                stock: number;
                viewCount: number;
                manufacturer: string;
                sellerId: string;
                categoryId: string;
            };
        } & {
            id: string;
            price: number;
            quantity: number;
            medicineId: string;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        customerId: string;
        address: string;
        paymentMethod: string;
    })[]>;
    updateOrderStatus: (orderId: string, sellerId: string, status: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        customerId: string;
        address: string;
        paymentMethod: string;
    }>;
};
//# sourceMappingURL=orders.service.d.ts.map