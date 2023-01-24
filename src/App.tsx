import {useState} from "react";
import {AppContextProvider, initialState} from "./state/AppContext";
import {Route, Routes} from "react-router-dom";
import {Meetings} from "./views/Meeting/Meetings";
import {Events} from "./views/Event/Events";
import {CreateMeeting} from "./views/Meeting/CreateMeeting";
import {EditMeeting} from "./views/Meeting/EditMeeting";
import {CreateEvent} from "./views/Event/CreateEvent";
import {EditEvent} from "./views/Event/EditEvent";

export const App = () => {

    const [appState] = useState(initialState);

    return (
        <>
            <AppContextProvider value={appState}>
                <Routes>

                    {/*<Route path={window.location.pathname} element={} />*/}

                    <Route path="/" element={
                        <p>{window.location.toString()}</p>
                    }/>
                    <Route path="/meetings" element={<Meetings/>}/>
                    <Route path="/meetings/new" element={<CreateMeeting/>}/>
                    <Route path="/meetings/:meetingId" element={<EditMeeting/>}/>
                    <Route path="/meetings/:meetingId/events" element={<Events/>}/>
                    <Route path="/meetings/:meetingId/events/new" element={<CreateEvent/>}/>
                    <Route path="/meetings/:meetingId/events/:eventId" element={<EditEvent/>}/>
                </Routes>
            </AppContextProvider>
        </>
    )
}