import {motion} from "framer-motion";
import React, {useState} from "react";
import {InviteGuest} from "./InviteGuest";
import {Guest} from "./Guest";

export const GuestsList = (props: { opened: boolean }) => {
	const containerVariants = {
		opened: {x: "-105%"},
		closed: {x: 0}
	}

	const listVariants = {
		opened: {height: "fit-content"},
		closed: {height: 100}
	}

	const guests = [
		{name: "Marko", status: 2, role: 2},
		{name: "Ilja", status: 1, role: 0},
		{name: "Katja", status: 2, role: 1},
		{name: "Sanja", status: 0, role: 0}
	]

	const [selected, setSelected] = useState(-1)

	return (
		<motion.div animate={props.opened ? "opened" : "closed"} variants={containerVariants}
					className="absolute top-24 w-full bg-white shadow-2xl rounded-2xl p-2 -z-10">
			<div className="relative ">
				<InviteGuest/>

				<motion.div animate={props.opened ? "opened" : "closed"} variants={listVariants}
							className="overflow-hidden">
					{guests.map((guest, index) =>
						<Guest key={index} guest={guest} index={index} len={guests.length} opened={index === selected}
							   onClick={() => setSelected(selected => selected === index ? -1 : index)}/>
					)}
				</motion.div>
			</div>
		</motion.div>
	);
}