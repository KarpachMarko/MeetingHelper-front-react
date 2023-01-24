import React, {useContext, useEffect, useState} from "react";
import moment from "moment";
import {motion} from "framer-motion";
import {ConfirmDialog} from "./ConfirmDialog";
import {IMeeting} from "../domain/entity/IMeeting";
import {MeetingsService} from "../services/MeetingsService";
import {AppContext} from "../state/AppContext";
import {useNavigate} from "react-router-dom";

export const MeetingForm = (props: { meeting?: IMeeting }) => {

    interface IForm {
        title: string
        description: string
        startDate: string
        endDate?: string
        budgetPerPerson?: number
    }

    const formInit: IForm = {
        title: props.meeting?.title ?? "",
        description: props.meeting?.description ?? "",
        startDate: (props.meeting?.startDate ? moment(props.meeting?.startDate) : moment()).format("YYYY-MM-DD"),
        endDate: props.meeting?.endDate ? moment(props.meeting?.endDate).format("YYYY-MM-DD") : undefined,
        budgetPerPerson: props.meeting?.budgetPerPerson ?? 0
    }

    const [form, setForm] = useState(formInit);
    const [cancel, setCancel] = useState(false);
    const [useBudget, setUseBudget] = useState(!!props.meeting?.budgetPerPerson);

    useEffect(() => {
        setForm(formInit)
        setUseBudget(!!props.meeting?.budgetPerPerson)
    }, [props])

    const fieldVariants = {
        opened: {scale: 1, opacity: 1},
        closed: {scale: 0.9, opacity: 0.4}
    }

    const appState = useContext(AppContext);
    const navigate = useNavigate();
    const meetingsService = new MeetingsService(appState);

    const sendForm = () => {
        const meeting: IMeeting = form
        if (!useBudget) {
            meeting.budgetPerPerson = undefined
        }
        if (props.meeting?.id) {
            meeting.id = props.meeting?.id
            meetingsService.edit(meeting).then(() => {
                navigate("/meetings")
            })
        } else {
            meetingsService.add(meeting).then(() => {
                navigate("/meetings")
            })
        }


    }

    return (
        <div className={"shadow-2xl bg-white rounded-lg w-10/12 p-4 mx-5 min-h-min flex flex-col items-center"}>
            <div className={"w-full"}>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Meeting
                </label>
                <div className="relative my-1 rounded-md">
                    <label
                        className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
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

                    <div className={"flex gap-1 justify-around mt-2"}>
                        <label
                            className="flex-1 block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                        >
                            <span className="text-xs font-medium text-gray-500">Start date</span>

                            <input
                                type="date"
                                name="startDate"
                                value={moment(form.startDate).format("YYYY-MM-DD")}
                                onChange={event => setForm({...form, startDate: event.target.value})}
                                className="mt-1 text-sm w-full text-gray-800 border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                            />
                        </label>
                        <label
                            className="flex-1 block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                        >
                            <span className="text-xs font-medium text-gray-500">End date (optional)</span>

                            <input
                                type="date"
                                name="endDate"
                                value={form.endDate ? moment(form.endDate).format("YYYY-MM-DD") : ""}
                                onChange={event => setForm({...form, endDate: event.target.value})}
                                className="mt-1 text-sm w-full text-gray-800 border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                            />
                        </label>
                    </div>
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
                acceptAction={() => navigate("/meetings")}/> : <></>}
        </div>
    )
}