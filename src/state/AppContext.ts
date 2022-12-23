import {IAppState} from "./IAppState";
import React from "react";

export const initialState: IAppState = {

};

export const AppContext = React.createContext<IAppState>(initialState);
export const AppContextProvider = AppContext.Provider