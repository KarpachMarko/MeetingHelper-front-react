import {AutoTextSize} from "auto-text-size";
import React from "react";
import {ESize} from "../enum/ESize";


export const Page = (props: {
    name: string,
    nameSize?: ESize,
    children: JSX.Element | JSX.Element[],
    backBtn?: JSX.Element,
    allowScroll?: boolean
}) => {
    const allowScroll = props.allowScroll ?? true
    const nameSize = props.nameSize ?? ESize.MEDIUM

    function getNameWidth(): string {
        switch (nameSize) {
            case ESize.FULL:
                return "w-full"
            case ESize.BIG:
                return "w-3/4"
            case ESize.MEDIUM:
                return "w-1/2"
            case ESize.SMALL:
                return "w-1/3"
            default:
                return ""
        }
    }

    return (
        <div className={`p-2 ${allowScroll ? "" : "h-screen w-screen overflow-hidden"}`}>
            {props.backBtn ? props.backBtn : <div className={"w-full h-4"}></div>}

            <div className={`flex justify-center ${getNameWidth()} -z-50`}>
                <AutoTextSize className={"text-gray-200 text-center font-extrabold tracking-widest"}>
                    {props.name.toUpperCase()}
                </AutoTextSize>
            </div>

            {props.children}
        </div>
    )
}