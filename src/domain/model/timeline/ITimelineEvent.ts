import {IEvent} from "../../entity/IEvent";

export interface ITimelineEvent {
    columnPriority: number;
    event: IEvent
    nextEventId: string[]
}