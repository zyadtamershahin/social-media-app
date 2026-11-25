import {Router} from 'express';
import { Request, Response } from 'express';
import auth_service from './auth.service';
import { validation } from '../../common/service/validation.service';
import { signup_schema,login_schema } from '../auth/dto/auth.dto';
import { success_response } from '../../common/exception/success.response';
import { IReq } from '../../common/interface/IReq.interface';
import { auth } from '../../common/middleware/auth.middleware';
import auth_service_instance from './auth.service';

const router = Router()


router.post('/login', validation(login_schema) ,async (req : Request, res: Response) :Promise<void> =>{
    let data = auth_service_instance.Login(req.body)
    success_response({res, message:"login succses" , data})
})


router.post("/singup" , validation(signup_schema), async (req :Request ,res: Response) : Promise<void> =>{
    let data = await auth_service_instance.signup(req.body)
    success_response({res,message:"signup", data})
})

router.get("/get-user-by-id",auth, async (req:IReq , res:Response)=>{
    let data = await auth_service_instance.get_user_by_id(req.userId as string)
    success_response({res,message:"done",data})
})

router.get("/vAccount", (req,res)=>{
    let data = auth_service_instance.verify(req.query)
    success_response({res,data,message:"account verifed"})
})


export default router