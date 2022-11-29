import {IJwtResponse} from "./domain/model/IJwtResponse";
import {useEffect, useState} from "react";
import {AppContextProvider, initialState} from "./state/AppContext";
import {IdentityService} from "./services/IdentityService";
import {Route, Routes} from "react-router-dom";
import {Meetings} from "./views/Meeting/Meetings";
import {Events} from "./views/Event/Events";

export const App = () => {

	const setJwt = (jwt: IJwtResponse | null) => {
		setAppState({...appState, jwt});
	}

	const [appState, setAppState] = useState({...initialState, setJwt});

	useEffect(() => {
		appState.setJwt(new IdentityService().getJwtFromCookies());
	}, [])

	return (
		<>
			<AppContextProvider value={appState}>
				<Routes>
					<Route path="/meetings" element={<Meetings/>}/>
					<Route path="/events" element={<Events/>}/>
				</Routes>
			</AppContextProvider>
		</>
	)
}