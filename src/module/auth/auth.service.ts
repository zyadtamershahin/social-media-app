
import { loginDto } from "./dto/auth.dto";





export class Auth_service{

    async Login(data:loginDto):Promise<any>{
        let {name, age, email, password} = data
        return data
    }
}

const auth_service = new Auth_service()
export default auth_service