import {IEvent} from "../domain/entity/IEvent";

export class EventSequence {

    private _previousEvent: EventSequence | undefined;
    private readonly _event: IEvent;
    private readonly _nextEvents: EventSequence[] = [];

    constructor(event: IEvent) {
        this._event = event;
    }

    get event(): IEvent {
        return this._event;
    }

    public addNext(sequence: EventSequence): void {
        if (sequence.getPrevious() === undefined) {
            sequence._previousEvent = this;
        }
        this._nextEvents.push(sequence);
    }

    public addNextEvent(event: IEvent): void {
        const sequence = new EventSequence(event);
        sequence._previousEvent = this;
        this._nextEvents.push(sequence);
    }

    public getNext(): EventSequence[] {
        return this._nextEvents;
    }

    public getPrevious(): EventSequence | undefined {
        return this._previousEvent;
    }

    public isBetweenDates(from: Date, to: Date): boolean {
        const startDate = new Date(this.event.startDate);
        return from <= startDate && startDate < to;
    }

    public getRotEvent(): IEvent {
        let eventSequence: EventSequence = this;
        let previousEventSequence = eventSequence.getPrevious();

        while (previousEventSequence !== undefined) {
            eventSequence = previousEventSequence;
            previousEventSequence = eventSequence.getPrevious();
        }
        return eventSequence.event;
    }
}