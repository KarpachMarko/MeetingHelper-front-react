import { motion } from "framer-motion"

export const GuestsButton = (props: {opened: boolean, onClick: () => void}) => {
	const containerVariants = {
		opened: {x: 10, scale: 0.9},
		closed: {x: 0, scale: 1}
	}
	const iconVariants = {
		opened: {x: "-55%"},
		closed: {x: 0}
	}

	return (
		<motion.div onClick={props.onClick} animate={props.opened ? "opened" : "closed"} variants={containerVariants} className="absolute top-5 -left-5 z-10 bg-gray-100 shadow-lg rounded-2xl w-16 p-2 aspect-square text-indigo-400 overflow-hidden flex items-center cursor-pointer">
			<motion.div animate={props.opened ? "opened" : "closed"} variants={iconVariants} className="w-fit h-full flex gap-2">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
					 stroke="currentColor" className="h-full aspect-square">
					<path strokeLinecap="round" strokeLinejoin="round"
						  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
				</svg>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
					 stroke="currentColor" className="h-full aspect-square">
					<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
				</svg>
			</motion.div>
		</motion.div>
	)
}