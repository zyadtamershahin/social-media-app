import type { Response } from "express";


export interface IResponse {
    res: Response;
    message: string;
    status?: number;
    data?: any;
}