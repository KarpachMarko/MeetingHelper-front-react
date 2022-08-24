import React from "react";
import {MeetingCard} from "./MeetingCard";

export const Meetings = () => {
	return (
		<section className="flex justify-center antialiased text-gray-600 p-4 gap-10">
			<MeetingCard />
			<MeetingCard />
		</section>
	);
}