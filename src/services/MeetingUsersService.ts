import {BaseService} from "./base/BaseService";
import {IAppState} from "../state/IAppState";
import {IMeetingUser} from "../domain/entity/IMeetingUser";
import httpClient from "../http-client";
import {IServiceResult} from "./base/IServiceResult";

export class MeetingUsersService extends BaseService<IMeetingUser> {

	constructor(appState: IAppState) {
		super("/meetingUsers", appState);
	}

	public async getMeetingUsersInMeeting(id: string): Promise<IServiceResult<IMeetingUser[]>> {
		const getRequest = () =>
            httpClient.get(`${this.path}/meeting/${id}`, this.getConfig());

        return await this.sendRequest<IMeetingUser[]>(getRequest);
	}
}