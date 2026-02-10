import { Request, Response } from "express";
export declare const medicinesController: {
    addMedicine: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getAllMedicines: (req: Request, res: Response) => Promise<void>;
    getMedicineById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateMedicine: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteMedicine: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=medicines.controller.d.ts.map