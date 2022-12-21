import {IEntityId} from "./IEntityId";

export interface IUser extends IEntityId {
	telegramId: string
    username: string
	firstName?: string
	lastName?: string
	fullName: string
}