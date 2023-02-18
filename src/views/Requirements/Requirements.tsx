import React, {useContext, useEffect, useMemo, useState} from "react";
import {RequirementsService} from "../../services/RequirementsService";
import {AppContext} from "../../state/AppContext";
import {useNavigate, useParams} from "react-router-dom";
import {IRequirement} from "../../domain/entity/IRequirement";
import {Requirement} from "../../components/Requirement";
import {CardToCreate} from "../../components/CardToCreate";
import {Page} from "../../components/Page";
import {BackBtn} from "../../components/backBtn";
import {ESize} from "../../enum/ESize";

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
        <Page
            name={"Requirements"}
            nameSize={ESize.BIG}
            backBtn={<BackBtn text={"Back to events"} action={() => navigate(`/meetings/${meetingId}/events`)}/>}
        >
            <div className={"flex gap-10 justify-center items-center flex-wrap"}>
                {requirements.map((value, index) => (
                    <Requirement requirement={value} key={index}/>
                ))}
            </div>
            <div className={"flex justify-center mt-10"}>
                <CardToCreate onClick={() => navigate("new")}/>
            </div>
        </Page>
    )
}