import React, {useContext, useEffect, useMemo, useState} from "react";
import {AppContext} from "../state/AppContext";
import {useNavigate, useParams} from "react-router-dom";
import {ConfirmDialog} from "./ConfirmDialog";
import {motion} from "framer-motion";
import {IRequirementOption} from "../domain/entity/IRequirementOption";
import {RequirementParametersService} from "../services/RequirementParametersService";
import {IRequirementParameter} from "../domain/entity/IRequirementParameter";
import {PriorityIcon} from "./PriorityIcon";
import {Toggle} from "./Toggle";
import {RequirementOptionsService} from "../services/RequirementOptionsService";
import {ParameterInOptionService} from "../services/ParameterInOptionService";

export const OptionForm = (props: { option?: IRequirementOption }) => {

    const {meetingId, eventId, requirementId} = useParams();

    const formInit: IRequirementOption = useMemo(() => {
        return {
            title: props.option?.title ?? "",
            description: props.option?.description ?? "",
            link: props.option?.link ?? "",
            price: props.option?.price ?? 100,
            status: -1,
            requirementId: requirementId ?? ""
        }
    }, [props, requirementId])

    const navigate = useNavigate();
    const appState = useContext(AppContext);

    const requirementOptionsService = useMemo(() => new RequirementOptionsService(appState), [appState]);
    const parameterInOptionService = useMemo(() => new ParameterInOptionService(appState), [appState]);
    const requirementParametersService = useMemo(() => new RequirementParametersService(appState), [appState]);

    const [form, setForm] = useState(formInit);
    const [selectedParameters, setSelectedParameters] = useState([] as string[])
    const [parameters, setParameters] = useState([] as IRequirementParameter[])
    const [cancel, setCancel] = useState(false);

    useEffect(() => {
        setForm(formInit)
        const fetchParameters = async () => {
            if (requirementId == null) {
                return
            }
            const response = await requirementParametersService.getRequirementParameters(requirementId);
            if (response.status < 300 && response.data !== undefined) {
                setParameters(response.data);
            }
        }
        const fetchSelectedParameters = async () => {
            if (props.option?.id == null) {
                return
            }
            const response = await parameterInOptionService.getParameters(props.option?.id);
            if (response.status < 300 && response.data !== undefined) {
                setSelectedParameters(response.data);
            }
        }
        fetchParameters().catch(console.error);
        fetchSelectedParameters().catch(console.error);

    }, [formInit, parameterInOptionService, props, requirementId, requirementParametersService])

    const sendForm = () => {
        if (eventId == null) {
            return;
        }
        const option: IRequirementOption = {...form}
        if (props.option?.id) {
            option.id = props.option?.id
            requirementOptionsService.edit(option).then(() => {
                parameterInOptionService.setParameters(option.id!, selectedParameters.map(paramId => {
                    return {requirementOptionId: option.id!, requirementParameterId: paramId}
                })).then(() => {
                    navigate(`/meetings/${meetingId}/events/${eventId}/requirements/${requirementId}/options`)
                })
            })
        } else {
            requirementOptionsService.add(option).then(res => {
                const optionId = res.data?.id!;
                parameterInOptionService.setParameters(optionId, selectedParameters.map(paramId => {
                    return {requirementOptionId: option.id!, requirementParameterId: paramId}
                })).then(() => {
                    navigate(`/meetings/${meetingId}/events/${eventId}/requirements/${requirementId}/options`)
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

                    <label className="block text-sm font-medium text-gray-700">
                        Parameters
                    </label>
                    <div className={"flex flex-wrap gap-1"}>
                        {parameters.map((value, index) => {
                                return (
                                    <label
                                        key={index}
                                        className="block relative overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                                    >
                                        <div className={"flex gap-1 h-4 justify-center items-center"}>
                                            <PriorityIcon priority={value.priority}/>
                                            {value.parameterDesc}
                                            <Toggle
                                                label={""}
                                                isChecked={value.id != null ? selectedParameters.includes(value.id) : false}
                                                toggleFunc={(checked) => {
                                                    if (value.id == null) {
                                                        return
                                                    }
                                                    if (checked && !selectedParameters.includes(value.id)) {
                                                        setSelectedParameters(selectedParameters.concat(value.id));
                                                    } else if (!checked && selectedParameters.includes(value.id)) {
                                                        setSelectedParameters(selectedParameters.filter(v => v !== value.id));
                                                    }
                                                }}
                                            />
                                        </div>
                                    </label>
                                )
                            }
                        )}
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
                    acceptAction={() => navigate(`/meetings/${meetingId}/events/${eventId}/requirements/${requirementId}/options`)}/> : <></>
            }
        </div>
    )
}