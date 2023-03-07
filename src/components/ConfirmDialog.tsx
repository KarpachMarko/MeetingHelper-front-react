import React from "react";
import {BasicButton} from "./BasicButton";
import {Color, defaultColor} from "../enum/EColor";

export const ConfirmDialog = (props: {
    title: string,
    text: string,
    acceptText: string,
    cancelText: string,
    acceptAction: () => void,
    cancelAction: () => void,
    color?: Color
}) => {

    const color = props.color ?? defaultColor;

    return (
        <div className={"fixed top-0 left-0 h-screen w-screen bg-gray-800 bg-opacity-10 z-50"}>
            <div className={"flex h-1/2 justify-center items-center m-5"}>
                <div className={"bg-white drop-shadow-2xl rounded-xl p-5"}>
                    <div className={"mb-3"}>
                        <h1 className={"text-xl"}>{props.title}</h1>
                        <div className={"w-full rounded-full h-0.5 mt-1 mb-3 bg-gray-300"}></div>
                        <p className={"text-gray-700"}>{props.text}</p>
                    </div>

                    <div className={"flex justify-end gap-2"}>
                        <BasicButton color={color} background={"gray"} action={() => props.cancelAction()} text={props.cancelText} />
                        <BasicButton color={color} background={"colored"} action={() => props.acceptAction()} text={props.acceptText} />
                    </div>
                </div>
            </div>
        </div>
    )
}