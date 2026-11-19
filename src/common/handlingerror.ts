import express from "express";
import { IError } from "./interface/ierror.interface";




export const gloabal_handling_error =((err: IError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(err)
    // let stack = process.env.NODE_ENV === "dev" ? err.stack : null
    const cause = err.cause  
    const status = err.status || 500
    // const extra= err.cause ? err.cause.extra : null
    res.status(status).json({ message: err.message , cause:err.cause, stack: err.stack})
})
