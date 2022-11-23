import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css"
import {Meetings} from "./components/Meetings";
import {RequirementOption} from "./components/RequirementOption";
import {Requirement} from "./components/Requirement";

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>

		<Meetings/>

		<div className="overflow-auto">
			<App/>
		</div>

		<section className="flex flex-col justify-center antialiased text-gray-600 p-4">
			<Requirement/>
			<div className="flex justify-center gap-6">
				<RequirementOption/>
				<RequirementOption/>
			</div>
		</section>
	</React.StrictMode>
);
