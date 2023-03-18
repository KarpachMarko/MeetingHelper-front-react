import {Color} from "../enum/EColor";

export const BasicButton = (props: {
    text: string
    background?: "colored" | "gray" | "none",
    color?: Color,
    action?: () => void,
    className?: string
}) => {
    const doNothing = () => {};
    const style = props.className ?? ""

    const color = props.color ?? "indigo";
    const background = props.background ?? "colored";
    const action = props.action ?? doNothing;

    function getStyle(): string {
        switch (background) {
            case "colored":
                return `bg-${color}-500 hover:bg-${color}-600 text-white shadow-sm`
            case "gray":
                return `bg-${color}-50 hover:bg-${color}-100 text-${color}-500 shadow-sm`
            case "none":
                return `hover:bg-${color}-100 text-${color}-500`
        }
    }

    return (
        <div
            onClick={action}
            className={"flex-1 font-semibold text-sm inline-flex items-center justify-center " +
                "px-2 py-1 border border-transparent rounded leading-5 " +
                "focus:outline-none focus-visible:ring-2 cursor-pointer " + getStyle() + ` ${style} `}
        >
            {props.text}
        </div>
    )
}