import {IEntityId} from "./IEntityId";

export interface IRequirementOption extends IEntityId {
    title: string
    description: string
    link: string
    price: number
    status: number
    requirementId: string
}