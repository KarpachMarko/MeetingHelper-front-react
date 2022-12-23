import {IError} from "../../domain/model/IError";

export interface IServiceResult<TData> {
	status: number;
	data?: TData;
	error?: IError
}