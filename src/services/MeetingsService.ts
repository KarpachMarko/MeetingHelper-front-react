import {BaseService} from "./base/BaseService";
import {IMeeting} from "../domain/entity/IMeeting";
import {IAppState} from "../state/IAppState";

export class MeetingsService extends BaseService<IMeeting> {

	constructor(appSate: IAppState) {
		super("/meetings", appSate);
	}
}