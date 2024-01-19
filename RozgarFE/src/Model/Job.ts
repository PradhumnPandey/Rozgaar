import { User } from "./User"

export interface Job
{
    id? : number
    custId: number
    descp : String
    amount : number
    labourId : number
    status : String
    bidDate? : Date
}