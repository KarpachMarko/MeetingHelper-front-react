import {motion} from "framer-motion";
import React from "react";
import {getAllPriorities} from "../enum/PriorityIcon";
import {PriorityIcon} from "./PriorityIcon";

export const PrioritySelector = (props: { layoutKey: string, selected: number, setPriority: (priority: number) => any}) => {

    return (
        <div className={"relative"}>
            <div className={"absolute top-0 flex w-max justify-center items-center"}>
                {Array.from(Array(props.selected + 2).keys()).map((value, index) => {
                    return (
                        <div key={index}
                             className={"invisible w-9 h-full flex justify-center items-center px-2 py-1"}>
                        </div>
                    );
                })}
                <motion.div layoutId={`selected_${props.layoutKey}`}
                            className={"w-9 h-full bg-white drop-shadow-md rounded-full flex justify-center items-center px-2 py-1"}>
                    <img alt={"invisible"} src="/icons/Priorities/lowest.svg" className="invisible aspect-square h-full"/>
                </motion.div>
            </div>
            <div className={"flex bg-indigo-50 rounded-full w-max justify-center items-center"}>
                {getAllPriorities().splice(2, 5).map((value, index) => {
                    return (
                        <div key={index}
                             onClick={() => {
                                 props.setPriority(index - 2)
                             }}
                             className={"w-9 h-full drop-shadow-md rounded-full flex justify-center items-center px-2 py-1"}>
                            <PriorityIcon priority={value}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}