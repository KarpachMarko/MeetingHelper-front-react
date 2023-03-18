import {BaseService} from "./base/BaseService";
import {IAppState} from "../state/IAppState";
import {IRequirementOption} from "../domain/entity/IRequirementOption";
import {IServiceResult} from "./base/IServiceResult";
import httpClient from "../http-client";

export class RequirementOptionsService extends BaseService<IRequirementOption> {

    constructor(appState: IAppState) {
        super("/requirementOptions", appState);
    }

    public async getRequirementOptions(requirementId: string): Promise<IServiceResult<IRequirementOption[]>> {
        const getRequest = () =>
            httpClient.get(`${this.path}/requirement/${requirementId}`, this.getConfig());

        return await this.sendRequest<IRequirementOption[]>(getRequest);
    }
}