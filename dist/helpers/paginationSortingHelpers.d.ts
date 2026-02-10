type IOptions = {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
};
type IOptionsResult = {
    page: number;
    limit: number;
    skip: number;
    sortBy: string;
    sortOrder: "asc" | "desc";
};
export declare const paginationHelpers: {
    calculatePagination: (options: IOptions) => IOptionsResult;
};
export {};
//# sourceMappingURL=paginationSortingHelpers.d.ts.map