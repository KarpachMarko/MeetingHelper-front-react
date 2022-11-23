import React from "react";
import {Guests} from "./Guests";

export const Card2 = () => {
	return (
		<div className="h-full relative">
			<Guests />
			<div className="max-w-xs mx-auto">
				<div className="flex flex-col h-full bg-white shadow-lg rounded-lg overflow-hidden">
					<figure className="relative h-0 pb-[56.25%] overflow-hidden">
						<a href="#">
							<img
								className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out"
								src="https://res.cloudinary.com/dc6deairt/image/upload/v1638284256/course-img_tf0g8c.png"
								width="320" height="180" alt="Course"/>

							<div className="absolute bottom-0 w-full bg-gray-200 rounded-t-full h-1.5 dark:bg-gray-700">
								<div className="bg-indigo-500 h-1.5 rounded-t-full dark:bg-blue-500" style={{width: "60%"}}></div>
							</div>

							<div className="absolute bottom-1 right-2 rounded-full bg-indigo-500 text-white font-bold shadow-md">
								<span className="px-4 py-2">45$</span>
							</div>
						</a>
					</figure>


					<div className="flex-grow flex flex-col p-5">
						<div className="flex-grow">
							<header className="mb-3 flex justify-between gap-5">
								<h3 className="text-[22px] text-gray-900 font-extrabold leading-snug">Title</h3>

								<div className="flex flex-col items-end text-xs">
									<span className="w-fit">26.08</span>
									<span>16:30 - 20:30</span>
								</div>
							</header>
							<div className="mb-8">
								<p>Description</p>
							</div>
						</div>

						<div className="w-full text-gray-900 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
							<button type="button"
									className="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium border-b border-gray-200 bg-indigo-100 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
								<svg aria-hidden="true" className="mr-2 w-4 h-4 fill-current" viewBox="0 0 128 128">
									<path className="fill-indigo-400"
										  d="M118.52326,36.73483l-17.22791-20.5351a21.58065,21.58065,0,0,0-12.77347-7.3761L62.12027,4.16943A21.554,21.554,0,0,0,47.591,6.72877L24.37583,20.13394a21.5618,21.5618,0,0,0-9.48022,11.301L5.73123,56.62425A21.54433,21.54433,0,0,0,5.72658,71.3718l9.169,25.19395a21.5791,21.5791,0,0,0,9.48022,11.301L47.591,121.26731a21.55616,21.55616,0,0,0,14.52923,2.564l26.40161-4.65882a21.53362,21.53362,0,0,0,12.77347-7.3761l17.22791-20.53045a21.57094,21.57094,0,0,0,5.049-13.865V50.59519A21.55855,21.55855,0,0,0,118.52326,36.73483ZM94.30014,53.14523,61.17272,86.27264a8.10767,8.10767,0,0,1-11.50077,0L33.61919,70.21523a7.839,7.839,0,0,1-2.35032-5.69A8.1159,8.1159,0,0,1,45.14318,58.812L55.4595,69.12834,82.85975,41.72809a8.10237,8.10237,0,0,1,11.51934.02322,7.8508,7.8508,0,0,1,2.355,5.69A7.62208,7.62208,0,0,1,94.30014,53.14523Z"/>
								</svg>
								Drinks
								<span className="absolute bottom-1 right-3 text-indigo-800 text-xs">Ilja</span>
							</button>
							<button type="button"
									className="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
								<svg aria-hidden="true" className="mr-2 w-4 h-4 fill-current" viewBox="0 0 128 128">
								</svg>
								Meat
							</button>
						</div>

						<hr className="mb-3"/>

						<div className="flex flex-col items-center space-x-2">
							<span className="font-light text-gray-500">Decide until:</span>
							<span className="font-light mb-4">25.08 20:00</span>
							<div className="flex justify-center space-x-2">
								<a className="font-semibold text-sm inline-flex items-center justify-center px-3 py-1.5 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out bg-indigo-50 focus:outline-none focus-visible:ring-2 hover:bg-indigo-100 text-indigo-500"
								   href="#">Decline</a>
								<a className="font-semibold text-sm inline-flex items-center justify-center px-3 py-1.5 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out bg-indigo-500 focus:outline-none focus-visible:ring-2 hover:bg-indigo-600 text-white"
								   href="#">Join</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}