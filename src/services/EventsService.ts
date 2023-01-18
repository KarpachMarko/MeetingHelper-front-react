import {BaseService} from "./base/BaseService";
import {IAppState} from "../state/IAppState";
import {IServiceResult} from "./base/IServiceResult";
import {IEvent} from "../domain/entity/IEvent";
import httpClient from "../http-client";
import {EventSequence} from "../timeline/EventSequence";

export class EventsService extends BaseService<IEvent> {

    constructor(appState: IAppState) {
        super("/events", appState);
    }

    public async getMeetingSequences(meetingId: string): Promise<EventSequence[]> {
        const rootEvents = (await this.getFirstMeetingEvents(meetingId)).data ?? [];

        const sequences: EventSequence[] = [];
        for (const rootEvent of rootEvents) {
            sequences.push(await this.buildEventSequence(new EventSequence(rootEvent)));
        }

        return sequences;
    }

    private async buildEventSequence(rootSequence: EventSequence): Promise<EventSequence> {
        const nextEvents = (await this.getNextMeetingEvents(rootSequence.event.id!)).data ?? [];
        for (const nextEvent of nextEvents) {
            const sequence = await this.buildEventSequence(new EventSequence(nextEvent));
            rootSequence.addNext(sequence);
        }
        return rootSequence;
    }

    public async getMeetingEvents(meetingId: string): Promise<IServiceResult<IEvent[]>> {
        const getRequest = () =>
            httpClient.get(`${this.path}/meeting/${meetingId}`, this.getConfig());

        return await this.sendRequest<IEvent[]>(getRequest);
    }

    public async getFirstMeetingEvents(meetingId: string): Promise<IServiceResult<IEvent[]>> {
        const getRequest = () =>
            httpClient.get(`${this.path}/meeting/${meetingId}/first`, this.getConfig());

        return await this.sendRequest<IEvent[]>(getRequest);
    }

    public async getNextMeetingEvents(id: string): Promise<IServiceResult<IEvent[]>> {
        const getRequest = () =>
            httpClient.get(`${this.path}/${id}/next`, this.getConfig());

        return await this.sendRequest<IEvent[]>(getRequest);
    }

    public async getPreviousMeetingEvents(id: string): Promise<IServiceResult<IEvent[]>> {
        const getRequest = () =>
            httpClient.get(`${this.path}/${id}/previous`, this.getConfig());

        return await this.sendRequest<IEvent[]>(getRequest);
    }
}