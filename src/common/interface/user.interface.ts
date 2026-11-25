import { role_enum } from "../enums/user.enum"




export interface IUser {
  name?: string | undefined
  email: string
  password: string
  confirm_password? :string |undefined
  isVerified?: boolean
  phone?: string |undefined
  age?: number |undefined
  role?:role_enum |undefined
  _id?:string |undefined
}