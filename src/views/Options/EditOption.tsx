import React, {useContext, useEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {AppContext} from "../../state/AppContext";
import {OptionForm} from "../../components/OptionForm";
import {IRequirementOption} from "../../domain/entity/IRequirementOption";
import {RequirementOptionsService} from "../../services/RequirementOptionsService";

export const EditOption = () => {

    const {meetingId, eventId, requirementId, optionId} = useParams();

    const navigate = useNavigate();
    const appState = useContext(AppContext);
    const optionsService = useMemo(() => new RequirementOptionsService(appState), [appState]);

    const [option, setOption] = useState(undefined as IRequirementOption | undefined)

    useEffect(() => {
        const fetchRequirement = async () => {
            if (optionId == null) {
                navigate(`meetings/${meetingId}/events/${eventId}/requirements/${requirementId}/options/new`)
                return
            }
            const response = await optionsService.get(optionId);
            if (response.status < 300 && response.data !== undefined) {
                setOption(response.data);
            }
        }
        fetchRequirement().catch(console.error);

    }, [meetingId, eventId, requirementId, optionId, navigate, optionsService]);

    return (
        <div className={"flex items-center justify-center py-3"}>
            <OptionForm option={option}/>
        </div>
    );
}