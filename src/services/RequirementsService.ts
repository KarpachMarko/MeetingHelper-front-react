import {BaseService} from "./base/BaseService";
import {IAppState} from "../state/IAppState";
import {IRequirement} from "../domain/entity/IRequirement";
import {IServiceResult} from "./base/IServiceResult";
import httpClient from "../http-client";

export class RequirementsService extends BaseService<IRequirement> {

    constructor(appState: IAppState) {
        super("/requirements", appState);
    }

    public async getRequirementsInEvent(eventId: string): Promise<IServiceResult<IRequirement[]>> {
		const getRequest = () =>
            httpClient.get(`${this.path}/event/${eventId}`, this.getConfig());

        return await this.sendRequest<IRequirement[]>(getRequest);
	}
}