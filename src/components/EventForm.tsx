import React, {useContext, useEffect, useMemo, useState} from "react";
import moment from "moment";
import {motion} from "framer-motion";
import {ConfirmDialog} from "./ConfirmDialog";
import {AppContext} from "../state/AppContext";
import {useNavigate, useParams} from "react-router-dom";
import {IEvent} from "../domain/entity/IEvent";
import {EventsService} from "../services/EventsService";
import {EventSelector} from "./EventSelector";
import {EventNavigationsService} from "../services/EventNavigationsService";

export const EventForm = (props: { event?: IEvent }) => {

    interface IForm {
        title: string
        description: string
        startDate: string
        endDate?: string
        budgetPerPerson?: number
        locationTitle: string
        locationLink: string
        previousEventsId: string[]
    }


    let {meetingId} = useParams();
    const appState = useContext(AppContext);
    const navigate = useNavigate();

    const formInit: IForm = {
        title: props.event?.title ?? "",
        description: props.event?.description ?? "",
        startDate: (props.event?.startDate ? moment(props.event?.startDate) : moment()).format("YYYY-MM-DDTHH:mm"),
        endDate: props.event?.endDate ? moment(props.event?.endDate).format("YYYY-MM-DDTHH:mm") : undefined,
        budgetPerPerson: props.event?.budgetPerPerson ?? 0,
        locationTitle: props.event?.locationTitle ?? "",
        locationLink: props.event?.locationLink ?? "",
        previousEventsId: []
    }

    const eventNavigationsService = useMemo(() => new EventNavigationsService(appState), [appState]);
    const eventsService = useMemo(() => new EventsService(appState), [appState])

    const [form, setForm] = useState(formInit);
    const [cancel, setCancel] = useState(false);
    const [useBudget, setUseBudget] = useState(!!props.event?.budgetPerPerson);
    const [rootEvent, setRootEvent] = useState(true);
    const [selectEvent, setSelectEvent] = useState(false);
    const [events, setEvents] = useState([] as IEvent[]);

    useEffect(() => {
        let form = formInit
        setUseBudget(!!props.event?.budgetPerPerson)

        const fetchData = async () => {
            if (meetingId === undefined) {
                return;
            }
            const events = (await eventsService.getMeetingEvents(meetingId)).data ?? [];

            if (props.event?.id !== undefined) {
                const prevEvents = (await eventsService.getPreviousMeetingEvents(props.event.id)).data ?? []
                const prevEventsId = prevEvents.map(value => value.id!);
                form = {...form, previousEventsId: prevEventsId}
                setRootEvent(prevEventsId.length === 0)
            }

            setEvents(events);
        }

        fetchData().then(() => setForm(form)).catch(console.error)
    }, [eventsService, meetingId, props])

    const fieldVariants = {
        opened: {scale: 1, opacity: 1},
        closed: {scale: 0.9, opacity: 0.4}
    }

    async function selectEventFunc(eventsId: string[]) {
        setRootEvent(eventsId.length === 0);
        setForm({...form, previousEventsId: eventsId})
        setSelectEvent(false);
    }

    function getEventTitle(eventId: string): string {
        for (const event of events) {
            if (event.id === eventId) {
                return event.title
            }
        }
        return "Unknown title"
    }

    function sendForm() {
        const event: IEvent = {...form, meetingId: meetingId!}
        if (!useBudget) {
            event.budgetPerPerson = undefined
        }
        if (props.event?.id) {
            event.id = props.event?.id
            eventsService.edit(event).then(() => {
                eventNavigationsService.updateRelation(
                    meetingId!,
                    event.id!,
                    rootEvent ? [] : form.previousEventsId
                ).then(() => {
                    navigate(`/meetings/${meetingId}/events`)
                })
            })
        } else {
            eventsService.add(event).then(res => {
                if (!rootEvent) {
                    eventNavigationsService.updateRelation(
                        meetingId!,
                        res.data?.id!,
                        rootEvent ? [] : form.previousEventsId
                    ).then(() => {
                        navigate(`/meetings/${meetingId}/events`)
                    })
                } else {
                    navigate(`/meetings/${meetingId}/events`)
                }
            })
        }
    }

    return (
        <div className={"shadow-2xl bg-white rounded-lg w-10/12 p-4 mx-5 min-h-min flex flex-col items-center"}>
            <div className={"w-full"}>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Event
                </label>
                <div className="relative my-1 rounded-md flex flex-col gap-2">
                    <label
                        className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 m-0"
                    >
                        <span className="text-xs font-medium text-gray-500"> Title </span>

                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={event => setForm({...form, title: event.target.value})}
                            placeholder="Trip to london"
                            className="mt-1 w-full text-gray-800 border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        />
                    </label>

                    <textarea
                        name="description"
                        className="block text-gray-800 w-full overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                        placeholder="Description"
                        value={form.description}
                        onChange={event => setForm({...form, description: event.target.value})}
                        rows={6}
                    />

                    <div className={"flex flex-col gap-1"}>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-0">
                            Location
                        </label>
                        <label
                            className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 m-0"
                        >
                            <span className="text-xs font-medium text-gray-500"> Location Title </span>

                            <input
                                type="text"
                                name="locationTitle"
                                value={form.locationTitle}
                                onChange={event => setForm({...form, locationTitle: event.target.value})}
                                placeholder="Viru Gate"
                                className="mt-1 w-full text-gray-800 border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                            />
                        </label>
                        <label
                            className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 m-0"
                        >
                            <span className="text-xs font-medium text-gray-500"> Location Title </span>

                            <input
                                type="text"
                                name="locationLink"
                                value={form.locationLink}
                                onChange={event => setForm({...form, locationLink: event.target.value})}
                                placeholder="https://goo.gl/maps/..."
                                className="mt-1 w-full text-gray-800 border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                            />
                        </label>
                    </div>

                    <div className={"flex gap-1 justify-around"}>
                        <label
                            className="flex-1 block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                        >
                            <span className="text-xs font-medium text-gray-500">Start date</span>

                            <input
                                type="datetime-local"
                                name="startDate"
                                value={moment(form.startDate).format("YYYY-MM-DDTHH:mm")}
                                onChange={event => setForm({...form, startDate: event.target.value})}
                                className="mt-1 text-sm w-full text-gray-800 border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                            />
                        </label>
                        <label
                            className="flex-1 block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                        >
                            <span className="text-xs font-medium text-gray-500">End date (optional)</span>

                            <input
                                type="datetime-local"
                                name="endDate"
                                value={form.endDate ? moment(form.endDate).format("YYYY-MM-DDTHH:mm") : ""}
                                onChange={event => setForm({...form, endDate: event.target.value})}
                                className="mt-1 text-sm w-full text-gray-800 border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                            />
                        </label>
                    </div>
                    {events.filter(value => value.id !== props.event?.id).length === 0 ? <></> :
                        <div className={"flex flex-col gap-1"}>
                            <label
                                className="flex-1 block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 m-0"
                            >
                            <span
                                className="text-xs font-medium text-gray-500">{rootEvent ? "Root event" : `Previous event: ${form.previousEventsId.map(value => getEventTitle(value)).join(", ")}`}</span>
                            </label>
                            <div className={"flex gap-2"}>
                                <div
                                    className="flex-1 font-semibold text-sm inline-flex items-center justify-center px-2 py-1 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out bg-indigo-50 focus:outline-none focus-visible:ring-2 hover:bg-indigo-100 text-indigo-500"
                                    onClick={() => setRootEvent(true)}>Mark as root event
                                </div>
                                <div
                                    className="flex-1 font-semibold text-sm inline-flex items-center justify-center px-2 py-1 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out bg-indigo-500 focus:outline-none focus-visible:ring-2 hover:bg-indigo-600 text-white"
                                    onClick={() => {
                                        setSelectEvent(true)
                                    }}>Select previous event
                                </div>
                            </div>
                        </div>
                    }
                    <div className={"flex flex-col items-end"}>
                        <label className="relative block inline-flex items-center cursor-pointer">
                            <input className="sr-only peer" type="checkbox" checked={useBudget}
                                   onChange={event => setUseBudget(event.target.checked)}/>
                            <div
                                className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span
                                className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">Set budget</span>
                        </label>
                        <motion.label
                            animate={useBudget ? "opened" : "closed"} variants={fieldVariants}
                            className="w-full block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                        >
                            <span className="text-xs font-medium text-gray-500">Budget per person (optional)</span>

                            <input
                                type="number"
                                min={0}
                                step={1}
                                value={form.budgetPerPerson}
                                onChange={event => setForm({...form, budgetPerPerson: +event.target.value})}
                                disabled={!useBudget}
                                name="budgetPerPerson"
                                className="mt-1 text-sm w-full text-gray-800 border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                            />
                        </motion.label>
                    </div>
                </div>
                <div className={"flex justify-end gap-2"}>
                    <div
                        className="font-semibold text-md inline-flex items-center justify-center px-3 py-1.5 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out bg-indigo-50 focus:outline-none focus-visible:ring-2 hover:bg-indigo-100 text-indigo-500 cursor-pointer"
                        onClick={() => setCancel(true)}>Cancel
                    </div>
                    <div
                        className="font-semibold text-lg inline-flex items-center justify-center px-6 py-1.5 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out bg-indigo-500 focus:outline-none focus-visible:ring-2 hover:bg-indigo-600 text-white cursor-pointer"
                        onClick={() => sendForm()}>Submit
                    </div>
                </div>
            </div>

            {cancel ? <ConfirmDialog
                title={"Do you really want to cancel"}
                text={"All changes will be lost"}
                cancelText={"No"}
                cancelAction={() => setCancel(false)}
                acceptText={"Yes"}
                acceptAction={() => navigate(`/meetings/${meetingId}/events`)}/> : <></>}

            {selectEvent ?
                <div className={"fixed top-0 left-0 h-screen w-screen bg-gray-800 bg-opacity-70 z-50"}>
                    <EventSelector event={props.event} meetingId={meetingId!} selected={form.previousEventsId}
                                   selectFunc={selectEventFunc}/>
                </div> :
                <></>}
        </div>
    )
}