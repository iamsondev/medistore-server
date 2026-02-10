import { prisma } from "../../lib/prisma";

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

const updateUserStatusInDB = async (id: string, status: string) => {
  return await prisma.user.update({
    where: { id },
    data: { status: status as any },
  });
};

const getPlatformStatistics = async () => {
  const [totalUsers, totalSellers, totalMedicines, totalOrders, revenue] =
    await Promise.all([
      prisma.user.count({ where: { role: "CUSTOMER" } }),
      prisma.user.count({ where: { role: "SELLER" } }),
      prisma.medicine.count(),
      prisma.order.count(),
      prisma.orderItem.aggregate({
        _sum: {
          price: true,
        },
      }),
    ]);

  return {
    totalUsers,
    totalSellers,
    totalMedicines,
    totalOrders,
    totalRevenue: revenue._sum.price || 0,
  };
};

export const AdminService = {
  getAllUsersFromDB,
  updateUserStatusInDB,
  getPlatformStatistics,
};
