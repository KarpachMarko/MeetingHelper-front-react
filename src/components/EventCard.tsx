import {motion} from "framer-motion";
import React, {useContext, useEffect, useMemo, useState} from "react";
import {Guests} from "./Guests";
import {IEvent} from "../domain/entity/IEvent";
import {EditMenu} from "./EditMenu";
import {ConfirmDialog} from "./ConfirmDialog";
import {useNavigate} from "react-router-dom";
import {EventsService} from "../services/EventsService";
import {AppContext} from "../state/AppContext";
import {IGuest} from "../domain/model/IGuest";
import {UsersService} from "../services/UsersService";
import {EventUsersService} from "../services/EventUsersService";
import {getStatusName} from "../enum/GuestStatus";
import {IRequirement} from "../domain/entity/IRequirement";
import {RequirementsService} from "../services/RequirementsService";
import {PaymentsService} from "../services/PaymentsService";
import {getExpensePercent} from "../utils/FormatingUtil";

export const EventCard = (props: {
    event: IEvent,
    selected?: boolean,
    preview?: boolean,
    inactive?: boolean,
    onClick?: () => void
}) => {
    const containerVariants = {
        opened: {height: "auto"},
        closed: {height: "0"}
    }

    const btnVariants = {
        opened: {scaleY: -1},
        closed: {scaleY: 1}
    }

    const doNothing = () => {
    }
    const clickFunc = props.onClick ?? doNothing

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return `${date.getDate()}.${date.getMonth()}`
    }

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        return `${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`
    }

    const navigate = useNavigate();
    const appState = useContext(AppContext);
    const eventsService = useMemo(() => new EventsService(appState), [appState]);
    const eventUsersService = useMemo(() => new EventUsersService(appState), [appState]);
    const requirementsService = useMemo(() => new RequirementsService(appState), [appState]);
    const paymentsService = useMemo(() => new PaymentsService(appState), [appState]);
    const usersService = useMemo(() => new UsersService(appState), [appState]);

    const [isOpen, setIsOpen] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);

    const [guests, setGuests] = useState([] as IGuest[])
    const [requirements, setRequirements] = useState([] as IRequirement[])
    const [totalSpent, setTotalSpent] = useState(0)

    useEffect(() => {
        const fetchGuests = async () => {
            const response = await eventUsersService.getEventUsersInEvent(props.event.id!);
            if (response.status < 300 && response.data !== undefined) {
                const result: IGuest[] = [];
                for (const meetingUser of response.data) {
                    const user = (await usersService.get(meetingUser.userId)).data;
                    if (user != null) {
                        result.push({user: user, role: getStatusName(meetingUser.status), priority: 2})
                    }
                }
                setGuests(result);
            }
        }
        const fetchRequirements = async () => {
            const response = await requirementsService.getRequirementsInEvent(props.event.id!);
            if (response.status < 300 && response.data !== undefined) {
                setRequirements(response.data);
            }
        }
        const fetchSpent = async () => {
            const response = await paymentsService.getEventsPaymentsTotal(props.event.id!);
            if (response.status < 300 && response.data !== undefined) {
                setTotalSpent(response.data);
            }
        }
        fetchGuests().catch(console.error);
        fetchRequirements().catch(console.error);
        fetchSpent().catch(console.error);

    }, [eventUsersService, paymentsService, props, requirementsService, usersService])

    function deleteEvent(eventId: string): void {
        eventsService.delete(eventId).then(() =>
            navigate(0)
        )
    }

    return (
        <div className="h-full relative mb-4 mt-16" onClick={props.inactive ? doNothing : clickFunc}>

            {props.preview ? <></> :
            <div className={"absolute w-full -top-16"}>
                <Guests guests={guests}/>
            </div>
            }

            <div className="h-full relative">
                <div className="max-w-xs mx-auto">
                    <div
                        className={`flex flex-col h-full ${props.inactive ? 'bg-gray-600' : 'bg-white'} box-border shadow-lg rounded-lg ${props.selected ? 'shadow-indigo-400' : ''}`}>
                        {props.preview ? <></> :
                            <div className={"relative overflow-visible"}>
                                {props.event.budgetPerPerson ?
                                    <>
                                        <div
                                            className="absolute bottom-0 w-full bg-gray-200 rounded-t-full h-1.5 dark:bg-gray-700">
                                            <div className="bg-indigo-500 h-1.5 rounded-t-full dark:bg-blue-500"
                                                 style={{width: `${(getExpensePercent(totalSpent, props.event.budgetPerPerson))}%`}}></div>
                                        </div>

                                        <div
                                            className="absolute bottom-1 right-2 rounded-full bg-indigo-500 text-white font-bold shadow-md">
                                            <span className="px-4 py-2">{props.event.budgetPerPerson}$</span>
                                        </div>
                                    </>
                                    : <></>}
                            </div>
                        }


                        <div className="flex-grow flex items-center flex-col p-5">
                            <div className="w-full">
                                <header className="mb-3 flex justify-between gap-3">
                                    <h3 className="text-[22px] text-gray-900 font-extrabold leading-snug">{props.event.title}</h3>

                                    <div className="flex flex-col items-end text-xs">
                                        <span className="w-fit">{formatDate(props.event.startDate)}</span>
                                        <span>{formatTime(props.event.startDate)}-{formatTime(props.event.endDate ?? "")}</span>
                                    </div>
                                </header>
                                <div className="pb-2 mb-2 border-b-2 border-indigo-100">
                                    <p>{props.event.description}</p>
                                </div>
                            </div>

                            <motion.div animate={isOpen ? "opened" : "closed"} variants={containerVariants}
                                        className="w-full h-0 relative text-gray-900 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white overflow-hidden">
                                <span className={"block"}>Requirements</span>
                                {requirements.map((value, index) => (
                                    <div key={index}
                                         className="inline-flex relative items-center py-2.5 px-4 w-full text-sm font-medium border-b border-gray-200 bg-indigo-100 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                                        <svg aria-hidden="true" className="mr-2 w-4 h-4 fill-current"
                                             viewBox="0 0 128 128">
                                            <path className="fill-indigo-400"
                                                  d="M118.52326,36.73483l-17.22791-20.5351a21.58065,21.58065,0,0,0-12.77347-7.3761L62.12027,4.16943A21.554,21.554,0,0,0,47.591,6.72877L24.37583,20.13394a21.5618,21.5618,0,0,0-9.48022,11.301L5.73123,56.62425A21.54433,21.54433,0,0,0,5.72658,71.3718l9.169,25.19395a21.5791,21.5791,0,0,0,9.48022,11.301L47.591,121.26731a21.55616,21.55616,0,0,0,14.52923,2.564l26.40161-4.65882a21.53362,21.53362,0,0,0,12.77347-7.3761l17.22791-20.53045a21.57094,21.57094,0,0,0,5.049-13.865V50.59519A21.55855,21.55855,0,0,0,118.52326,36.73483ZM94.30014,53.14523,61.17272,86.27264a8.10767,8.10767,0,0,1-11.50077,0L33.61919,70.21523a7.839,7.839,0,0,1-2.35032-5.69A8.1159,8.1159,0,0,1,45.14318,58.812L55.4595,69.12834,82.85975,41.72809a8.10237,8.10237,0,0,1,11.51934.02322,7.8508,7.8508,0,0,1,2.355,5.69A7.62208,7.62208,0,0,1,94.30014,53.14523Z"/>
                                        </svg>
                                        <span>{value.title}</span>
                                        <span className="absolute bottom-0 right-2 text-indigo-800 text-xs">Ilja</span>
                                    </div>
                                ))}
                                <div
                                    className="inline-flex justify-center items-center relative items-center py-2 px-4 w-full text-sm font-medium border-b border-gray-200 bg-gray-100 text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth="1.5"
                                         stroke="currentColor" className="h-5 aspect-square">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                                    </svg>
                                    <span onClick={() => {
                                        navigate(`${props.event.id!}/requirements/new`)
                                    }}>Add new</span>
                                </div>
                                <div className={"flex justify-center my-1"}>
                                    <div
                                        onClick={() => {
                                            navigate(`${props.event.id!}/requirements`)
                                        }}
                                        className="font-semibold text-sm inline-flex items-center justify-center px-3 py-1.5 rounded leading-5 transition duration-150 ease-in-out focus:outline-none focus-visible:ring-2 hover:bg-indigo-100 text-indigo-500 cursor-pointer">
                                        Show all requirements
                                    </div>
                                </div>

                            </motion.div>

                            <hr className="mb-3"/>

                            {props.preview ? <></> :
                                <div onClick={() => setIsOpen(isOpen => !isOpen)}
                                     className={"absolute cursor-pointer -bottom-2 w-1/3 h-6 rounded-full bg-indigo-100 shadow-md flex justify-center items-center text-indigo-500"}>
                                    <motion.svg animate={isOpen ? "opened" : "closed"} variants={btnVariants}
                                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                strokeWidth="1.5" stroke="currentColor"
                                                className="h-full aspect-square">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                                    </motion.svg>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {props.preview ? <></> :
                <EditMenu items={[
                    {
                        icon: "edit", action: () => {
                            navigate(`/meetings/${props.event.meetingId}/events/${props.event.id}`)
                        }
                    },
                    {
                        icon: "delete", action: () => {
                            setDeleteDialog(true)
                        }
                    }
                ]}/>
            }
            {deleteDialog ?
                <ConfirmDialog title={"Delete event"}
                               text={"Do you really want to delete this event?"}
                               acceptText={"Delete"}
                               cancelText={"Cancel"}
                               acceptAction={async () => {
                                   await deleteEvent(props.event.id!)
                               }}
                               cancelAction={() => setDeleteDialog(false)}/>
                : <></>}
        </div>
    );
}