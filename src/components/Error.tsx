import {IError} from "../domain/model/IError";

export const Error = (props: { error: IError }) => {
	return (
		<p>
			{props.error.errorMsg}
		</p>
	)
}