import React from 'react';
import {ArcherContainer, ArcherElement} from "react-archer";
import {Card2} from "./components/Card2";
import {CardToCreate} from "./components/CardToCreate";

function TimeLine() {
	return (
		<div>
			<ArcherContainer strokeColor="#818CF8" className="h-full flex mx-auto w-max">

				<div className="flex flex-col justify-center items-center h-full gap-20 m-5">

					<div className="flex-1 h-full items-center justify-center flex flex-row snap-start">
						<ArcherElement id="1"
									   relations={[{targetId: "2", sourceAnchor: "bottom", targetAnchor: "top"},
										   {targetId: "4", sourceAnchor: "bottom", targetAnchor: "top"}]}>
							<div>
								<Card2/>
							</div>
						</ArcherElement>
					</div>

					<div className="flex-1 h-full items-center justify-center flex flex-row gap-10 snap-start">
						<ArcherElement id="2"
									   relations={[{targetId: "5", sourceAnchor: "bottom", targetAnchor: "top"}]}>
							<div>
								<Card2/>
							</div>
						</ArcherElement>
						<ArcherElement id="4"
									   relations={[{targetId: "6", sourceAnchor: "bottom", targetAnchor: "top"}]}>
							<div>
								<Card2/>
							</div>
						</ArcherElement>
					</div>

					<div className="flex-1 h-full items-center justify-center flex flex-row gap-10 snap-start">
						<ArcherElement id="5"
									   relations={[{targetId: "3", sourceAnchor: "bottom", targetAnchor: "top"}]}>
							<div>
								<Card2/>
							</div>
						</ArcherElement>
						<ArcherElement id="6"
									   relations={[{targetId: "3", sourceAnchor: "bottom", targetAnchor: "top"}]}>
							<div>
								<Card2/>
							</div>
						</ArcherElement>
					</div>

					<div className="flex-1 h-full items-center justify-center flex flex-row snap-start">
						<ArcherElement id="3"
									   relations={[{targetId: "7", sourceAnchor: "bottom", targetAnchor: "top"}]}>
							<div>
								<Card2/>
							</div>
						</ArcherElement>
					</div>

					<div className="flex-1 h-full items-center justify-center flex flex-row snap-start">
						<ArcherElement id="7">
							<div>
								<CardToCreate/>
							</div>
						</ArcherElement>
					</div>

				</div>
			</ArcherContainer>
		</div>
	);
}

export default TimeLine;
