import { string } from "zod"
import { env } from "../../config/env.service"
import bcrypt from "bcrypt"


export const genrate_hash=async({plain_text, salt=env.salt_rounds}:{plain_text:string,salt?:string})=>{
    let hash_data = await bcrypt.hash(plain_text, Number(salt))
    return hash_data
}

export const compare_hash = async ({plain_text ,hash_text}:{plain_text:string,hash_text:string})=>{
    return await bcrypt.compare(plain_text,hash_text)
}
