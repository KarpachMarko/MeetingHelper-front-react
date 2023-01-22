import {ArcherContainer, ArcherElement} from "react-archer";
import {useParams} from "react-router-dom";
import React, {useContext, useEffect, useMemo, useState} from "react";
import {AppContext} from "../state/AppContext";
import {EventSequence} from "../timeline/EventSequence";
import {EventsService} from "../services/EventsService";
import {EventsTimeline} from "../timeline/EventsTimeline";
import {EventCard} from "./EventCard";

export const EventSelector = (props: { selectFunc: (eventId: string) => void }) => {

    let {meetingId} = useParams();
    const appState = useContext(AppContext);

    const [eventSequences, setEventSequences] = useState([] as EventSequence[]);

    const eventsService = useMemo(() => new EventsService(appState), [appState]);

    useEffect(() => {
        const fetchData = async () => {
            if (meetingId === undefined) {
                return;
            }
            const eventSequences = await eventsService.getMeetingSequences(meetingId);

            setEventSequences(eventSequences);
        }
        fetchData().catch(console.error);
    }, [eventsService, meetingId]);

    const timeline = new EventsTimeline(...eventSequences);
    const timelineHours = timeline.getTimeline();

    return (
        <div className={"w-screen h-screen overflow-y-scroll snap-y snap-mandatory"}>
            <div>
                <ArcherContainer strokeColor="#818CF8" className="h-full flex mx-auto w-max">
                    <div className="flex flex-col justify-center items-center h-full gap-20 m-5">

                        {timelineHours.map((timelineHour, timelineHourIndex) => {
                            return (
                                <div key={timelineHourIndex}
                                     className={"flex-1 w-full h-full justify-center flex flex-col snap-start"}>
                                    <div className={"flex flex-col gap-16 items-center"}>
                                        {timelineHour.eventRows.map((eventRow, eventRowIndex) => {
                                            return (
                                                <div key={eventRowIndex}
                                                     className="flex-1 h-full items-center justify-center flex flex-row gap-10 snap-start">
                                                    {eventRow.events
                                                        .sort((a, b) => a.columnPriority > b.columnPriority ? 1 : -1)
                                                        .map((timelineEvent, timelineEventIndex) => {
                                                            return (
                                                                <ArcherElement key={timelineEventIndex}
                                                                               id={timelineEvent.event.id!}
                                                                               relations={timelineEvent.nextEventId.map(nextEventId => {
                                                                                   return (
                                                                                       {
                                                                                           targetId: nextEventId,
                                                                                           sourceAnchor: "bottom",
                                                                                           targetAnchor: "top"
                                                                                       }
                                                                                   )
                                                                               })}
                                                                >
                                                                    <div>
                                                                        <EventCard
                                                                            onClick={() => props.selectFunc(timelineEvent.event.id!)}
                                                                            event={timelineEvent.event}
                                                                            preview={true}/>
                                                                    </div>
                                                                </ArcherElement>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </ArcherContainer>
            </div>
        </div>
    )
}