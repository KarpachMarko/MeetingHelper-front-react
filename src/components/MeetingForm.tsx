import React from "react";

export const MeetingForm = () => {
	return (
		<div className={"shadow-2xl bg-white rounded-lg w-8/12 p-4 mx-5 min-h-min flex flex-col items-center"}>
			<div className={"w-full"}>
				<label htmlFor="price" className="block text-sm font-medium text-gray-700">
					Meeting
				</label>
				<div className="relative mt-1 rounded-md">
					<label
						className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
					>
						<span className="text-xs font-medium text-gray-500"> Title </span>

						<input
							type="text"
							name="title"
							placeholder="Trip to london"
							className="mt-1 w-full text-gray-800 border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
						/>
					</label>

					<textarea
						name="description"
						className="block text-gray-800 w-full overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
						placeholder="Description"
						rows={6}
					/>

					<div className={"flex gap-6 justify-around mt-2"}>
						<label
							className="flex-1 block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
						>
							<span className="text-xs font-medium text-gray-500">Start date</span>

							<input
								type="date"
								name="title"
								className="mt-1 w-full text-gray-800 border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
							/>
						</label>
						<label
							className="flex-1 block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
						>
							<span className="text-xs font-medium text-gray-500">End date (optional)</span>

							<input
								type="date"
								name="title"
								className="mt-1 w-full text-gray-800 border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
							/>
						</label>
					</div>
				</div>
				<div className={"flex justify-end gap-2"}>
					<a className="font-semibold text-md inline-flex items-center justify-center px-3 py-1.5 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out bg-indigo-50 focus:outline-none focus-visible:ring-2 hover:bg-indigo-100 text-indigo-500"
					   href="#">Cancel</a>
					<a className="font-semibold text-lg inline-flex items-center justify-center px-6 py-1.5 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out bg-indigo-500 focus:outline-none focus-visible:ring-2 hover:bg-indigo-600 text-white"
					   href="#">Submit</a>
				</div>
			</div>
		</div>
	)
}