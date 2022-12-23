import {IUser} from "../entity/IUser";

export interface IGuest {
    user: IUser
    role: string
    priority: number
}