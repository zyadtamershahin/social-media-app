
import { IUser } from "../../common/interface/user.interface";
import { loginDto } from "./dto/auth.dto";
import { DataBaseRepository } from "../../database/repository/dataBase.repository";
import { UserModel } from "../../database/model/user.model"
import { bad_Request_error, not_Found_error } from "../../common/exception/error.exception";
import { compare } from "bcrypt";
import { compare_hash, genrate_hash } from "../../common/service/encreption.service";
import { generate_token } from "../../common/service/token.service";
import { readis_service_instance, redis_service } from "../../common/service/redis.service";
import { send_email } from "../../common/service/email.service";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwt as zodJwt } from "zod";
import { Model } from "mongoose";


export class auth_service {
    private authrepository:DataBaseRepository<IUser>
    private user_model:Model<IUser>
    constructor() {
        this.authrepository = new DataBaseRepository<IUser>(UserModel)
        this.user_model = this.user_model
    }
    async Login(data: loginDto): Promise<any> {
        
        let {email, password} =data
        let existed_user = await this.authrepository.findOne({filter:{email}})
        if(!existed_user){
            throw new not_Found_error("user not found")
        }
        if(!existed_user.isVerified){
            throw new bad_Request_error("user not verifed")

        }
        let matched_password = compare_hash({plain_text:password , hash_text:existed_user.password})
        if(!matched_password){
            throw new bad_Request_error("password not match")
        }
        let {access_token,refresh_token} = generate_token(existed_user)
        return {message:"user login succsesfuly", access_token,refresh_token}
    }

    async signup(data :IUser ){
        let {name,email,password, confirm_password , age ,phone }= data
        let existed_user= await this.authrepository.findOne({filter:{email}})
        if(existed_user){
            throw new bad_Request_error("user exists")
        }
        let hashed_password = await genrate_hash({plain_text:password})
            if(!hashed_password){
                throw new bad_Request_error("somthing went wrong")
            }

            let otp =Math.round(Math.random()*1000000)
            let added_user= await this.authrepository.create({email , password:hashed_password ,age , phone ,name})
            readis_service_instance.set(`${added_user._id}:OTP`,String(otp) ,60)
            let token = generate_token(added_user)
            let html=`
            <h1>welcome </h1>
            <button onClick = "http://localhost/3000/auth/verify-account?token=${token}"> complete your verify </button>
            `

            await send_email({to :added_user.email ,subject :"signup" ,html:`<h1>${otp}</h1>`})
            return{message: "signup" ,added_user}
    }


    async get_user_by_id(id:string){
        let user_data = await this.authrepository.findOne({filter :{_id:id}})
        if(!user_data){
            throw new bad_Request_error("user not found")
        }
        return {message:"user found", user_data}
    }
    async verify(params:any){
        let {token} = params
        let decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        if(!decoded || !decoded.id){
            throw new bad_Request_error("invalid token")
        }
        let updated_user =await this.user_model.findByIdAndUpdate(decoded.id, {isVerified:true})
        return {message : "account verifed"}
    }




}



const auth_service_instance = new auth_service()
export default auth_service_instance