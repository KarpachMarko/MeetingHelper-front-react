import {BaseService} from "./base/BaseService";
import {IAppState} from "../state/IAppState";
import {IEventNavigation} from "../domain/entity/IEventNavigation";
import {IServiceResult} from "./base/IServiceResult";
import httpClient from "../http-client";

export class EventNavigationsService extends BaseService<IEventNavigation> {

    constructor(appState: IAppState) {
        super("/eventNavigations", appState);
    }

    public async getMeetingEvents(meetingId: string): Promise<IServiceResult<IEventNavigation[]>> {
        const getRequest = () =>
            httpClient.get(`${this.path}/meeting/${meetingId}`, this.getConfig());

        return await this.sendRequest<IEventNavigation[]>(getRequest);
    }

    async updateRelation(meetingId: string,
                         eventId: string,
                         previousEventsId: string[]): Promise<IEventNavigation[]> {
        const result = await this.getMeetingEvents(meetingId);
        const eventNavigations = result.data ?? [];

        for (const eventNavigation of eventNavigations) {
            if (eventNavigation.nextEventId === eventId) {
                await this.delete(eventNavigation.id!)
            }
        }

        const res: IEventNavigation[] = []
        for (const prevEventId of previousEventsId) {
            const eventNavigation = (await this.add({previousEventId: prevEventId, nextEventId: eventId})).data;
            if (eventNavigation) {
                res.push(eventNavigation)
            }
        }
        return res;
    }
}