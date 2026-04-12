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
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        totalAmount: number;
        transactionId: string | null;
        address: string;
        paymentMethod: string;
        customerId: string;
        deliveryAgentId: string | null;
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
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        totalAmount: number;
        transactionId: string | null;
        address: string;
        paymentMethod: string;
        customerId: string;
        deliveryAgentId: string | null;
    })[]>;
    getOrderById: (orderId: string, userId: string) => Promise<{
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
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        totalAmount: number;
        transactionId: string | null;
        address: string;
        paymentMethod: string;
        customerId: string;
        deliveryAgentId: string | null;
    }>;
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
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        totalAmount: number;
        transactionId: string | null;
        address: string;
        paymentMethod: string;
        customerId: string;
        deliveryAgentId: string | null;
    })[]>;
    updateOrderStatus: (orderId: string, userId: string, status: string, deliveryAgentId?: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        totalAmount: number;
        transactionId: string | null;
        address: string;
        paymentMethod: string;
        customerId: string;
        deliveryAgentId: string | null;
    }>;
    getAllOrders: () => Promise<({
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
        customer: {
            name: string | null;
            id: string;
            image: string | null;
            createdAt: Date;
            updatedAt: Date;
            role: import("@prisma/client").$Enums.Role;
            status: string | null;
            email: string;
            emailVerified: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        totalAmount: number;
        transactionId: string | null;
        address: string;
        paymentMethod: string;
        customerId: string;
        deliveryAgentId: string | null;
    })[]>;
    getAssignedOrders: (agentId: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        totalAmount: number;
        transactionId: string | null;
        address: string;
        paymentMethod: string;
        customerId: string;
        deliveryAgentId: string | null;
    }[]>;
    getDeliveryHistory: (agentId: string) => Promise<({
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
        customer: {
            name: string | null;
            id: string;
            image: string | null;
            createdAt: Date;
            updatedAt: Date;
            role: import("@prisma/client").$Enums.Role;
            status: string | null;
            email: string;
            emailVerified: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        totalAmount: number;
        transactionId: string | null;
        address: string;
        paymentMethod: string;
        customerId: string;
        deliveryAgentId: string | null;
    })[]>;
};
//# sourceMappingURL=orders.service.d.ts.map