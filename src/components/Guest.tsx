import { motion } from "framer-motion";
import React from "react";

export const Guest = (props: {guest: {name: string, status: number, role: number}, index: number, len: number, opened: boolean, onClick: () => void}) => {
	const role = ["Guest", "Responsible", "Creator"]
	const iconColor = ["fill-red-400", "fill-amber-400", "fill-indigo-400"]
	const bgColor = ["bg-red-100", "bg-amber-100", "bg-indigo-100"]

	const guest = props.guest
	const index = props.index

	const containerVariants = {
		opened: {},
		closed: {height: 0, margin: 0}
	}

	return (
		<div onClick={props.onClick} className="w-full">
			<div className={`${index === 0 ? "rounded-t-2xl" : ""} ${index === props.len-1 ? "rounded-b-2xl" : ""} cursor-pointer inline-flex relative items-center py-2 px-4 w-full text-3xl font-medium border-b border-gray-200 ${bgColor[guest.status]} hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white`}>
				<svg aria-hidden="true" className="mr-2 w-8 h-8 fill-current" viewBox="0 0 128 128">
					<path className={iconColor[guest.status]}
						  d="M118.52326,36.73483l-17.22791-20.5351a21.58065,21.58065,0,0,0-12.77347-7.3761L62.12027,4.16943A21.554,21.554,0,0,0,47.591,6.72877L24.37583,20.13394a21.5618,21.5618,0,0,0-9.48022,11.301L5.73123,56.62425A21.54433,21.54433,0,0,0,5.72658,71.3718l9.169,25.19395a21.5791,21.5791,0,0,0,9.48022,11.301L47.591,121.26731a21.55616,21.55616,0,0,0,14.52923,2.564l26.40161-4.65882a21.53362,21.53362,0,0,0,12.77347-7.3761l17.22791-20.53045a21.57094,21.57094,0,0,0,5.049-13.865V50.59519A21.55855,21.55855,0,0,0,118.52326,36.73483ZM94.30014,53.14523,61.17272,86.27264a8.10767,8.10767,0,0,1-11.50077,0L33.61919,70.21523a7.839,7.839,0,0,1-2.35032-5.69A8.1159,8.1159,0,0,1,45.14318,58.812L55.4595,69.12834,82.85975,41.72809a8.10237,8.10237,0,0,1,11.51934.02322,7.8508,7.8508,0,0,1,2.355,5.69A7.62208,7.62208,0,0,1,94.30014,53.14523Z"/>
				</svg>
				{guest.name}
				<span className="absolute bottom-1 right-3 text-indigo-800 text-sm">{role[guest.role]}</span>
			</div>
			<motion.div animate={props.opened ? "opened": "closed"} variants={containerVariants} className="w-full my-2 flex justify-end gap-2 overflow-hidden">
				<a className="font-medium text-md inline-flex items-center justify-center px-3 py-1.5 rounded leading-5 bg-gray-200 text-indigo-800 focus:outline-none focus-visible:ring-2"
				   href="#">Message</a>
				{guest.role !== 2 ?
					<a className={`font-semibold text-md inline-flex items-center justify-center px-3 py-1.5 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out ${ guest.role === 1 ? "bg-amber-500 hover:bg-amber-600" : "bg-indigo-500 hover:bg-indigo-600"} focus:outline-none focus-visible:ring-2 text-white`}
					   href="#">{guest.role === 1 ? "Remove responsibility" : "Make responsible"}</a> :
					<></>
				}
				<a className="font-semibold text-md inline-flex items-center justify-center px-3 py-1.5 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out bg-red-500 focus:outline-none focus-visible:ring-2 hover:bg-red-600 text-white"
				   href="#">Kick</a>
			</motion.div>
		</div>
	)
}