import {useState} from "react";
import {AppContextProvider, initialState} from "./state/AppContext";
import {Route, Routes} from "react-router-dom";
import {Meetings} from "./views/Meeting/Meetings";
import {Events} from "./views/Event/Events";
import {CreateMeeting} from "./views/Meeting/CreateMeeting";

export const App = () => {

    const [appState] = useState(initialState);

    return (
        <>
            <AppContextProvider value={appState}>
                <Routes>
                    <Route path="/" element={
                        <p>{window.location.toString()}</p>
                    }/>
                    <Route path="/meetings" element={<Meetings/>}/>
                    <Route path="/meetings/new" element={<CreateMeeting/>}/>
                    <Route path="/meetings/:meetingId/events" element={<Events/>}/>
                </Routes>
            </AppContextProvider>
        </>
    )
}