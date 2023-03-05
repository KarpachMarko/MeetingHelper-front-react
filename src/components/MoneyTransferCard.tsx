import React, {useContext, useEffect, useMemo, useState} from "react";
import {IMoneyTransfer} from "../domain/entity/IMoneyTransfer";
import {getTransferTypeName} from "../enum/MoneyTransferType";
import {AppContext} from "../state/AppContext";
import {UsersService} from "../services/UsersService";
import {IUser} from "../domain/entity/IUser";
import moment from "moment/moment";

export const MoneyTransferCard = (props: { moneyTransfer: IMoneyTransfer }) => {
    const approved = props.moneyTransfer.acceptedTime != null;
    const inFuture = props.moneyTransfer.sentTime == null;

    const appState = useContext(AppContext);
    const usersService = useMemo(() => new UsersService(appState), [appState]);

    const [sender, setSender] = useState({} as IUser);
    const [senderPhoto, setSenderPhoto] = useState(undefined as string | undefined);
    const [receiver, setReceiver] = useState({} as IUser);
    const [receiverPhoto, setReceiverPhoto] = useState(undefined as string | undefined);

    const formatTime = (dateStr: string) => {
        const date = moment(dateStr);
        return date.format("DD.MM HH:mm")
    }

    useEffect(() => {
        const fetchReceiver = async () => {
            const senderId = props.moneyTransfer.senderId;
            const user = (await usersService.get(senderId)).data;
            if (user != null) {

                setSender(user);
            }
            setSenderPhoto(await usersService.getUserPhotoUrl(senderId))
        }
        const fetchSender = async () => {
            const receiverId = props.moneyTransfer.receiverId;
            const user = (await usersService.get(receiverId)).data;
            if (user != null) {
                setReceiver(user);
            }
            setReceiverPhoto(await usersService.getUserPhotoUrl(receiverId))
        }
        fetchReceiver().catch(console.error);
        fetchSender().catch(console.error);

    }, [usersService, props.moneyTransfer]);

    return (
        <div className={"flex flex-col"}>
            <div className={"flex mt-4 p-1 flex-col bg-white rounded-xl drop-shadow-lg"}>
                {inFuture ? <></> :
                    <div
                        className={`absolute -top-0 left-4 transform -translate-y-[50%] flex justify-center items-center gap-2 h-6 px-3 py-1 bg-white rounded-md ${approved ? "text-green-400" : "text-amber-400"}`}>
                        {approved ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="h-full aspect-square">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="h-full aspect-square">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>}
                        <span>{approved ? "Approved" : "Waiting for approval"}</span>
                    </div>
                }

                <div className={"flex w-max gap-5"}>
                    <div className={"flex flex-1 flex-col justify-center items-center px-4 py-2 text-gray-50"}>
                        {senderPhoto === undefined ? <></> :
                            <img className="rounded-full m-0 w-16 aspect-square"
                                 src={senderPhoto}
                                 alt={sender.fullName}/>
                        }
                        <div
                            className="max-w-full leading-none text-center font-medium text-gray-800">{sender.fullName}</div>
                    </div>
                    <div className={"flex flex-col items-center justify-center w-10 text-indigo-500 py-3"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="w-full aspect-square">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"/>
                        </svg>
                    </div>
                    <div className={"flex flex-1 flex-col justify-center items-center px-4 py-2"}>
                        {receiverPhoto === undefined ? <></> :
                            <img className="rounded-full m-0 w-16 aspect-square"
                                 src={receiverPhoto}
                                 alt={receiver.fullName}/>
                        }
                        <div
                            className="max-w-full leading-none text-center font-medium text-gray-800">{receiver.fullName}</div>
                    </div>
                </div>
                <div className={"flex justify-around py-2 font-medium border-t-[2px] border-gray-100"}>
                    <span className={"flex-1 text-center text-green-500"}>${props.moneyTransfer.amount}</span>
                    {inFuture ? <></> :
                        <span className={"flex-1 text-center"}>{formatTime(props.moneyTransfer.sentTime!)}</span>
                    }
                    {props.moneyTransfer.transferType != null ?
                        <span
                            className={"flex-1 text-center text-indigo-400"}>{getTransferTypeName(props.moneyTransfer.transferType)}</span>
                        : <></>}
                </div>

            </div>
            {approved || inFuture ? <></> :
                <div className={"flex justify-end"}>
                    <div
                        className={`w-max mt-1 drop-shadow-md py-1 px-3 bg-indigo-400 text-white rounded-md`}>
                        Approve
                    </div>
                </div>
            }
        </div>
    )
}