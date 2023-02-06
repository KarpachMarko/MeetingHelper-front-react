import {BaseService} from "./base/BaseService";
import {IAppState} from "../state/IAppState";
import {IServiceResult} from "./base/IServiceResult";
import httpClient from "../http-client";
import {IPayment} from "../domain/entity/IPayment";

export class PaymentsService extends BaseService<IPayment> {

    constructor(appState: IAppState) {
        super("/payments", appState);
    }

    public async getRequirementPayment(requirementId: string): Promise<IServiceResult<IPayment[]>> {
		const getRequest = () =>
            httpClient.get(`${this.path}/requirement/${requirementId}`, this.getConfig());

        return await this.sendRequest<IPayment[]>(getRequest);
	}

    public async getEventsTotalPayment(eventId: string): Promise<IServiceResult<number>> {
		const getRequest = () =>
            httpClient.get(`${this.path}/event/${eventId}/total`, this.getConfig());

        return await this.sendRequest<number>(getRequest);
	}
}