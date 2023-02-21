import React, {useState} from "react";
import {AppContextProvider, initialState} from "./state/AppContext";
import {Route, Routes} from "react-router-dom";
import {Meetings} from "./views/Meeting/Meetings";
import {Events} from "./views/Event/Events";
import {CreateMeeting} from "./views/Meeting/CreateMeeting";
import {EditMeeting} from "./views/Meeting/EditMeeting";
import {CreateEvent} from "./views/Event/CreateEvent";
import {EditEvent} from "./views/Event/EditEvent";
import {Requirements} from "./views/Requirements/Requirements";
import {CreateRequirement} from "./views/Requirements/CreateRequirement";
import {EditRequirement} from "./views/Requirements/EditRequirement";
import {MoneyTransfers} from "./views/Money transfers/MoneyTransfers";

export const App = () => {

    const [appState] = useState(initialState);

    return (
        <>
            <AppContextProvider value={appState}>
                <Routes>

                    <Route path="/" element={
                        <p>{window.location.toString()}</p>
                    }/>

                    {/*<Route path={window.location.pathname} element={
                        <div className={"mt-20 flex flex-col items-center gap-20"}>
                            <RequirementForm />
                            <Requirement />
                            <div className={"mx-10 flex gap-5 flex-wrap justify-center"}>
                                <RequirementOption />
                                <RequirementOption />
                            </div>
                        </div>
                    } />*/}

                    <Route path="/meetings" element={<Meetings/>}/>
                    <Route path="/meetings/new" element={<CreateMeeting/>}/>
                    <Route path="/meetings/:meetingId" element={<EditMeeting/>}/>
                    <Route path="/meetings/:meetingId/events" element={<Events/>}/>
                    <Route path="/meetings/:meetingId/events/new" element={<CreateEvent/>}/>
                    <Route path="/meetings/:meetingId/events/:eventId" element={<EditEvent/>}/>
                    <Route path="/meetings/:meetingId/events/:eventId/requirements" element={<Requirements/>}/>
                    <Route path="/meetings/:meetingId/events/:eventId/requirements/new" element={<CreateRequirement/>}/>
                    <Route path="/meetings/:meetingId/events/:eventId/requirements/:requirementId" element={<EditRequirement/>}/>

                    <Route path="/meetings/:meetingId/moneyTransfers" element={<MoneyTransfers/>}/>
                </Routes>
            </AppContextProvider>
        </>
    )
}