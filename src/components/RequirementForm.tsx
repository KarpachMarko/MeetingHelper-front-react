import React, {useContext, useEffect, useMemo, useState} from "react";
import moment from "moment";
import {AppContext} from "../state/AppContext";
import {useNavigate, useParams} from "react-router-dom";
import {PrioritySelector} from "./PrioritySelector";
import {IRequirementParameter} from "../domain/entity/IRequirementParameter";
import {ConfirmDialog} from "./ConfirmDialog";
import {AnimatePresence, motion} from "framer-motion";
import {IRequirement} from "../domain/entity/IRequirement";
import {RequirementParametersService} from "../services/RequirementParametersService";
import {RequirementsService} from "../services/RequirementsService";

export const RequirementForm = (props: { requirement?: IRequirement }) => {

    const {meetingId, eventId} = useParams();

    interface IForm {
        title: string
        description: string
        deadlineDate: string
        budgetPerPerson: number
    }

    const formInit: IForm = {
        title: props.requirement?.title ?? "",
        description: props.requirement?.description ?? "",
        deadlineDate: (props.requirement?.decisionDate ? moment(props.requirement?.decisionDate) : moment()).format("YYYY-MM-DD"),
        budgetPerPerson: props.requirement?.budgetPerPerson ?? 10
    }

    const parametersInit: IRequirementParameter[] = [
        {priority: 0, parameterDesc: ""}
    ]
    
    const navigate = useNavigate();
    const appState = useContext(AppContext);
    
    const requirementsService = useMemo(() => new RequirementsService(appState), [appState]);
    const requirementParametersService = useMemo(() => new RequirementParametersService(appState), [appState]);
    
    const [form, setForm] = useState(formInit);
    const [parameters, setParameters] = useState(parametersInit)
    const [cancel, setCancel] = useState(false);

    useEffect(() => {
        setForm(formInit)

        const fetchParameters = async () => {
            if (props.requirement?.id == null) {
                return
            }
            const response = await requirementParametersService.getRequirementParameters(props.requirement?.id);
            if (response.status < 300 && response.data !== undefined) {
                setParameters(response.data);
            }
        }
        fetchParameters().catch(console.error);

    }, [eventId, meetingId, navigate, props, requirementParametersService])

    const sendForm = () => {
        if (eventId == null) {
            return;
        }
        const requirement: IRequirement = {...form, decisionDate: form.deadlineDate, eventId: eventId}
        if (props.requirement?.id) {
            requirement.id = props.requirement?.id
            requirementsService.edit(requirement).then(() => {
                requirementParametersService.setRequirementParameters(requirement.id!, parameters.map(value => {return {...value, requirementId: requirement.id} })).then(() => {
                    navigate(`/meetings/${meetingId}/events/${eventId}/requirements`)
                })
            })
        } else {
            requirementsService.add(requirement).then(res => {
                const requirementId = res.data?.id!;
                requirementParametersService.setRequirementParameters(requirementId, parameters.map(value => {return {...value, requirementId: requirementId} })).then(() => {
                    navigate(`/meetings/${meetingId}/events/${eventId}/requirements`)
                })
            })
        }
    }

    return (
        <div className={"shadow-2xl bg-white rounded-lg w-10/12 p-4 mx-5 min-h-min flex flex-col items-center"}>
            <div className={"w-full"}>
                <label className="block text-sm font-medium text-gray-700">
                    Requirement
                </label>
                <div className="relative my-1 rounded-md flex flex-col gap-2">
                    <label
                        className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                        <span className="text-xs font-medium text-gray-500"> Title </span>

                        <input
                            type="text"
                            name="requirementTitle"
                            value={form.title}
                            onChange={event => setForm({...form, title: event.target.value})}
                            placeholder="Trip to london"
                            className="mt-1 w-full text-gray-800 border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        />
                    </label>

                    <textarea
                        name="requirementDescription"
                        className="block text-gray-800 w-full overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                        placeholder="Description"
                        value={form.description}
                        onChange={event => setForm({...form, description: event.target.value})}
                        rows={6}
                    />

                    <div className={"flex gap-1 justify-around"}>
                        <label
                            className="flex-1 block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                        >
                            <span className="text-xs font-medium text-gray-500">Deadline date</span>

                            <input
                                type="date"
                                name="startDate"
                                value={moment(form.deadlineDate).format("YYYY-MM-DD")}
                                onChange={event => setForm({...form, deadlineDate: event.target.value})}
                                className="mt-1 text-sm w-full text-gray-800 border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                            />
                        </label>
                        <label
                            className="flex-1 block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                        >
                            <span className="text-xs font-medium text-gray-500">Budget per person</span>

                            <input
                                type="number"
                                min={0}
                                step={1}
                                value={form.budgetPerPerson}
                                onChange={event => setForm({...form, budgetPerPerson: +event.target.value})}
                                name="budgetPerPerson"
                                className="mt-1 text-sm w-full text-gray-800 border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                            />
                        </label>
                    </div>

                    <label className="block text-sm font-medium text-gray-700">
                        Parameters
                    </label>
                    <div className={"flex flex-col gap-1"}>
                        <AnimatePresence>
                            {parameters.map((value, index) => {
                                    return (
                                        <motion.label
                                            initial={{scale: 0.8, opacity: 0}}
                                            animate={{scale: 1, opacity: 1}}
                                            exit={{scale: 0.95, opacity: 0, height: 0, margin: -10}}
                                            key={index}
                                            transition={{type: "spring"}}
                                            className="block relative overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                                        >
                                            <div
                                                onClick={() => {
                                                    setParameters(parameters.filter((val, i) => i !== index))
                                                }}
                                                className={"absolute top-1 right-3 w-6 h-6 bg-white drop-shadow-md rounded-full text-red-600 p-1 flex justify-center items-center cursor-pointer z-20"}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth="1.5" stroke="currentColor"
                                                     className="h-full aspect-square">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15"/>
                                                </svg>
                                            </div>

                                            <PrioritySelector layoutKey={index.toString()} selected={value.priority}
                                                              setPriority={newPriority => {
                                                                  setParameters(parameters.map((val, i) => i === index ? {
                                                                      ...val,
                                                                      priority: newPriority
                                                                  } : val))
                                                              }}/>

                                            <input
                                                type="text"
                                                name="parameterDesc"
                                                value={value.parameterDesc}
                                                onChange={event => {
                                                    setParameters(parameters.map((val, i) => i === index ? {
                                                        ...val,
                                                        parameterDesc: event.target.value
                                                    } : val))
                                                }}
                                                placeholder="In stock"
                                                className="mt-3 ml-2 w-full text-gray-800 border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                            />
                                        </motion.label>
                                    )
                                }
                            )}
                        </AnimatePresence>
                        <motion.label
                            layoutId={"addNew"}
                            onClick={() => {
                                setParameters(parameters.concat({priority: 0, parameterDesc: ""}))
                            }}
                            className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 cursor-pointer"
                        >
                            <div className={"text-gray-600 h-5 flex justify-center items-center gap-2"}>
                                <span>Add parameter</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5"
                                     stroke="currentColor" className="h-full aspect-square">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                                </svg>
                            </div>
                        </motion.label>
                    </div>
                </div>
                <motion.div className={"flex justify-end gap-2"} layoutId={"formActionBtnGroup"}>
                    <div
                        className="font-semibold text-md inline-flex items-center justify-center px-3 py-1.5 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out bg-indigo-50 focus:outline-none focus-visible:ring-2 hover:bg-indigo-100 text-indigo-500 cursor-pointer"
                        onClick={() => setCancel(true)}>Cancel
                    </div>
                    <div
                        className="font-semibold text-lg inline-flex items-center justify-center px-6 py-1.5 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out bg-indigo-500 focus:outline-none focus-visible:ring-2 hover:bg-indigo-600 text-white cursor-pointer"
                        onClick={() => sendForm()}>Submit
                    </div>
                </motion.div>
            </div>

            {
                cancel ? <ConfirmDialog
                    title={"Do you really want to cancel"}
                    text={"All changes will be lost"}
                    cancelText={"No"}
                    cancelAction={() => setCancel(false)}
                    acceptText={"Yes"}
                    acceptAction={() => navigate(`/meetings/${meetingId}/events/${eventId}/requirements`)}/> : <></>
            }
        </div>
    )
}