
import { IUser } from "../../common/interface/user.interface";
import { loginDto } from "./dto/auth.dto";
import { DataBaseRepository } from "../../database/repository/dataBase.repository";
import { UserModel } from "../../database/model/user.model"



export class auth_service {
    private authrepository:DataBaseRepository<IUser>

    constructor() {
        this.authrepository = new DataBaseRepository<IUser>(UserModel)
    }
    async Login(data: loginDto): Promise<any> {
        
        let dataa=await this.authrepository.create(data)
        return dataa
    }
}

const auth_service_instance = new auth_service()
export default auth_service_instance