import { prisma } from "../../lib/prisma.js";
const createOrder = async (userId, payload) => {
    const { address, items } = payload;
    return await prisma.$transaction(async (tx) => {
        for (const item of items) {
            const medicine = await tx.medicine.findUnique({
                where: { id: item.medicineId },
            });
            if (!medicine || medicine.stock < item.quantity) {
                throw new Error(`Insufficient stock for ${medicine?.name || "selected medicine"}. Available: ${medicine?.stock || 0}`);
            }
        }
        const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const order = await tx.order.create({
            data: {
                customerId: userId,
                address,
                status: "PLACED",
                totalAmount,
                paymentStatus: "PENDING",
                orderItems: {
                    create: items.map((item) => ({
                        medicineId: item.medicineId,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                },
            },
            include: { orderItems: true },
        });
        for (const item of items) {
            await tx.medicine.update({
                where: { id: item.medicineId },
                data: {
                    stock: {
                        decrement: item.quantity,
                    },
                },
            });
        }
        return order;
    });
};
const getMyOrders = async (userId) => {
    return await prisma.order.findMany({
        where: { customerId: userId },
        include: {
            orderItems: {
                include: { medicine: true },
            },
        },
        orderBy: { createdAt: "desc" },
    });
};
const getOrderById = async (orderId, userId) => {
    return await prisma.order.findUnique({
        where: {
            id: orderId,
            customerId: userId,
        },
        include: {
            orderItems: {
                include: { medicine: true },
            },
        },
    });
};
const getSellerOrders = async (sellerId) => {
    return await prisma.order.findMany({
        where: {
            orderItems: {
                some: {
                    medicine: {
                        sellerId: sellerId,
                    },
                },
            },
        },
        include: {
            orderItems: {
                include: {
                    medicine: true,
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });
};
const updateOrderStatus = async (orderId, userId, status, deliveryAgentId) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const order = await prisma.order.findFirst({
        where: {
            id: orderId,
            ...(user?.role === "ADMIN" ? {} :
                user?.role === "DELIVERY_AGENT" ? { deliveryAgentId: userId } :
                    {
                        orderItems: {
                            some: {
                                medicine: { sellerId: userId },
                            },
                        },
                    })
        },
    });
    if (!order) {
        throw new Error("Order not found or you don't have permission to update this order");
    }
    return await prisma.order.update({
        where: { id: orderId },
        data: {
            status: status,
            ...(deliveryAgentId ? { deliveryAgentId } : {})
        },
    });
};
const getAllOrders = async () => {
    const orders = await prisma.order.findMany({
        include: {
            customer: true,
            orderItems: {
                include: { medicine: true },
            },
        },
        orderBy: { createdAt: "desc" },
    });
    return orders;
};
const getAssignedOrders = async (agentId) => {
    console.log(`[OrderService] Fetching assigned orders for agentId: ${agentId}`);
    const orders = await prisma.order.findMany({
        where: {
            deliveryAgentId: agentId,
            status: { notIn: ["DELIVERED", "CANCELED"] }
        },
        include: {
            customer: true,
            orderItems: {
                include: { medicine: true },
            },
        },
        orderBy: { updatedAt: "desc" },
    });
    console.log(`[OrderService] Found ${orders.length} assigned orders for agentId: ${agentId}`);
    return orders;
};
const getDeliveryHistory = async (agentId) => {
    return await prisma.order.findMany({
        where: {
            deliveryAgentId: agentId,
            status: "DELIVERED"
        },
        include: {
            customer: true,
            orderItems: {
                include: { medicine: true },
            },
        },
        orderBy: { updatedAt: "desc" },
    });
};
export const orderService = {
    createOrder,
    getMyOrders,
    getOrderById,
    getSellerOrders,
    updateOrderStatus,
    getAllOrders,
    getAssignedOrders,
    getDeliveryHistory,
};
//# sourceMappingURL=orders.service.js.map