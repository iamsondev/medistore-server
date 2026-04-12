export declare const AdminService: {
    getAllUsersFromDB: () => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        role: import("@prisma/client").$Enums.Role;
        status: string;
        email: string;
    }[]>;
    updateUserRoleStatusInDB: (id: string, payload: {
        status?: string;
        role?: string;
    }, adminId: string) => Promise<{
        name: string | null;
        id: string;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
        role: import("@prisma/client").$Enums.Role;
        status: string | null;
        email: string;
        emailVerified: boolean;
    }>;
    getPlatformStatistics: () => Promise<{
        totalUsers: number;
        totalSellers: number;
        totalAgents: number;
        totalMedicines: number;
        totalOrders: number;
        totalRevenue: number;
    }>;
    getDeliveryAgentsFromDB: () => Promise<{
        name: string;
        id: string;
        email: string;
    }[]>;
};
//# sourceMappingURL=admin.service.d.ts.map