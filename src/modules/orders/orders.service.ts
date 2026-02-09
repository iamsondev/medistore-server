import { prisma } from "../../lib/prisma";

const createOrder = async (
  userId: string,
  payload: {
    address: string;
    items: { medicineId: string; quantity: number; price: number }[];
  },
) => {
  const { address, items } = payload;

  return await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        customerId: userId,
        address,
        status: "PLACED",
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

const getMyOrders = async (userId: string) => {
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

const getOrderById = async (orderId: string, userId: string) => {
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

const getSellerOrders = async (sellerId: string) => {
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

const updateOrderStatus = async (
  orderId: string,
  sellerId: string,
  status: string,
) => {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      orderItems: {
        some: {
          medicine: { sellerId: sellerId },
        },
      },
    },
  });

  if (!order) {
    throw new Error(
      "Order not found or you don't have permission to update this order",
    );
  }

  return await prisma.order.update({
    where: { id: orderId },
    data: { status: status as any },
  });
};

export const orderService = {
  createOrder,
  getMyOrders,
  getOrderById,
  getSellerOrders,
  updateOrderStatus,
};
