import {IEntityId} from "./IEntityId";

export interface IRequirementParameter extends IEntityId{
    parameterDesc: string
    priority: number
    requirementId?: string
}