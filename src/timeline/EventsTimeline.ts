import {EventSequence} from "./EventSequence";
import {ITimelineHour} from "../domain/model/timeline/ITimelineHour";
import {ITimelineRow} from "../domain/model/timeline/ITimelineRow";
import {List} from "../utils/List";


export class EventsTimeline {

    private readonly _eventsStartDate: Date | undefined;
    private readonly _eventSequences: EventSequence[];

    private readonly _columnPriorities: Map<string, number> = new Map();
    private _columnPriorityIndex: number = 0;

    constructor(...eventSequences: EventSequence[]) {
        const dateStr = eventSequences.map(value => value.event.startDate).sort()[0];
        if (dateStr !== undefined) {
            this._eventsStartDate = this.roundDateToHour(new Date(dateStr));
        }
        this._eventSequences = eventSequences;
    }

    get eventsStartDate(): Date | undefined {
        return this._eventsStartDate;
    }

    public getTimeline(): ITimelineHour[] {
        if (this.eventsStartDate === undefined || this._eventSequences.length === 0) {
            return [];
        }
        const timelineHours: ITimelineHour[] = [];

        const eventSequences = new List(this._eventSequences);
        let hour = new Date(this.eventsStartDate);
        let i = 0;
        while (!eventSequences.isEmpty() && i < 10) {
            const timelineHour = this.getTimelineHour(hour, eventSequences);
            if (timelineHour !== undefined) {
                timelineHours.push(timelineHour);
            }
            hour = this.getNextHour(hour);
            i++;
        }

        return timelineHours;
    }

    private getTimelineHour(hour: Date, eventSequences: List<EventSequence>): ITimelineHour | undefined {
        const timelineRows: ITimelineRow[] = [];

        let newRow: ITimelineRow | undefined = this.getTimelineRow(hour, eventSequences);
        while (newRow !== undefined) {
            timelineRows.push(newRow);
            newRow = this.getTimelineRow(hour, eventSequences);
        }
        return timelineRows.length > 0 ? {hour: hour, eventRows: this.filterTimelineRows(timelineRows)} : undefined;
    }

    private filterTimelineRows(timelineRows: ITimelineRow[]): ITimelineRow[] {
        const filteredTimelineRows: ITimelineRow[] = [];
        const existingEventsId: string[] = [];

        for (let i = timelineRows.length - 1; i >= 0; i--) {
            const timelineRow = timelineRows[i];
            const filteredTimelineRow: ITimelineRow = {events: []};
            for (let j = timelineRow.events.length - 1; j >= 0; j--) {
                const event = timelineRow.events[j];
                if (!existingEventsId.includes(event.event.id)) {
                    filteredTimelineRow.events.unshift(event);
                    existingEventsId.push(event.event.id);
                }
            }
            filteredTimelineRows.unshift(filteredTimelineRow);
        }
        return filteredTimelineRows;
    }

    private getTimelineRow(hour: Date, eventSequences: List<EventSequence>): ITimelineRow | undefined {
        const timelineRow: ITimelineRow = {events: []};

        const nextEvents: EventSequence[] = [];
        for (let i = 0; i < eventSequences.size(); i++) {
            const eventSequence = eventSequences.get(i);

            if (eventSequence.isBetweenDates(hour, this.getNextHour(hour))) {
                timelineRow.events.push({
                    columnPriority: this.getColumnPriority(eventSequence),
                    event: eventSequence.event,
                    nextEventId: eventSequence.getNext().map(value => value.event.id)
                });
                nextEvents.push(...eventSequence.getNext());
            }
        }

        eventSequences.filter(value => !value.isBetweenDates(hour, this.getNextHour(hour)));
        eventSequences.add(...nextEvents);

        return timelineRow.events.length > 0 ? timelineRow : undefined;
    }

    private getColumnPriority(eventSequence: EventSequence): number {
        const rootId = eventSequence.getRotEvent().id;
        if (!this._columnPriorities.has(rootId)) {
            this._columnPriorities.set(rootId, this._columnPriorityIndex);
            this._columnPriorityIndex++;
        }
        return this._columnPriorities.get(rootId)!
    }

    private roundDateToHour(date: Date): Date {
        const roundedDate = new Date(date);
        roundedDate.setMinutes(0);
        roundedDate.setSeconds(0);
        roundedDate.setMilliseconds(0);
        return roundedDate;
    }

    private getNextHour(date: Date): Date {
        const nextHour = new Date(date);
        const hours = nextHour.getHours() + 1;
        nextHour.setHours(hours);
        return nextHour;
    }
}