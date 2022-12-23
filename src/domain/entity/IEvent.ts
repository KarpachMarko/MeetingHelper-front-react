import {IEntityId} from "./IEntityId";

export interface IEvent extends IEntityId {
    title: string
    description: string
    startDate: string
    endDate: string
    decisionDate?: string
    budgetPerPerson?: number
    minPersonCount?: number
    maxPersonCount?: number
    locationTitle: string
    locationLink?: string
    meetingId: string
}