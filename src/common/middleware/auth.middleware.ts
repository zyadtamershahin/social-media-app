import jwt, { JwtPayload } from "jsonwebtoken"
import { env } from "../../config/env.service.js"
import { bad_Request_error } from "../exception/error.exception"
import type { NextFunction , Request , Response } from "express"
import { IReq } from "../interface/IReq.interface.js"





export const auth = (req:IReq, res:Response, next:NextFunction) => {
    if(!req.headers.authorization){
        throw new bad_Request_error("token not found");
    }
    let [flag, token] = req.headers.authorization.split(" ")
    if(!token){
        throw new bad_Request_error("token not found")
    }
    switch (flag) {
        case "basic":
            const basic_data = Buffer.from(token, "base64").toString()
            let [email, password] = basic_data.split(":")

            break;
        case "Bearer":
            let decoded = jwt.decode(token) as JwtPayload
            let signiture: string
            switch (decoded.aud) {
                case "admin":
                    signiture = env.access_signiture_admin
                    break;
                default:
                    signiture = env.access_signiture_user 
                    break;
            }
            let decoded_data = jwt.verify(token, signiture) as JwtPayload
            
            if (decoded_data) {
                req.userId = decoded_data.id
                next()
            } else {
                throw new bad_Request_error ( "Invalid token" )
            }
    }
}