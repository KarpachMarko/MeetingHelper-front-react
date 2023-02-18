import React from "react";

export const BackBtn = (props: { text: string, action: () => void }) => {
    return (
        <div
            onClick={props.action}
            className={"w-max z-50 bg-white drop-shadow-lg py-3 px-4 rounded-2xl text-indigo-500 cursor-pointer"}>
            <div className={"flex items-center gap-1"}>
                <div className={"w-5 h-full"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="h-full aspect-square">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
                    </svg>
                </div>
                <span className={"text-lg"}>{props.text}</span>
            </div>
        </div>
    )
}