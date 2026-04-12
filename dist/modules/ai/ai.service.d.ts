export declare const AIService: {
    generateDescription: (medicineName: string, categoryName?: string) => Promise<string>;
    checkReviewToxicity: (reviewText: string) => Promise<boolean>;
    getHealthAdvice: (userMessage: string) => Promise<string>;
};
//# sourceMappingURL=ai.service.d.ts.map