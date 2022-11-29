import type {AxiosError, AxiosResponse} from "axios";
import {IServiceResult} from "./base/IServiceResult";
import {IJwtResponse} from "../domain/model/IJwtResponse";
import httpClient from "../http-client";

export class IdentityService {

	async login(
		email: string,
		password: string
	): Promise<IServiceResult<IJwtResponse>> {
		const loginInfo = {email, password};
		try {
			const response = await httpClient.post(
				"/identity/account/login",
				loginInfo
			);

			const data = response.data as IJwtResponse;
			document.cookie = `token=${data.token};path=/;`
			document.cookie = `refreshToken=${data.refreshToken};path=/;`

			return {
				status: response.status,
				data: data,
			};
		} catch (e) {
			return {
				status: ((e as AxiosError).response as AxiosResponse).status,
				error: {
					errorMsg: ((e as AxiosError).response as AxiosResponse).data.error
				},
			};
		}
	}

	async refreshIdentity(jwt: IJwtResponse, setJwt: (jwt: IJwtResponse | null) => void): Promise<IServiceResult<IJwtResponse>> {
		try {
			const response = await httpClient.post(
				"/identity/account/refreshToken",
				jwt
			);


			document.cookie = `token=${response.data.token};path=/;`;
			document.cookie = `refreshToken=${response.data.refreshToken};path=/;`;

			setJwt(response.data);
			return {
				status: response.status,
				data: response.data as IJwtResponse,
			};
		} catch (e) {
			return {
				status: ((e as AxiosError).response as AxiosResponse).status,
				error: {
					errorMsg: ((e as AxiosError).response as AxiosResponse).data.error
				},
			};
		}
	}

	getJwtFromCookies(): IJwtResponse | null {
		const cookies = document.cookie
			.split(";")
			.map(x => x.split("=")
				.map(x => x.trim())
			);

		const jwt: IJwtResponse = {token: "null", refreshToken: "null"};

		for (const cookie of cookies) {
			switch (cookie[0]) {
				case "token":
					jwt.token = cookie[1];
					break;
				case "refreshToken":
					jwt.refreshToken = cookie[1];
					break;
			}
		}

		if (jwt.token !== "null" && jwt.refreshToken !== "null") {
			return jwt;
		} else {
			return null;
		}
	}

	logout(setJwt: (jwt: IJwtResponse | null) => void): void {
		setJwt(null);

		document.cookie = `token=null;path=/;`;
		document.cookie = `refreshToken=null;path=/;`;
	}

	async register(
		email: string,
		firstName: string,
		lastName: string,
		password: string
	): Promise<IServiceResult<IJwtResponse>> {
		const registerInfo = {email, password, firstName, lastName};
		try {
			const response = await httpClient.post(
				"/identity/account/register",
				registerInfo
			);

			const data = response.data as IJwtResponse;
			document.cookie = `token=${data.token};path=/;`
			document.cookie = `refreshToken=${data.refreshToken};path=/;`

			return {
				status: response.status,
				data: data,
			};
		} catch (e) {
			return {
				status: ((e as AxiosError).response as AxiosResponse).status,
				error: {
					errorMsg: ((e as AxiosError).response as AxiosResponse).data.error
				},
			};
		}
	}
}