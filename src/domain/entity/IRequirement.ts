import {IEntityId} from "./IEntityId";

export interface IRequirement extends IEntityId{
    title: string
    description: string
    budgetPerPerson: number
    decisionDate: string
    eventId: string
}