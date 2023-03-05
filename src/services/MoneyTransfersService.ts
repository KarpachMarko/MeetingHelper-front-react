import {BaseService} from "./base/BaseService";
import {IMoneyTransfer} from "../domain/entity/IMoneyTransfer";
import {IAppState} from "../state/IAppState";
import {IServiceResult} from "./base/IServiceResult";
import httpClient from "../http-client";

export class MoneyTransfersService extends BaseService<IMoneyTransfer> {
    constructor(appState: IAppState) {
        super("/moneyTransfers", appState);
    }

    public async getMeetingMoneyTransfers(meetingId: string): Promise<IServiceResult<IMoneyTransfer[]>> {
        const getRequest = () =>
            httpClient.get(`${this.path}/meeting/${meetingId}`, this.getConfig());

        return await this.sendRequest<IMoneyTransfer[]>(getRequest);
    }

    public async getDebtsMoneyTransfers(meetingId: string): Promise<IServiceResult<IMoneyTransfer[]>> {
        const getRequest = () =>
            httpClient.get(`${this.path}/meeting/${meetingId}/debts`, this.getConfig());

        return await this.sendRequest<IMoneyTransfer[]>(getRequest);
    }
}