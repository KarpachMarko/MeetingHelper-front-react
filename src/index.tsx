import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css"
import {Meetings} from "./components/Meetings";
import {RequirementOption} from "./components/RequirementOption";
import {Requirement} from "./components/Requirement";
import {Card2} from "./components/Card2";

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>

		<Meetings />

		<div className="overflow-auto">
			<App />
		</div>

		<section className="flex flex-col justify-center antialiased bg-gray-50 text-gray-600 min-h-screen p-4">
			<Requirement />
			<div className="flex" style={{width: "800px", margin: "0 auto", gap: 20}}>
				<RequirementOption/>
				<RequirementOption/>
			</div>
		</section>
	</React.StrictMode>
);
