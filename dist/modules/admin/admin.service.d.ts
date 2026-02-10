export declare const AdminService: {
    getAllUsersFromDB: () => Promise<{
        name: string | null;
        id: string;
        createdAt: Date;
        role: string | null;
        status: string | null;
        email: string;
    }[]>;
    updateUserStatusInDB: (id: string, status: string) => Promise<{
        name: string | null;
        id: string;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
        role: string | null;
        status: string | null;
        email: string;
        emailVerified: boolean;
    }>;
    getPlatformStatistics: () => Promise<{
        totalUsers: number;
        totalSellers: number;
        totalMedicines: number;
        totalOrders: number;
        totalRevenue: number;
    }>;
};
//# sourceMappingURL=admin.service.d.ts.map