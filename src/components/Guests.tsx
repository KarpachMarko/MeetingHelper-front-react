import {GuestsButton} from "./GuestsButton";
import {ButtonSet, GuestsList} from "./GuestsList";
import {useState} from "react";
import {IGuest} from "../domain/model/IGuest";

export const Guests = (props: {
    guests: IGuest[],
    opened?: boolean,
    buttonSets?: ButtonSet[]
}) => {

    const [isOpen, setIsOpen] = useState(props.opened ?? false)

    return (
        <>
            <GuestsButton onClick={() => setIsOpen(isOpen => !isOpen)} opened={isOpen}/>
            <GuestsList guests={props.guests} opened={isOpen} buttonSets={props.buttonSets}/>
        </>
    )
}