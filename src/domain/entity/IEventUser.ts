import {IEntityId} from "./IEntityId";

export interface IEventUser extends IEntityId {
    status: number,
    eventId: string,
    userId: string
}