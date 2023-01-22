import React from "react";
import {EventForm} from "../../components/EventForm";

export const CreateEvent = () => {
    return (
        <div className={"flex items-center justify-center py-3"}>
            <EventForm />
        </div>
    );
}