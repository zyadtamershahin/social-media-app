import {Router} from 'express';
import { Request, Response } from 'express';
import auth_service from './auth.service';
import { validation } from '../../common/service/validation.service';
import { signupSchema } from '../auth/dto/auth.dto';

const router = Router()


router.post('/', validation(signupSchema) ,async (req : Request, res: Response) :Promise<void> =>{
    let {name} = req.body
    console.log(name)
    let data = await auth_service.Login(name)
    res.json(data)
})

export default router