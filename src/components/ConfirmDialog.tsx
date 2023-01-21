import React from "react";

export const ConfirmDialog = (props: {
    title: string,
    text: string,
    acceptText: string,
    cancelText: string,
    acceptAction: () => void,
    cancelAction: () => void
}) => {
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
                        <div
                            className="font-semibold text-md inline-flex items-center justify-center px-3 py-1.5 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out bg-indigo-50 focus:outline-none focus-visible:ring-2 hover:bg-indigo-100 text-indigo-500 cursor-pointer"
                            onClick={() => props.cancelAction()}
                        >{props.cancelText}</div>
                        <div
                            className="font-semibold text-lg inline-flex items-center justify-center px-6 py-1.5 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out bg-indigo-500 focus:outline-none focus-visible:ring-2 hover:bg-indigo-600 text-white cursor-pointer"
                            onClick={() => props.acceptAction()}
                        >{props.acceptText}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}