import {motion} from "framer-motion";
import React, {useState} from "react";
import {Guest} from "./Guest";
import {IGuest} from "../domain/model/IGuest";

export const GuestsList = (props: { guests: IGuest[], opened: boolean }) => {
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
                <motion.div animate={props.opened ? "opened" : "closed"} variants={listVariants}
                            className="overflow-hidden">
                    {props.guests.map((guest, index) =>
                        <Guest key={index} guest={guest} index={index} len={props.guests.length}
                               opened={index === selected}
                               onClick={() => setSelected(selected => selected === index ? -1 : index)}/>
                    )}
                    {props.guests.length === 0 ?
                        <div className="w-full">
                            <div
                                className={`rounded-t-2xl bg-indigo-50 rounded-b-2xl cursor-pointer inline-flex relative items-center py-2 px-4 w-full text-xl font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white`}>
                                <span className={"z-20 text-gray-600"}>Guests list is empty</span>
                            </div>
                        </div> : <></>}
                </motion.div>
            </div>
        </motion.div>
    );
}