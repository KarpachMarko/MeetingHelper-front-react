import {BaseService} from "./base/BaseService";
import {IUser} from "../domain/entity/IUser";
import {IAppState} from "../state/IAppState";

export class UsersService extends BaseService<IUser> {

    constructor(appState: IAppState) {
        super("/users", appState);
    }
}