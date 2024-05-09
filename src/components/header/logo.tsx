import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const Logo = () => (
	<Link className="navbar-start flex gap-5 items-center" href="/">
		<Image
			className="w-12 md:w-16"
			src="/static/logo.png"
			alt="snapshow logo"
			width="157"
			height="117"
		/>
		<h1 className="text-md sm:text-2xl lg:text-3xl">SnapShow</h1>
	</Link>
);
