import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css"
import {RequirementOption} from "./components/RequirementOption";
import {Card} from "./components/Card";
import {MeetingCard} from "./components/MeetingCard";
import {Card2} from "./components/Card2";

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<div>
			<App />
		</div>

		{/*<div style={{width: "30%", margin: "0 auto", display: "flex", justifyContent: "center"}}>*/}
			{/*<RequirementOption/>*/}
			{/*<Card2 />*/}
		{/*</div>*/}

		{/*<div className="flex flex-col h-screen w-full gap-6">*/}
		{/*	<div className="flex flex-row flex-1 h-56 gap-3">*/}
		{/*		<MeetingCard />*/}
		{/*		<MeetingCard />*/}
		{/*	</div>*/}
		{/*	<div className="flex flex-row flex-1 h-56 gap-3">*/}
		{/*		<MeetingCard />*/}
		{/*		<MeetingCard />*/}
		{/*		<MeetingCard />*/}
		{/*	</div>*/}
		{/*</div>*/}
	</React.StrictMode>
);
