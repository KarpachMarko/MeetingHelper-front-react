import {ArcherContainer, ArcherElement} from "react-archer";
import React, {useContext, useEffect, useMemo, useState} from "react";
import {AppContext} from "../state/AppContext";
import {EventSequence} from "../timeline/EventSequence";
import {EventsService} from "../services/EventsService";
import {EventsTimeline} from "../timeline/EventsTimeline";
import {EventCard} from "./EventCard";
import {IEvent} from "../domain/entity/IEvent";
import moment from "moment";

export const EventSelector = (props: { event?: IEvent, meetingId: string, selected?: string[], selectFunc: (eventsId: string[]) => void }) => {

    const appState = useContext(AppContext);

    const [eventSequences, setEventSequences] = useState([] as EventSequence[]);
    const [events, setEvents] = useState(props.selected ?? []);

    function changeSelected(id: string): string[] {
        if (events.includes(id)) {
            return events.filter(value => value !== id)
        } else {
            return events.concat(id)
        }
    }

    const eventsService = useMemo(() => new EventsService(appState), [appState]);

    useEffect(() => {
        const fetchData = async () => {
            if (props.meetingId === undefined) {
                return;
            }
            const eventSequences = await eventsService.getMeetingSequences(props.meetingId);

            setEventSequences(eventSequences);
        }
        fetchData().catch(console.error);
    }, [eventsService, props]);

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
                                                                            onClick={() => setEvents(changeSelected(timelineEvent.event.id!))}
                                                                            event={timelineEvent.event}
                                                                            preview={true}
                                                                            selected={events.includes(timelineEvent.event.id!)}
                                                                            inactive={props.event?.id === timelineEvent.event.id ||
                                                                                moment(timelineEvent.event.startDate) >= moment(props.event?.startDate)}
                                                                        />
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
                    <div
                        onClick={() => props.selectFunc(events)}
                        className={"fixed bottom-5 left-5 z-50 bg-white drop-shadow-lg py-3 px-4 rounded-2xl text-indigo-500 cursor-pointer z-50"}>
                        <div className={"flex items-center gap-1"}>
                            <span className={"text-2xl"}>Save</span>
                        </div>
                    </div>
                </ArcherContainer>
            </div>
        </div>
    )
}