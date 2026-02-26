import { Request, Response } from "express";
export declare const medicinesController: {
    addMedicine: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getAllMedicines: (req: Request, res: Response) => Promise<void>;
    getMedicineById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateMedicine: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteMedicine: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=medicines.controller.d.ts.map