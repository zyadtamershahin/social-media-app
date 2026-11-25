import dotenv from "dotenv"
import path from "path"
dotenv.config({path:path.resolve('./.env.dev')})


const port= process.env.PORT as string
const database_uri= process.env.URI as string
const salt_rounds= process.env.SALT_ROUNDS as string
const mood= process.env.MOOD as string
const access_signiture_user= process.env.ACCESS_SIGNITURE_USER as string
const refresh_signiture_user= process.env.REFRESH_SIGNITURE_USER as string
const access_signiture_admin= process.env.ACCESS_SIGNITURE_ADMIN as string
const refresh_signiture_admin= process.env.REFRESH_SIGNITURE_ADMIN as string
const email_user= process.env.EMAIL as string
const app_password=process.env.APP_PASSWORD as string
const redis_key=process.env.REDIS_KEY as string

export const env = {
    port,
    database_uri,
    salt_rounds,
    mood,
    access_signiture_user,
    refresh_signiture_user,
    access_signiture_admin,
    refresh_signiture_admin,
    email_user,
    app_password,
    redis_key
}