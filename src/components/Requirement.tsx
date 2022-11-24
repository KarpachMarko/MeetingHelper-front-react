import React from "react";

export const Requirement = () => {
	return (
			<div className="h-full">
				<div className="max-w-xs mx-auto">
					<div className="flex flex-col h-full bg-white shadow-lg rounded-lg">

						<div className="relative flex-grow flex flex-col p-5">
							<div className="absolute top-0 left-0 w-full bg-gray-200 rounded-t-full h-1.5 dark:bg-gray-700">
								<div className="bg-indigo-500 h-1.5 rounded-t-full dark:bg-blue-500" style={{width: "60%"}}></div>
							</div>

							<div className="absolute -top-3 right-2 rounded-full bg-indigo-500 text-white font-bold shadow-md">
								<span className="px-4 py-2">45$</span>
							</div>

							<div className="flex-grow">
								<header className="mb-3 flex justify-between gap-5">
									<h3 className="text-[22px] text-gray-900 font-extrabold leading-snug">Title</h3>
								</header>
								<div className="mb-8">
									<p>Description</p>
								</div>
							</div>

							<div
								className="w-full text-gray-900 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
								<span className="font-light">Parameters:</span>
								<button type="button"
										className="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium border-b border-gray-200 bg-indigo-100 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
									<img alt="Medium" src="/icons/Priorities/medium.svg" className="mr-2 w-4 h-4 fill-current"/>
									Near city
								</button>
								<button type="button"
										className="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium border-b border-gray-200 bg-indigo-50 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
									<img alt="Low" src="/icons/Priorities/low.svg" className="mr-2 w-4 h-4 fill-current"/>
									Cool
								</button>
								<button type="button"
										className="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium border-b border-gray-200 bg-indigo-100 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
									<img alt="Highest" src="/icons/Priorities/highest.svg" className="mr-2 w-4 h-4 fill-current"/>
									Suites for 6 persons
								</button>
								<button type="button"
										className="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium border-b border-gray-200 bg-indigo-50 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
									<img alt="High" src="/icons/Priorities/high.svg" className="mr-2 w-4 h-4 fill-current"/>
									Has parking slot
								</button>
							</div>

							<hr className="mb-3"/>

							<div className="flex flex-col items-center space-x-2">
								<span className="font-light text-gray-500">Find until:</span>
								<span className="font-light">25.08 20:00</span>
							</div>

							<div className={"flex justify-center gap-2"}>
								<a className="flex-4 font-semibold text-sm inline-flex items-center justify-center px-2 py-1.5 border border-transparent rounded leading-5 transition duration-150 ease-in-out focus:outline-none focus-visible:ring-2 hover:bg-red-100 text-red-500"
								   href="#">Remove</a>
								<a className="flex-4 font-semibold text-sm inline-flex items-center justify-center px-2 py-1.5 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out bg-red-500 focus:outline-none focus-visible:ring-2 hover:bg-red-600 text-white"
								   href="#">I Payed It</a>
								<a className="flex-1 font-semibold text-sm inline-flex items-center justify-center px-2 py-1.5 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out bg-indigo-500 focus:outline-none focus-visible:ring-2 hover:bg-indigo-600 text-white"
								   href="#">Options</a>
							</div>
						</div>
					</div>
				</div>
			</div>
	);
}