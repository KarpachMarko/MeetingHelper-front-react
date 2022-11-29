import {IEntityId} from "./IEntityId";


export interface IMeeting extends IEntityId {
	title: string
	description: string
	startDate: string
	endDate: string
	budgetPerPerson: number
}

export const meetingInitial: IMeeting = {
	id: "",
	title: "",
	description: "",
	startDate: "",
	endDate: "",
	budgetPerPerson: 0,
}