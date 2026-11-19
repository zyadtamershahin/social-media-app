import {Router} from 'express';
import { Request, Response } from 'express';
import auth_service from './auth.service';


const router = Router()


router.post('/',async (req : Request, res: Response) :Promise<void> =>{
    let {name} = req.body
    console.log(name)
    let data = await auth_service.Login(name)
    res.json(data)
})

export default router