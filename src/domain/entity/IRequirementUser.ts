import {IEntityId} from "./IEntityId";

export interface IRequirementUser extends IEntityId {
    role: number,
    requirementId: string,
    userId: string
}