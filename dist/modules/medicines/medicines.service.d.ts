type AddMedicinePayload = {
    name: string;
    description: string;
    price: number;
    stock: number;
    manufacturer: string;
    image: string;
    categoryId: string;
};
export declare const medicinesService: {
    addMedicine: (data: AddMedicinePayload, userId: string) => Promise<{
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
    }>;
    getAllMedicines: (payload: {
        search?: string;
        minPrice?: number;
        maxPrice?: number;
        categoryId?: string;
        sortBy?: string;
        sortOrder?: "asc" | "desc";
        sellerId?: string;
        page?: number;
        limit?: number;
    }) => Promise<{
        medicines: ({
            category: {
                name: string;
                id: string;
                image: string;
                description: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
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
        })[];
        total: number;
    }>;
    getMedicineById: (id: string) => Promise<({
        category: {
            name: string;
            id: string;
            image: string;
            description: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        seller: {
            name: string | null;
            id: string;
            image: string | null;
            createdAt: Date;
            updatedAt: Date;
            role: string | null;
            status: string | null;
            email: string;
            emailVerified: boolean;
        };
    } & {
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
    }) | null>;
    updateMedicine: (id: string, userId: string, data: Partial<AddMedicinePayload>) => Promise<{
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
    }>;
    deleteMedicine: (id: string, userId: string) => Promise<{
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
    }>;
};
export {};
//# sourceMappingURL=medicines.service.d.ts.map