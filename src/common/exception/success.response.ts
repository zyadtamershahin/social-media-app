import type { Response } from "express";
import { IResponse } from "../interface/response.interface";


export const success_response = ({res, message ="Done", status = 200, data}:IResponse) => {
res.status(status).json({ message, data })

}