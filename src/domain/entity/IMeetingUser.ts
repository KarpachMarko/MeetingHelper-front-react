import {IEntityId} from "./IEntityId";

export interface IMeetingUser extends IEntityId {
    role: number,
    meetingId: string,
    userId: string
}