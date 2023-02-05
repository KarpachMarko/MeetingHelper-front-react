import React, {useContext, useEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {AppContext} from "../../state/AppContext";
import {RequirementsService} from "../../services/RequirementsService";
import {RequirementParametersService} from "../../services/RequirementParametersService";
import {IRequirement} from "../../domain/entity/IRequirement";
import {RequirementForm} from "../../components/RequirementForm";

export const EditRequirement = () => {

    const {meetingId, eventId, requirementId} = useParams();
    
    const navigate = useNavigate();
    const appState = useContext(AppContext);
    const requirementsService = useMemo(() => new RequirementsService(appState), [appState]);
    const requirementParametersService = useMemo(() => new RequirementParametersService(appState), [appState]);

    const [requirement, setRequirement] = useState(undefined as IRequirement | undefined)

    useEffect(() => {
        const fetchRequirement = async () => {
            if (requirementId == null) {
                navigate(`meetings/${meetingId}/events/${eventId}/requirements/new`)
                return
            }
            const response = await requirementsService.get(requirementId);
            if (response.status < 300 && response.data !== undefined) {
                setRequirement(response.data);
            }
        }
        fetchRequirement().catch(console.error);

    }, [eventId, meetingId, navigate, requirementId, requirementParametersService, requirementsService]);

    return (
        <div className={"flex items-center justify-center py-3"}>
            <RequirementForm requirement={requirement}/>
        </div>
    );
}