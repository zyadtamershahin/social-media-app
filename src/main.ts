import express from "express"
import auth_router from "./module/auth/auth.controller"
import { gloabal_handling_error } from "./common/handlingerror";
import { Applecation_error, not_Found_error } from "./common/exception/error.exception";
import { success_response } from "./common/exception/success.response"
import cors from "cors"
import { rateLimit } from 'express-rate-limit'
import { env } from "./config/env.service";
import { database_connection } from "./database/connection";
import { readis_service_instance } from "./common/service/redis.service";


const app = express();

const limit =rateLimit({
    windowMs: 10 * 60 * 1000, // 15 minutes
    limit: 200,
    message: "Too many requests "
})


app.use(express.json())
database_connection()
readis_service_instance.connect()


app.use(cors({
    origin:"*"
}))


app.use("/auth", auth_router)


app.get("/",(req: express.Request, res: express.Response, next: express.NextFunction)=>{
    // throw new not_Found_error()
    success_response({res,message:"Server is running",data:"test"})
})

app.use(gloabal_handling_error)

app.listen(env.port, ()=>{
    console.log(`Server is running on port ${env.port}`)
})