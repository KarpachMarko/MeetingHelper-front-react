import {IEntityId} from "./IEntityId";

export interface IRequirementParameter extends IEntityId{
    requirementDesc: string
    priority: number
}