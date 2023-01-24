import React, {useContext, useEffect, useMemo, useState} from "react";
import {EventForm} from "../../components/EventForm";
import {useParams} from "react-router-dom";
import {AppContext} from "../../state/AppContext";
import {EventsService} from "../../services/EventsService";
import {IEvent} from "../../domain/entity/IEvent";

export const EditEvent = () => {

    const {eventId} = useParams();
    const appState = useContext(AppContext);
    const eventsService = useMemo(() => new EventsService(appState), [appState]);

    const [event, setEvent] = useState(undefined as IEvent | undefined)

    useEffect(() => {
        const fetchData = async () => {
            const response = await eventsService.get(eventId!);
            if (response.status < 300 && response.data !== undefined) {
                setEvent(response.data);
            }
        }
        fetchData().catch(console.error);

    }, [eventId, eventsService]);

    return (
        <div className={"flex items-center justify-center py-3"}>
            <EventForm event={event}/>
        </div>
    );
}