import {ITimelineRow} from "./ITimelineRow";

export interface ITimelineHour {
    hour: Date
    eventRows: ITimelineRow[]
}