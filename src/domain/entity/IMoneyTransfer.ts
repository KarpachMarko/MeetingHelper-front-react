import {IEntityId} from "./IEntityId";

export interface IMoneyTransfer extends IEntityId {
    amount: number
    sentTime?: string
    acceptedTime?: string
    transferType?: number
    senderId: string
    receiverId: string
    receiverBankId?: string
    meetingId?: string
}