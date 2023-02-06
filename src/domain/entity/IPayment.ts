import {IEntityId} from "./IEntityId";

export interface IPayment extends IEntityId {
    amount: number
    timestamp: string
    requirementId: string
    userId: string
}