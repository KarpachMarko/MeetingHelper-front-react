import React from 'react';
import {ArcherContainer, ArcherElement} from "react-archer";
import {Card2} from "./components/Card2";
import {CardToCreate} from "./components/CardToCreate";

function App() {
	return (
		<div>
			<ArcherContainer style={{width: "max-content", display: "flex", margin: "0 auto"}} strokeColor="#818CF8" className="h-full">

				<div className="flex justify-center items-center h-full gap-20 m-5">
					<div className="flex-1 h-full items-center justify-center flex flex-col">
						<ArcherElement id="1" relations={[{targetId: "2", targetAnchor:"left", sourceAnchor:"right"},
							{targetId: "4", sourceAnchor: "right", targetAnchor: "left"}]}>
							<div>
								<Card2/>
							</div>
						</ArcherElement>
					</div>

					<div className="flex-1 h-full items-center justify-center flex flex-col gap-10">
						<ArcherElement id="2" relations={[{targetId: "5", sourceAnchor: "right", targetAnchor: "left"}]}>
							<div>
								<Card2/>
							</div>
						</ArcherElement>
						<ArcherElement id="4" relations={[{targetId: "6", sourceAnchor: "right", targetAnchor: "left"}]}>
							<div>
								<Card2/>
							</div>
						</ArcherElement>
					</div>

					<div className="flex-1 h-full items-center justify-center flex flex-col gap-10">
						<ArcherElement id="5" relations={[{targetId: "3", sourceAnchor: "right", targetAnchor: "left"}]}>
							<div>
								<Card2/>
							</div>
						</ArcherElement>
						<ArcherElement id="6" relations={[{targetId: "3", sourceAnchor: "right", targetAnchor: "left"}]}>
							<div>
								<Card2/>
							</div>
						</ArcherElement>
					</div>

					<div className="flex-1 h-full items-center justify-center flex flex-col">
						<ArcherElement id="3" relations={[{targetId: "7", sourceAnchor: "right", targetAnchor: "left"}]}>
							<div>
								<Card2/>
							</div>
						</ArcherElement>
					</div>

					<div className="flex-1 h-full items-center justify-center flex flex-col">
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

export default App;
