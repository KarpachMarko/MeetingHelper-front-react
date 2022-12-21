import {IError} from "../domain/model/IError";

export const Error = (props: { error: IError }) => {
	return (
		<div className={"w-full h-screen flex justify-center items-center"}>
			<div
				className={"w-max bg-red-400 rounded-2xl drop-shadow-lg p-6 pt-0 text-white text-lg flex flex-col justify-center items-center"}>
				<div className={"text-7xl font-bold text-white opacity-40"}>{props.error.responseStatus}</div>
				<p className={"font-bold"}>
					{props.error.errorMsg}
				</p>
			</div>
		</div>
	)
}