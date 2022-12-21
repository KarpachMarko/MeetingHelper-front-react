export interface IError {
	responseStatus?: number
	errorMsg?: string
}

export const initialError: IError | undefined = {}