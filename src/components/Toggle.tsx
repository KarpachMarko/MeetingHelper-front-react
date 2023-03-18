import React from "react";

export const Toggle = (props: {
    label: string,
    isChecked: boolean,
    toggleFunc: (checked: boolean) => void
}) => {
    return (
        <label className="relative w-9 mx-1.5 block inline-flex items-center cursor-pointer my-1.5">
            <input className="sr-only peer" type="checkbox" checked={props.isChecked}
                   onChange={event => props.toggleFunc(event.target.checked)}/>
            <div
                className="absolute w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span
                className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">{props.label}</span>
        </label>
    )
}