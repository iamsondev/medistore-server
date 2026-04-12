import { prisma } from "../../lib/prisma.js";

const getAllUsersFromDB = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });
};

const updateUserRoleStatusInDB = async (id: string, payload: { status?: string; role?: string }, adminId: string) => {
  const targetUser = await prisma.user.findUnique({ where: { id } });
  if (!targetUser) {
    throw new Error("User not found");
  }

  if (targetUser.id === adminId) {
    throw new Error("You cannot modify your own data");
  }

  if (targetUser.role === "ADMIN") {
    throw new Error("You cannot modify another ADMIN's data");
  }

  return await prisma.user.update({
    where: { id },
    data: { 
        ...(payload.status && { status: payload.status }),
        ...(payload.role && { role: payload.role as any })
    },
  });
};

const getPlatformStatistics = async () => {
  const [totalUsers, totalSellers, totalAgents, totalMedicines, totalOrders, revenue] =
    await Promise.all([
      prisma.user.count({ where: { role: "CUSTOMER" } }),
      prisma.user.count({ where: { role: "SELLER" } }),
      prisma.user.count({ where: { role: "DELIVERY_AGENT" } }),
      prisma.medicine.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        where: { paymentStatus: "PAID" },
        _sum: {
          totalAmount: true,
        },
      }),
    ]);

  return {
    totalUsers,
    totalSellers,
    totalAgents,
    totalMedicines,
    totalOrders,
    totalRevenue: revenue._sum.totalAmount || 0,
  };
};

const getDeliveryAgentsFromDB = async () => {
  return await prisma.user.findMany({
    where: { role: "DELIVERY_AGENT" },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};

export const AdminService = {
  getAllUsersFromDB,
  updateUserRoleStatusInDB,
  getPlatformStatistics,
  getDeliveryAgentsFromDB,
};
