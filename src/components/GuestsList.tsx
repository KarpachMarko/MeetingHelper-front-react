import {motion} from "framer-motion";
import React, {useState} from "react";
import {InviteGuest} from "./InviteGuest";
import {Guest} from "./Guest";
import {IGuest} from "../domain/model/IGuest";

export const GuestsList = (props: {guests: IGuest[], opened: boolean }) => {
	const containerVariants = {
		opened: {display: "block", opacity: 1, x: "0%", minWidth: "min-content"},
		closed: {display: "none", opacity: 0, x: "-105%", minWidth: ""}
	}

	const listVariants = {
		opened: {height: "fit-content"},
		closed: {height: 100}
	}

	const [selected, setSelected] = useState(-1)

	return (
		<motion.div animate={props.opened ? "opened" : "closed"} variants={containerVariants}
					className="absolute top-24 w-full bg-white shadow-2xl rounded-2xl p-2 z-20">
			<div className="relative ">
				<InviteGuest/>

				<motion.div animate={props.opened ? "opened" : "closed"} variants={listVariants}
							className="overflow-hidden">
					{props.guests.map((guest, index) =>
						<Guest key={index} guest={guest} index={index} len={props.guests.length} opened={index === selected}
							   onClick={() => setSelected(selected => selected === index ? -1 : index)}/>
					)}
				</motion.div>
			</div>
		</motion.div>
	);
}