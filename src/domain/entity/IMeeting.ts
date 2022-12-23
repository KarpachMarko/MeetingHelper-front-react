import {IEntityId} from "./IEntityId";
import {IUser} from "./IUser";


export interface IMeeting extends IEntityId {
	title: string
	description: string
	startDate: string
	endDate: string
	budgetPerPerson: number
	spentBudget: number
	users: IUser[]
}

export const meetingInitial: IMeeting = {
	id: "",
	title: "",
	description: "",
	startDate: "",
	endDate: "",
	budgetPerPerson: 0,
	spentBudget: 0,
	users: []
}