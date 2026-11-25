import type {Request} from 'express'


export interface IReq extends Request{
    userId?:string
}