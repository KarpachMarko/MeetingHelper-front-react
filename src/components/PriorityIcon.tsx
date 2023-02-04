import React from "react";
import {getPriorityIcon} from "../enum/PriorityIcon";

export const PriorityIcon = (props: {priority: number}) => {
    const icon = getPriorityIcon(props.priority);
    return (
        <>
            <img alt={icon.alt} src={icon.path} className="aspect-square h-full fill-current"/>
        </>
    )
}