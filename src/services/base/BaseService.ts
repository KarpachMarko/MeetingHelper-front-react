import {IService} from "./IService";
import {IJwtResponse} from "../../domain/model/IJwtResponse";
import {IAppState} from "../../state/IAppState";
import {IdentityService} from "../IdentityService";
import {AxiosError, AxiosResponse} from "axios";
import {IServiceResult} from "./IServiceResult";
import {IError} from "../../domain/model/IError";
import httpClient from "../../http-client";
import {IEntityId} from "../../domain/entity/IEntityId";

export class BaseService<TEntity extends IEntityId> implements IService<TEntity> {

	private readonly trysOnRequest = 2;
	protected jwt: IJwtResponse | null;

	constructor(private path: string, protected appState: IAppState) {
		this.jwt = appState.jwt ?? new IdentityService().getJwtFromCookies();
	}

	getConfig = () => {
		return {
			headers: {
				Authorization: `Bearer ${this.jwt?.token}`
			}
		};
	};

	async sendRequest<TData>(
		request: () => Promise<AxiosResponse>,
		trysLeft: number = this.trysOnRequest
	): Promise<IServiceResult<TData>> {
		try {
			const response = await request();

			return {
				status: response.status,
				data: response.data as TData,
			};
		} catch (e) {
			const response = (e as AxiosError).response as AxiosResponse;

			if (response.status === 401 && this.jwt) {
				const identityService = new IdentityService();
				this.jwt = (await identityService.refreshIdentity(this.jwt!, this.appState.setJwt)).data ?? null;

				if (trysLeft > 0) {
					trysLeft--;
					return await this.sendRequest(request, trysLeft);
				} else {
					return {
						status: response.status,
						error: {
							errorMsg: response.data.error
						},
					};
				}
			} else if (response.status === 401) {
				return {
					status: ((e as AxiosError).response as AxiosResponse).status,
					error: {
						errorMsg: "Unauthorized"
					} as IError,
				};
			} else {
				return {
					status: ((e as AxiosError).response as AxiosResponse).status,
					error: {
						errorMsg: ((e as AxiosError).response as AxiosResponse).data.title
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

		return this.sendRequest<TEntity>(getRequest);
	}

	async add(entity: TEntity): Promise<IServiceResult<TEntity>> {
		const getRequest = () =>
			httpClient.post(`${this.path}`, entity, this.getConfig());

		return this.sendRequest<TEntity>(getRequest);
	}

	async delete(id: string): Promise<IServiceResult<TEntity>> {
		const getRequest = () =>
			httpClient.delete(`${this.path}/${id}`, this.getConfig());

		return this.sendRequest<TEntity>(getRequest);
	}

	async edit(entity: TEntity): Promise<IServiceResult<TEntity>> {
		const id = entity.id;

		const getRequest = () =>
			httpClient.put(`${this.path}/${id}`, entity, this.getConfig());

		return this.sendRequest<TEntity>(getRequest);
	}
}