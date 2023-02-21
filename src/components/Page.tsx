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

    function getNameHeight(): string {
        switch (nameSize) {
            case ESize.FULL:
                return ""
            case ESize.BIG:
                return "h-32"
            case ESize.MEDIUM:
                return "h-20"
            case ESize.SMALL:
                return "h-10"
            default:
                return "h-20"
        }
    }

    return (
        <div className={`p-2 ${allowScroll ? "" : "h-screen w-screen overflow-hidden"}`}>
            {props.backBtn ? props.backBtn : <div className={"w-full h-4"}></div>}

            <div className={`flex w-full ${getNameHeight()} -z-50`}>
                <AutoTextSize mode={"box"} className={"text-gray-200 text-center font-extrabold tracking-widest"}>
                    {props.name.toUpperCase()}
                </AutoTextSize>
            </div>

            {props.children}
        </div>
    )
}