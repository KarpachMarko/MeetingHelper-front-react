import {BaseService} from "./base/BaseService";
import {IAppState} from "../state/IAppState";
import {IEventNavigation} from "../domain/entity/IEventNavigation";

export class EventNavigationsService extends BaseService<IEventNavigation> {

    constructor(appState: IAppState) {
        super("/eventNavigations", appState);
    }
}