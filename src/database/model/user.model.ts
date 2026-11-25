import mongoose from "mongoose";
import { IUser } from "../../common/interface/user.interface";
import { role_enum } from "../../common/enums/user.enum";





export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
    
    },
    age: {
        type: Number,
    
    },
    role:{
        type:Number,
        enum:role_enum,
        default:role_enum.user

    }
})



export const UserModel = mongoose.model<IUser>("user", userSchema)