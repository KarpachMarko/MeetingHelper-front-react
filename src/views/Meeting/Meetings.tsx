import {MeetingCard} from "../../components/MeetingCard";
import {useContext, useEffect, useMemo, useState} from "react";
import {AppContext} from "../../state/AppContext";
import {IMeeting} from "../../domain/entity/IMeeting";
import {initialError} from "../../domain/model/IError";
import {MeetingsService} from "../../services/MeetingsService";
import {Error} from "../../components/Error";
import {CardToCreate} from "../../components/CardToCreate";
import {useNavigate} from "react-router-dom";

export const Meetings = () => {

    const appState = useContext(AppContext);
    const navigate = useNavigate();

    const [meetings, setMeetings] = useState([] as IMeeting[])
    const [error, setError] = useState(initialError)

    const meetingsService = useMemo(() => new MeetingsService(appState), [appState]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await meetingsService.getAll();
            setError(response.error);
            if (response.status < 300 && response.data !== undefined) {
                setMeetings(response.data);
            }
        }
        fetchData().catch(console.error);
    }, [meetingsService])

    if (error !== undefined) {
        return <Error error={error}/>
    } else {
        return (
            <div className={"h-screen flex items-center flex-col mt-3 gap-5 overflow-x-hidden"}>
                {meetings.map(meeting => {
                    return <MeetingCard key={meeting.id} meeting={meeting}/>
                })}
                <CardToCreate onClick={() => navigate("/meetings/new")} />
            </div>
        )
    }
}