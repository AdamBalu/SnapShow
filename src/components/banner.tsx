import Image from 'next/image';
import React from 'react';

export const Banner = () => (
	<div className="font-sarpanch gap-16 items-center mx-4 font-extrabold text-white flex flex-col">
		<div className="flex gap-5 items-center">
			<Image
				src="/static/logo.png"
				alt="snapshow logo"
				width="64"
				height="64"
			/>
			<h1 className="text-3xl sm:text-4xl md:text-6xl flex items-center">
				SnapShow
			</h1>
		</div>
		<Image
			className="max-w-128 md:w-auto"
			src="/static/intro_banner.svg"
			alt="introduction banner"
			width="400"
			height="300"
		/>
	</div>
);
