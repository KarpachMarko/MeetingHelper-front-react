import React from "react";

export const Card = () => {
	return (
		<article className="bg-white overflow-hidden rounded-lg shadow-lg w-64">

			<a className="" href="#">
				<img alt="Placeholder" className="h-48 w-full"
					 src="https://cdn.pixabay.com/photo/2016/11/14/03/38/achieve-1822503_1280.jpg"/>
			</a>

			<div className="rounded-lg z-50 bg-white relative -mt-2 p-4">

				<header className="leading-tight mb-2">
					<h1 className="text-lg font-bold">
						Retos
					</h1>
				</header>

				<p className="leading-tight pb-2 md:pb-4">Quincenalmente nos reunimos via Zoom para discutir
					retos de programación a los que previamente acordamos. También hacemos Hackathons.</p>

				<div className="flex flex-wrap w-full gap-3">
					<strong
						className="inline-flex items-center border border-gray-200 rounded relative px-2.5 py-1.5 text-xs font-medium">
						<span className="text-green-700">Food</span>
					</strong>

					<strong
						className="inline-flex items-center border border-gray-200 rounded relative px-2.5 py-1.5 text-xs font-medium">
						<span className="w-2.5 h-2.5 bg-green-600 rounded-full absolute -top-1 -left-1"></span>
						<span className="text-green-700">Drinks</span>
					</strong>

					<strong
						className="inline-flex items-center border border-gray-200 rounded relative px-2.5 py-1.5 text-xs font-medium">
						<span className="text-green-700">Games</span>
					</strong>
				</div>
			</div>

		</article>
	);
}