import {GuestsButton} from "./GuestsButton";
import {GuestsList} from "./GuestsList";
import {useState} from "react";
import {IGuest} from "../domain/entity/IGuest";

export const Guests = (props: {guests: IGuest[], opened?: boolean}) => {

	const [isOpen, setIsOpen] = useState(props.opened ?? false)

	return (
		<>
			<GuestsButton onClick={() => setIsOpen(isOpen => !isOpen)} opened={isOpen}/>
			<GuestsList guests={props.guests} opened={isOpen}/>
		</>
	)
}