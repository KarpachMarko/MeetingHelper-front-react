import {IJwtResponse} from "../domain/model/IJwtResponse";

export interface IAppState {
	jwt: IJwtResponse | null;
	setJwt: (jwt: IJwtResponse | null) => void;
}