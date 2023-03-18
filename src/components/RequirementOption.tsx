import React, {useContext, useEffect, useMemo, useState} from "react";
import {BasicButton} from "./BasicButton";
import {useNavigate, useParams} from "react-router-dom";
import {IRequirementOption} from "../domain/entity/IRequirementOption";
import {EditMenu} from "./EditMenu";
import {ConfirmDialog} from "./ConfirmDialog";
import {ParameterInOptionService} from "../services/ParameterInOptionService";
import {RequirementParametersService} from "../services/RequirementParametersService";
import {AppContext} from "../state/AppContext";
import {IRequirementParameter} from "../domain/entity/IRequirementParameter";
import {PriorityIcon} from "./PriorityIcon";
import {RequirementOptionsService} from "../services/RequirementOptionsService";

export const RequirementOption = (props: { option: IRequirementOption }) => {

    const {meetingId, eventId, requirementId} = useParams();


    const navigate = useNavigate();
    const appState = useContext(AppContext);

    const optionsService = useMemo(() => new RequirementOptionsService(appState), [appState]);
    const parameterInOptionService = useMemo(() => new ParameterInOptionService(appState), [appState]);
    const requirementParametersService = useMemo(() => new RequirementParametersService(appState), [appState]);

    const [deleteDialog, setDeleteDialog] = useState(false);
    const [parameters, setParameters] = useState([] as IRequirementParameter[]);
    const canEdit = true;

    useEffect(() => {
        const fetchParameters = async () => {
            if (props.option?.id == null) {
                return
            }
            const response = await parameterInOptionService.getParameters(props.option?.id);
            if (response.status < 300 && response.data !== undefined) {
                const parametersId = response.data;
                const parameters: IRequirementParameter[] = [];
                for (const paramId of parametersId) {
                    const paramResponse = await requirementParametersService.get(paramId);
                    if (paramResponse.status < 300 && paramResponse.data !== undefined) {
                        parameters.push(paramResponse.data);
                    }
                }
                setParameters(parameters);
            }
        }
        fetchParameters().catch(console.error);

    }, [props, parameterInOptionService, requirementParametersService])

    function deleteEvent(eventId: string): void {
        optionsService.delete(eventId).then(() =>
            navigate(0)
        )
    }

    return (
        <div
            className={`block relative my-4 p-4 rounded-lg bg-white shadow-lg min-w-[150px] ${canEdit ? "pb-12" : ""}`}>
            {/*<img
				alt="123 Wallaby Avenue, Park Road"
				src="https://images.unsplash.com/photo-1554995207-c18c203602cb"
				className="object-cover w-full rounded-md"
			/>*/}

            <div className="mt-2">
                <div className="text-sm text-gray-500">
                    $240,000
                </div>

                <div className="font-medium">
                    {props.option.title}
                </div>

                <div className="font-light">
                    {props.option.description}
                </div>

                <div className={"flex flex-wrap max-w-sm gap-2 mt-2 mb-4 text-xs"}>
                    {parameters.map((param, index) => {
                        return (
                            <div key={index} className={"bg-indigo-100 rounded-md px-3 py-1"}>
                                <div className={"flex gap-1 h-4 items-center text-md"}>
                                    <PriorityIcon priority={param.priority}/>
                                    {param.parameterDesc}
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className={"flex justify-end"}>
                    {props.option.link != null && props.option.link.length > 0 ?
                        <BasicButton
                            text={"Link"}
                            className={"flex-grow-0 px-5"}
                            background={"gray"}
                            action={() => navigate(props.option.link, {replace: false})}
                        /> : <></>}
                </div>
            </div>

            {canEdit ?
                <EditMenu items={[
                    {
                        icon: "edit", action: () => {
                            navigate(`/meetings/${meetingId}/events/${eventId}/requirements/${requirementId}/options/${props.option.id}`)
                        }
                    },
                    {
                        icon: "delete", action: () => {
                            setDeleteDialog(true)
                        }
                    }
                ]}/> : <></>}

            {deleteDialog ?
                <ConfirmDialog title={"Delete requirement option"}
                               text={"Do you really want to delete this requirement option?"}
                               acceptText={"Delete"}
                               cancelText={"Cancel"}
                               color={"red"}
                               acceptAction={async () => {
                                   await deleteEvent(props.option.id!)
                               }}
                               cancelAction={() => setDeleteDialog(false)}/>
                : <></>}
        </div>
    )
}