import React, {useContext, useEffect, useMemo, useState} from "react";
import {AppContext} from "../../state/AppContext";
import {useNavigate, useParams} from "react-router-dom";
import {Page} from "../../components/Page";
import {BackBtn} from "../../components/backBtn";
import {CardToCreate} from "../../components/CardToCreate";
import {IRequirementOption} from "../../domain/entity/IRequirementOption";
import {RequirementOptionsService} from "../../services/RequirementOptionsService";
import {RequirementOption} from "../../components/RequirementOption";

export const Options = () => {

    const {meetingId, eventId, requirementId} = useParams();

    const navigate = useNavigate();
    const appState = useContext(AppContext);
    const optionsService = useMemo(() => new RequirementOptionsService(appState), [appState]);

    const [options, setOptions] = useState([] as IRequirementOption[])

    useEffect(() => {
        const fetchRequirements = async () => {
            if (requirementId == null) {
                return;
            }
            const response = await optionsService.getRequirementOptions(requirementId);
            if (response.status < 300 && response.data !== undefined) {
                setOptions(response.data);
            }
        }
        fetchRequirements().catch(console.error);

    }, [requirementId, optionsService])

    return (
        <Page
            name={"Requirement options"}
            backBtn={<BackBtn text={"Back to requirements"}
                              action={() => navigate(`/meetings/${meetingId}/events/${eventId}/requirements`)}/>}
        >
            <div className={"flex gap-10 justify-center items-center flex-wrap"}>
                {options.map((value, index) => (
                    <RequirementOption option={value} key={index}/>
                ))}
            </div>
            <div className={"flex justify-center mt-10"}>
                <CardToCreate onClick={() => navigate("new")}/>
            </div>
        </Page>
    )
}