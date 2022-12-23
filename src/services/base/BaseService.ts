import {IService} from "./IService";
import {IAppState} from "../../state/IAppState";
import {AxiosError, AxiosResponse} from "axios";
import {IServiceResult} from "./IServiceResult";
import {IError} from "../../domain/model/IError";
import httpClient from "../../http-client";
import {IEntityId} from "../../domain/entity/IEntityId";
import {VerificationService} from "../VerificationService";

export class BaseService<TEntity extends IEntityId> implements IService<TEntity> {

    constructor(protected path: string, protected appState: IAppState) {
    }

    getConfig = () => {
        return {
            headers: {
                AuthorizationData: VerificationService.getData("&"),
                AuthorizationHash: VerificationService.getDataHash(),
            }
        };
    };

    async sendRequest<TData>(
        request: () => Promise<AxiosResponse>,
    ): Promise<IServiceResult<TData>> {
        try {
            const response = await request();

            return {
                status: response.status,
                data: response.data as TData,
            };
        } catch (e) {
            const response = (e as AxiosError).response as AxiosResponse;

            if (response.status === 401) {
                return {
                    status: response.status,
                    error: {
                        responseStatus: response.status,
                        errorMsg: "Unauthorized"
                    } as IError,
                };
            } else {
                return {
                    status: response.status,
                    error: {
                        responseStatus: response.status,
                        errorMsg: response.data.title
                    },
                };
            }
        }
    }

    async getAll(): Promise<IServiceResult<TEntity[]>> {
        const getRequest = () =>
            httpClient.get(`${this.path}`, this.getConfig());

        return await this.sendRequest<TEntity[]>(getRequest);
    }

    async get(id: string): Promise<IServiceResult<TEntity>> {
        const getRequest = () =>
            httpClient.get(`${this.path}/${id}`, this.getConfig());

        return await this.sendRequest<TEntity>(getRequest);
    }

    async add(entity: TEntity): Promise<IServiceResult<TEntity>> {
        const getRequest = () =>
            httpClient.post(`${this.path}`, entity, this.getConfig());

        return await this.sendRequest<TEntity>(getRequest);
    }

    async delete(id: string): Promise<IServiceResult<TEntity>> {
        const getRequest = () =>
            httpClient.delete(`${this.path}/${id}`, this.getConfig());

        return await this.sendRequest<TEntity>(getRequest);
    }

    async edit(entity: TEntity): Promise<IServiceResult<TEntity>> {
        const id = entity.id;

        const getRequest = () =>
            httpClient.put(`${this.path}/${id}`, entity, this.getConfig());

        return await this.sendRequest<TEntity>(getRequest);
    }
}