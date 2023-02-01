import {BaseService} from "./base/BaseService";
import {IAppState} from "../state/IAppState";
import httpClient from "../http-client";
import {IServiceResult} from "./base/IServiceResult";
import {IEventUser} from "../domain/entity/IEventUser";

export class EventUsersService extends BaseService<IEventUser> {

	constructor(appState: IAppState) {
		super("/eventUsers", appState);
	}

	public async getEventUsersInEvent(id: string): Promise<IServiceResult<IEventUser[]>> {
		const getRequest = () =>
            httpClient.get(`${this.path}/event/${id}`, this.getConfig());

        return await this.sendRequest<IEventUser[]>(getRequest);
	}
}