import { motion } from "framer-motion"

export const InviteGuest = () => {
	return (
		<motion.div whileHover={{scale: 1.2}} className="absolute cursor-pointer -top-10 right-5 w-12 aspect-square bg-indigo-400 shadow-lg text-white rounded-full flex items-center justify-center p-2">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
				 stroke="currentColor" className="w-full aspect-square">
				<path strokeLinecap="round" strokeLinejoin="round"
					  d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"/>
			</svg>
		</motion.div>
	)
}