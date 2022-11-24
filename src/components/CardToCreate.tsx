import React from "react";

export const CardToCreate = () => {
	return (
		<div
			className="h-60 w-40 rounded-2xl flex justify-center items-center border-4 border-gray-200 border-dashed text-gray-200 p-5 cursor-pointer"
		>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
				 stroke="currentColor" className="w-full aspect-square">
				<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
			</svg>
		</div>
	)
}