import {BaseService} from "./base/BaseService";
import {IAppState} from "../state/IAppState";
import httpClient from "../http-client";
import {IServiceResult} from "./base/IServiceResult";
import {IRequirementUser} from "../domain/entity/IRequirementUser";

export class RequirementUsersService extends BaseService<IRequirementUser> {

    constructor(appState: IAppState) {
        super("/requirementUsers", appState);
    }

    public async getRequirementUsers(requirementId: string): Promise<IServiceResult<IRequirementUser[]>> {
        const getRequest = () =>
            httpClient.get(`${this.path}/requirement/${requirementId}`, this.getConfig());

        return await this.sendRequest<IRequirementUser[]>(getRequest);
    }
}