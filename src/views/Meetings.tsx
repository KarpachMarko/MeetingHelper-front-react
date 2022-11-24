import {MeetingCard} from "../components/MeetingCard";

export const Meetings = () => {
	return(
		<div className={"h-screen flex items-center flex-col gap-5 overflow-x-hidden"}>
			<MeetingCard />
			<MeetingCard />
		</div>
	)
}