import {MeetingForm} from "../../components/MeetingForm";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useMemo, useState} from "react";
import {AppContext} from "../../state/AppContext";
import {MeetingsService} from "../../services/MeetingsService";
import {IMeeting} from "../../domain/entity/IMeeting";

export const EditMeeting = () => {

    const {meetingId} = useParams();
    const appState = useContext(AppContext);
    const meetingsService = useMemo(() => new MeetingsService(appState), [appState]);
    
    const [meeting, setMeeting] = useState(undefined as IMeeting | undefined)

    useEffect(() => {
        const fetchData = async () => {
            const response = await meetingsService.get(meetingId!);
            if (response.status < 300 && response.data !== undefined) {
                setMeeting(response.data);
            }
        }
        fetchData().catch(console.error);
        
    }, [meetingId, meetingsService]);

    return (
        <div className={"flex items-center justify-center py-3"}>
            <MeetingForm meeting={meeting}/>
        </div>
    );
}