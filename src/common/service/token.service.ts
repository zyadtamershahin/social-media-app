import jwt, { JwtPayload } from "jsonwebtoken"
import { env } from "../../config/env.service"
import { bad_Request_error } from "../exception/error.exception.js"
import { IUser } from "../interface/user.interface"


export const new_generate_access_token = (refresh_token:string) => {
    let data = jwt.decode(refresh_token) as JwtPayload
    if(!data){
        throw new bad_Request_error("token is not vaild")
    }
    let signiture:string
    let aud:string
    let refresh_signiture:string
    switch (data.aud) {
        case "admin":
            signiture = env.access_signiture_admin
            refresh_signiture = env.refresh_signiture_admin
            aud = "admin"
            break;
        default:
            signiture = env.access_signiture_user
            refresh_signiture = env.refresh_signiture_user
            aud = "user"
            break;
    }
    let decoded_refresh_token = jwt.verify(refresh_token, refresh_signiture) as JwtPayload
    let access_token = jwt.sign({ id: decoded_refresh_token._id }, signiture, { expiresIn: "30min", audience: aud })
    // let refresh_token = jwt.sign({ id: user._id }, refresh_signiture, { expiresIn: "1y", audience: aud })
    return { access_token }
}
export const generate_token = (user:IUser) => {
    let signiture:string
    let aud:string
    let refresh_signiture:string
    switch (user.role) {
        case 1:
            signiture = env.access_signiture_admin as string
            refresh_signiture = env.refresh_signiture_admin as string
            aud = "admin"
            break;
        default:
            signiture = env.access_signiture_user as string
            refresh_signiture = env.refresh_signiture_user as string
            aud = "user"
            break;
    }
    let access_token = jwt.sign({ id: user._id }, signiture, { expiresIn: "30min", audience: aud })
    let refresh_token = jwt.sign({ id: user._id }, refresh_signiture, { expiresIn: "1y", audience: aud })
    return { access_token, refresh_token }
}