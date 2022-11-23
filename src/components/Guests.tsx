import {GuestsButton} from "./GuestsButton";
import {GuestsList} from "./GuestsList";
import {useState} from "react";

export const Guests = ({opened = false}) => {

	const [isOpen, setIsOpen] = useState(opened)

	return (
		<>
			<GuestsButton onClick={() => setIsOpen(isOpen => !isOpen)} opened={isOpen}/>
			<GuestsList opened={isOpen}/>
		</>
	)
}