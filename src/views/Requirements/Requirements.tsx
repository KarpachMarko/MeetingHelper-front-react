import React, {useContext, useEffect, useMemo, useState} from "react";
import {RequirementsService} from "../../services/RequirementsService";
import {AppContext} from "../../state/AppContext";
import {useNavigate, useParams} from "react-router-dom";
import {IRequirement} from "../../domain/entity/IRequirement";
import {Requirement} from "../../components/Requirement";
import {CardToCreate} from "../../components/CardToCreate";

export const Requirements = () => {

    const {meetingId, eventId} = useParams();

    const navigate = useNavigate();
    const appState = useContext(AppContext);
    const requirementsService = useMemo(() => new RequirementsService(appState), [appState]);

    const [requirements, setRequirements] = useState([] as IRequirement[])

    useEffect(() => {
        const fetchRequirements = async () => {
            if (eventId == null) {
                return;
            }
            const response = await requirementsService.getRequirementsInEvent(eventId);
            if (response.status < 300 && response.data !== undefined) {
                setRequirements(response.data);
            }
        }
        fetchRequirements().catch(console.error);

    }, [eventId, requirementsService])

    return (
        <>
            <div
                onClick={() => navigate(`/meetings/${meetingId}/events`)}
                className={"fixed top-2 left-2 z-50 bg-white drop-shadow-lg py-3 px-4 rounded-2xl text-indigo-500 cursor-pointer"}>
                <div className={"flex items-center gap-1"}>
                    <div className={"w-5 h-full"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="h-full aspect-square">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
                        </svg>
                    </div>
                    <span className={"text-lg"}>Back to events</span>
                </div>
            </div>
            <div className={"flex gap-5 justify-center items-center flex-wrap mt-16"}>
                {requirements.map((value, index) => (
                    <Requirement requirement={value} key={index}/>
                ))}
            </div>
            <div className={"flex justify-center mt-10"}>
                <CardToCreate onClick={() => navigate("new")}/>
            </div>
        </>
    )
}