import {IEntityId} from "./IEntityId";

export interface IParameterInOption extends IEntityId {
    requirementOptionId: string
    requirementParameterId: string
}