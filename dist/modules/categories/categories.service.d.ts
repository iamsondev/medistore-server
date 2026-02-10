import { Category } from "@prisma/client";
export declare const categoriesService: {
    createCategory: (data: Omit<Category, "id" | "createdAt" | "updatedAt">) => Promise<{
        name: string;
        id: string;
        image: string;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getCategory: () => Promise<{
        name: string;
        id: string;
        image: string;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    updateCategory: (id: string, data: Partial<Omit<Category, "id" | "createdAt" | "updatedAt">>) => Promise<{
        name: string;
        id: string;
        image: string;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteCategory: (id: string) => Promise<{
        name: string;
        id: string;
        image: string;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
};
//# sourceMappingURL=categories.service.d.ts.map