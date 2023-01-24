import {IEntityId} from "./IEntityId";

export interface IEventNavigation extends IEntityId {
    previousEventId: string
    nextEventId: string
}