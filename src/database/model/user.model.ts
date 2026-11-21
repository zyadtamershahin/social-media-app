import mongoose from "mongoose";
import { IUser } from "../../common/interface/user.interface";





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
    
    }
})



export const UserModel = mongoose.model<IUser>("user", userSchema)