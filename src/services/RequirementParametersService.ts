import {BaseService} from "./base/BaseService";
import {IAppState} from "../state/IAppState";
import {IRequirement} from "../domain/entity/IRequirement";
import {IServiceResult} from "./base/IServiceResult";
import httpClient from "../http-client";
import {IRequirementParameter} from "../domain/entity/IRequirementParameter";

export class RequirementParametersService extends BaseService<IRequirement> {

    constructor(appState: IAppState) {
        super("/requirementParameters", appState);
    }

    public async getRequirementParameters(requirementId: string): Promise<IServiceResult<IRequirementParameter[]>> {
		const getRequest = () =>
            httpClient.get(`${this.path}/requirement/${requirementId}`, this.getConfig());

        return await this.sendRequest<IRequirementParameter[]>(getRequest);
	}

    public async setRequirementParameters(requirementId: string, parameters: IRequirementParameter[]): Promise<IServiceResult<void>> {
		const getRequest = () =>
            httpClient.put(`${this.path}/requirement/${requirementId}`, parameters, this.getConfig());

        return await this.sendRequest<void>(getRequest);
	}
}