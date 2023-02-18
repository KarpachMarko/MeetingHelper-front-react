import {ArcherContainer, ArcherElement} from "react-archer";
import {useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useMemo, useState} from "react";
import {AppContext} from "../../state/AppContext";
import {EventsService} from "../../services/EventsService";
import {EventCard} from "../../components/EventCard";
import {EventSequence} from "../../timeline/EventSequence";
import {EventsTimeline} from "../../timeline/EventsTimeline";
import {CardToCreate} from "../../components/CardToCreate";
import {ArrayUtils} from "../../utils/ArrayUtils";
import {Page} from "../../components/Page";
import {BackBtn} from "../../components/backBtn";
import {ESize} from "../../enum/ESize";

export const Events = () => {

    let {meetingId} = useParams();
    const appState = useContext(AppContext);
    const navigate = useNavigate();

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

    const formatTime = (date: Date) => {
        return `${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`
    }

    return (
        <Page
            name={"Events"}
            backBtn={<BackBtn text={"Back to meetings"} action={() => navigate("/meetings")}/>}
            allowScroll={false}
            nameSize={ESize.SMALL}
        >
            <div className={"w-screen h-full mt-2 overflow-y-scroll snap-y snap-mandatory"}>
                <div>
                    <ArcherContainer strokeColor="#818CF8" className="h-full flex mx-auto w-max">
                        <div className="flex flex-col justify-center items-center h-full gap-20 m-5">

                            {timelineHours.length === 0 ? <CardToCreate onClick={() => navigate("new")}/> : <></>}

                            {timelineHours.map((timelineHour, timelineHourIndex) => {
                                return (
                                    <div key={timelineHourIndex}
                                         className={"flex-1 w-full h-full justify-center flex flex-col snap-start"}>
                                        <div className={"w-full h-2 rounded-full bg-indigo-400 opacity-30"}></div>
                                        <span
                                            className={"text-3xl text-indigo-200"}>{formatTime(timelineHour.hour)}</span>

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
                                                                            <EventCard event={timelineEvent.event}/>
                                                                        </div>
                                                                    </ArcherElement>
                                                                )
                                                            })
                                                        }

                                                        {Array.from(Array(ArrayUtils.getMaxNum(timelineHours[timelineHourIndex].eventRows.map(value => value.events.length))! - eventRow.events.length).keys()).map(value => {
                                                            return (
                                                                <div key={value} className={"invisible"}><CardToCreate/>
                                                                </div>
                                                            )
                                                        })}

                                                    </div>
                                                )
                                            })}
                                            {timelineHourIndex === timelineHours.length - 1 ?
                                                <div><CardToCreate onClick={() => navigate("new")}/></div> : <></>}
                                        </div>
                                    </div>
                                )
                            })}
                            <div className={"invisible"}><CardToCreate/></div>

                        </div>
                    </ArcherContainer>
                </div>
            </div>
        </Page>
    )
}