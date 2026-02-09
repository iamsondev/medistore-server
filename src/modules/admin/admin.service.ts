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
    data: { status },
  });
};

export const AdminService = { getAllUsersFromDB, updateUserStatusInDB };
