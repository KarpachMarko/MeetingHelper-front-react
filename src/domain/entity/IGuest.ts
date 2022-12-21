import {IUser} from "./IUser";

export interface IGuest {
    user: IUser
    role: string
    priority: number
}