import {BaseService} from "./base/BaseService";
import {IAppState} from "../state/IAppState";
import {IParameterInOption} from "../domain/entity/IParameterInOption";
import {IServiceResult} from "./base/IServiceResult";
import httpClient from "../http-client";

export class ParameterInOptionService extends BaseService<IParameterInOption> {

    constructor(appState: IAppState) {
        super("/RequirementsParameterInOptions", appState);
    }

    public async getParameters(optionId: string): Promise<IServiceResult<string[]>> {
		const getRequest = () =>
            httpClient.get(`${this.path}/options/${optionId}`, this.getConfig());

        return await this.sendRequest<string[]>(getRequest);
	}

    public async setParameters(optionId: string, parameters: IParameterInOption[]): Promise<IServiceResult<void>> {
		const getRequest = () =>
            httpClient.put(`${this.path}/options/${optionId}`, parameters, this.getConfig());

        return await this.sendRequest<void>(getRequest);
	}
}